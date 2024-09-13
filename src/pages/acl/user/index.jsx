import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { Card, Form, Input, Button, Table, Pagination, Drawer, Checkbox, message } from 'antd';
import { reqUserInfo, reqAddOrUpdateUser, reqSetRole, reqSetRoles, reqDeleteUser, reqBatchRemove } from '@/api/acl/user'; // Replace with actual API imports
import './index.scss';
import { debounce } from 'lodash';

const User = () => {
    const [keyword, setKeyword] = useState('');
    const [userInfo, setUserInfo] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [drawer, setDrawer] = useState(false);
    const [drawer1, setDrawer1] = useState(false);
    const [userParams, setUserParams] = useState({
        id: '',
        name: '',
        password: '',
        username: ''
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [checkAll, setCheckAll] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(true);
    const [assignRoles, setAssignRoles] = useState([]);
    const [allRolesList, setAllRolesList] = useState([]);
    const [Update, forceUpdate] = useState(0);

    //按钮禁用与否
    const [isDisabled, setIsDisadled] = useState([])

    useEffect(() => {
        getHasUser();
    }, [pageNo, pageSize, Update, selectedRowKeys]);

    // 使用 lodash 的 debounce 函数进行防抖，500ms 后才更新状态
    // 使用 useCallback 确保 debouncedSetKeyword 只在首次渲染时创建，避免在每次渲染时创建新的防抖函数。
    const debouncedSetKeyword = useCallback(debounce(() => {
        forceUpdate(prev => prev + 1);
    }, 1000), []);
    const handleChange = (e) => {
        setKeyword(e.target.value)
        debouncedSetKeyword()
    };

    const getHasUser = async () => {
        const result = await reqUserInfo(pageNo, pageSize, keyword);
        if (result.code === 200) {
            setUserInfo(result.data.records);
            setTotal(result.data.total);
        }
    };

    const addUser = () => {
        setUserParams({
            id: '',
            name: '',
            password: '',
            username: ''
        });
        setDrawer(true);
    };

    const updateUser = (row) => {
        setUserParams(row);
        setDrawer(true);
    };

    // 自定义验证函数
    const checkName = (_, value) => {
        if (value.trim().length >= 5) {
            return Promise.resolve();
        } else {
            return Promise.reject('用户名称的长度至少要大于5位');
        }
    };

    const checkUserName = (_, value) => {
        if (value.trim().length >= 5) {
            console.log(1)
            return Promise.resolve();
        } else {
            return Promise.reject('用户姓名的长度至少要大于5位');
        }
    };

    const checkPassword = (_, value) => {
        console.log(2)
        const regex = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,20}$/;
        if (regex.test(value)) {
            return Promise.resolve();
        } else {

            return Promise.reject('密码必须同时包含大写、小写、数字和特殊字符其中三项且至少8位');
        }
    };

    // 验证规则
    const rules = {
        name: [{ validator: checkName, trigger: 'blur' }],
        username: [{ validator: checkUserName, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }]
    };


    const save = async () => {
        const result = await reqAddOrUpdateUser(userParams);
        if (result.code === 200) {
            message.success('操作成功');
            setDrawer(false);
            getHasUser();
        } else {
            message.error('操作失败');
        }
    };

    //分配角色(打开抽屉)
    const setRole = async (row) => {
        setDrawer1(true);
        setUserParams(row);
        const result = await reqSetRole(row.id);
        setAllRolesList(result.data.allRolesList);
        setAssignRoles(result.data.assignRoles);
        console.log(result.data.assignRoles)
    };

    //分配角色（确认按钮）
    const confirmSetRole = async () => {
        // 构建请求参数
        const reqSetRolesId = {
            roleIdList: assignRoles.map(role => role.id),
            userId: userParams.id
        };

        // 发出请求并处理结果
        const result = await reqSetRoles(reqSetRolesId);
        console.log(result);

        if (result.code === 200) {
            message.success('分配职务成功');
            setDrawer1(false);
            getHasUser(pageNo); // 获取更新后的用户信息
        }
    };

    const deleteUser = async (userId) => {
        const result = await reqDeleteUser(userId);
        if (result.code === 200) {
            message.success('删除成功');
            getHasUser();
        }
    };

    //批量删除
    const batchRemove = async () => {
        console.log(selectedRowKeys)
        const result = await reqBatchRemove(selectedRowKeys);
        if (result.code === 200) {
            message.success('批量删除成功');
            getHasUser();
        } else {
            message.error('删除失败')
        }
    };

    const handleCheckAllChange = (e) => {
        setAssignRoles(e.target.checked ? allRolesList : []);
        setIsIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const handleCheckedRolesChange = (checkedValues) => {
        setAssignRoles(checkedValues);
        setIsIndeterminate(!!checkedValues.length && checkedValues.length < allRolesList.length);
        setCheckAll(checkedValues.length === allRolesList.length);
    };


    //当选择改变时
    const selectChange = (value) => {
        setSelectedRowKeys(value)
    }

    const columns = [
        { title: '#', dataIndex: 'index', render: (_, __, index) => index + 1 },
        { title: 'id', dataIndex: 'id', width: 100 },
        { title: '用户名字', dataIndex: 'username', width: 150 },
        { title: '用户昵称', dataIndex: 'name', width: 150 },
        { title: '用户角色', dataIndex: 'roleName' },
        { title: '创建时间', dataIndex: 'createTime' },
        { title: '更新时间', dataIndex: 'updateTime' },
        {
            title: '操作',
            render: (text, row) => (
                <>
                    <Button className='btn1' type="primary" onClick={() => setRole(row)}>分配角色</Button>
                    <Button className='btn2' type="primary" onClick={() => updateUser(row)}>编辑</Button>
                    <Button className='btn3' type="primary" onClick={() => deleteUser(row.id)} danger>删除</Button>
                </>
            )
        }
    ];

    return (
        <div>
            <Card className="search-card">
                <Form layout="inline">
                    <Form.Item label="用户名">
                        <Input
                            placeholder="Please input"
                            value={keyword}
                            onChange={handleChange}
                            // onChange={(e) => setKeyword(e.target.value)}
                            style={{ width: 240 }}
                        />
                    </Form.Item>
                    <Form.Item>
                        {/* <Button type="primary" onClick={getHasUser}>搜索</Button> */}
                        <Button onClick={() => setKeyword('')}>重置</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card className="table-card">
                <Button type="primary" className='btn4' onClick={addUser}>添加</Button>
                <Button type="primary" className='btn5' onClick={batchRemove} disabled={selectedRowKeys.length >= 1 ? false : true} danger>批量删除</Button>
                {/* disabled={!keyword} */}
                <Table
                    rowSelection={{
                        selectedRowKeys,
                        onChange: selectChange
                    }}
                    columns={columns}
                    dataSource={userInfo}
                    rowKey="id"
                    pagination={false}
                />
                <Pagination
                    current={pageNo}
                    pageSize={pageSize}
                    total={total}
                    onChange={setPageNo}
                    onShowSizeChange={(_, size) => setPageSize(size)}
                    showSizeChanger
                    pageSizeOptions={['3', '4', '5', '8']}
                    showTotal={(total) => `Total ${total} items`}
                />
            </Card>
            <Drawer
                title="用户管理"
                open={drawer}
                onClose={() => setDrawer(false)}
                footer={
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={() => setDrawer(false)} style={{ marginRight: 8 }}>取消</Button>
                        <Button onClick={save} type="primary">保存</Button>
                    </div>
                }
            >
                <Form layout="vertical">
                    <Form.Item label="用户昵称" name="name" rules={rules.name}>
                        <Input value={userParams.name} onChange={(e) => setUserParams({ ...userParams, name: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="用户姓名" name="username" rules={rules.username}>
                        <Input value={userParams.username} onChange={(e) => setUserParams({ ...userParams, username: e.target.value })} />
                    </Form.Item>
                    {!userParams.id && (
                        <Form.Item label="用户密码" name="password" rules={rules.password} >
                            <Input value={userParams.password} onChange={(e) => setUserParams({ ...userParams, password: e.target.value })} />
                        </Form.Item>
                    )}
                </Form>
            </Drawer>
            <Drawer
                title="分配角色"
                open={drawer1}
                onClose={() => setDrawer1(false)}
                footer={
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={() => setDrawer1(false)} style={{ marginRight: 8 }}>取消</Button>
                        <Button onClick={confirmSetRole} type="primary">确认</Button>
                    </div>
                }
            >
                <Form layout="vertical">
                    <Form.Item label="用户名称">
                        <Input disabled value={userParams.username} />
                    </Form.Item>
                    <Form.Item label="分配角色">
                        <Checkbox
                            indeterminate={isIndeterminate}
                            onChange={handleCheckAllChange}
                            checked={checkAll}
                        >
                            全选
                        </Checkbox>
                        <Checkbox.Group
                            value={assignRoles}
                            onChange={handleCheckedRolesChange}
                            style={{ width: '100%' }}
                        >
                            {(allRolesList).map((role, index) => (
                                <Checkbox key={index} value={role}>
                                    {role.roleName}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default User;
