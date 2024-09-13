import { useState, useEffect, useRef } from 'react';
import { Card, Form, Input, Button, Table, Modal, Popconfirm, Drawer, Tree, message, Pagination } from 'antd';
import PermissionButton from '@/directive/has'
import { reqGetRole, reqAddRole, reqUpdataRole, reqSetPermission, reqSetPermisstion, reqRemoveRole } from '../../../api/acl/role/index';

import './index.scss';

const { Column } = Table;

const Role = () => {
    const [roleArr, setRoleArr] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [keyword, setKeyword] = useState('');
    const [showAddRole, setShowAddRole] = useState(false);
    const [showEditRole, setShowEditRole] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [menuArr, setMenuArr] = useState([]);
    const [addrole, setAddrole] = useState({ id: 0, roleName: '' });
    const [checkedKeys, setCheckedKeys] = useState([]);
    const treeRef = useRef(null);

    useEffect(() => {
        fetchRoles();
    }, [pageNo, pageSize, keyword]);

    const fetchRoles = async () => {
        const result = await reqGetRole(pageNo, pageSize, keyword);
        setRoleArr(result.data.records);
        setTotal(result.data.total);
    };

    const handleSearch = () => {
        fetchRoles();
    };

    const handleReset = () => {
        setKeyword('');
        fetchRoles();
    };

    const handleAddRole = () => {
        setAddrole({ id: 0, roleName: '' });
        setShowAddRole(true);
    };

    const handleSaveRole = async () => {
        const result = await reqAddRole(addrole);
        if (result.code === 200) {
            message.success('添加成功');
            setShowAddRole(false);
            fetchRoles();
        } else {
            message.error('添加失败');
        }
    };

    const handleEditRole = (row) => {
        setAddrole(row);
        setShowEditRole(true);
    };

    const handleUpdateRole = async () => {
        const result = await reqUpdataRole(addrole);
        if (result.code === 200) {
            message.success('修改成功');
            setShowEditRole(false);
            fetchRoles();
        } else {
            message.error('修改失败');
        }
    };

    const handleSetPermission = async (row) => {
        setAddrole(row);
        setDrawerVisible(true);
        const result = await reqSetPermission(row.id);
        const { permissions, menu } = result.data; // 需要根据你的实际返回数据进行调整
        setMenuArr(menu);
        // 提取已选中的权限的 IDs
        const selectedKeys = (permissions||[]).map(permission => permission.id); // 需要根据权限对象结构进行调整
        setCheckedKeys(selectedKeys);
        setCheckedKeys(filterSelectedKeys(result.data, []));
    };

    const handleConfirmPermission = async () => {
        const selectedKeys = [...treeRef.current.getCheckedKeys(), ...treeRef.current.getHalfCheckedKeys()];
        const result = await reqSetPermisstion(addrole.id, selectedKeys);
        if (result.code === 200) {
            message.success('分配权限成功');
            setDrawerVisible(false);
            fetchRoles();
        }
    };

    const handleDeleteRole = async (id) => {
        const result = await reqRemoveRole(id);
        if (result.code === 200) {
            message.success('删除成功');
            fetchRoles();
        }
    };

    const filterSelectedKeys = (allData, initArr) => {
        allData.forEach((item) => {
            if (item.select && item.level === 4) {
                initArr.push(item.id);
            }
            if (item.children && item.children.length > 0) {
                filterSelectedKeys(item.children, initArr);
            }
        });
        return initArr;
    };

    return (
        <div>
            <Card className='searchCard'>
                <Form layout="inline">
                    <Form.Item label="角色名称">
                        <Input
                            placeholder="角色名称"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleSearch} disabled={!keyword}>
                            搜索
                        </Button>
                        <Button onClick={handleReset}>重置</Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card style={{ margin: 10 }}>
                <Button
                    type="primary"
                    onClick={handleAddRole}
                    className='addRole'
                >
                    添加角色
                </Button>

                <Table
                    dataSource={roleArr}
                    rowKey="id"
                    bordered
                    pagination={false}
                >
                    <Column title="#" dataIndex="index" key="index" align="center" width={80} />
                    <Column title="Id" dataIndex="id" key="id" align="center" width={100} />
                    <Column title="角色名称" dataIndex="roleName" key="roleName" align="center" />
                    <Column title="创建时间" dataIndex="createTime" key="createTime" align="center" />
                    <Column title="更新时间" dataIndex="updateTime" key="updateTime" align="center" />
                    <Column
                        title="操作"
                        key="actions"
                        align="center"
                        width={400}
                        render={(text, record) => (
                            <div>
                                <PermissionButton type="primary" className='btn' onClick={() => handleSetPermission(record)} permission="btn.Trademark.add">分配权限</PermissionButton>
                                {/* <Button type="primary" className='btn' onClick={() => handleSetPermission(record)}>
                                    分配权限
                                </Button> */}
                                <Button type="primary" className='btn' onClick={() => handleEditRole(record)}>
                                    编辑
                                </Button>
                                <Popconfirm
                                    title={`确定要删除 ${record.roleName}?`}
                                    onConfirm={() => handleDeleteRole(record.id)}
                                >
                                    <Button type="primary" className='btn' danger>删除</Button>
                                </Popconfirm>
                            </div>
                        )}
                    />
                </Table>

                <Pagination
                    current={pageNo}
                    pageSize={pageSize}
                    total={total}
                    onChange={(page) => setPageNo(page)}
                    onShowSizeChange={(current, size) => setPageSize(size)}
                    showSizeChanger
                />
            </Card>

            <Modal
                title="添加角色"
                open={showAddRole}
                onCancel={() => setShowAddRole(false)}
                onOk={handleSaveRole}
            >
                <Form layout="vertical">
                    <Form.Item label="角色名称">
                        <Input
                            value={addrole.roleName}
                            onChange={(e) => setAddrole({ ...addrole, roleName: e.target.value })}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                style={{ height: '200px' }}
                className='addRoleModal'
                title="编辑角色"
                open={showEditRole}
                onCancel={() => setShowEditRole(false)}
                onOk={handleUpdateRole}
            >
                <Form layout="vertical">
                    <Form.Item label="角色名称">
                        <Input
                            value={addrole.roleName}
                            onChange={(e) => setAddrole({ ...addrole, roleName: e.target.value })}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Drawer
                title="分配权限"
                placement="right"
                closable
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={400}
            >
                <Tree
                    ref={treeRef}
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={setCheckedKeys}
                    treeData={menuArr}
                    fieldNames={{ children: 'children', title: 'name' }}
                />
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                    <Button onClick={() => setDrawerVisible(false)} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button type="primary" onClick={handleConfirmPermission}>
                        确认
                    </Button>
                </div>
            </Drawer>
        </div>
    );
};

export default Role;


