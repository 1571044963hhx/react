import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, message, Popconfirm } from 'antd';
import { reqAllPermisstion, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu';
import './index.scss'; // 导入样式文件

const { Column } = Table;

const Permission = () => {
    const [permissions, setPermissions] = useState([]);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [menuData, setMenuData] = useState({
        code: '',
        level: 0,
        name: '',
        pid: 0,
        id: 0,
    });
    const [form] = Form.useForm();

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        const result = await reqAllPermisstion();
        if (result.code === 200) {
            setPermissions(result.data);
        }
    };

    const handleAddPermission = (row) => {
        setMenuData({
            id: 0,
            code: '',
            level: row.level + 1,
            name: '',
            pid: row.id,
        });
        setIsDialogVisible(true);
    };

    const handleUpdatePermission = (row) => {
        setMenuData(row);
        setIsDialogVisible(true);
    };

    const handleDeletePermission = async (id) => {
        const result = await reqRemoveMenu(id);
        if (result.code === 200) {
            message.success('删除成功');
            fetchPermissions();
        }
    };

    const handleSave = async () => {
        try {
            await form.validateFields();
            const result = await reqAddOrUpdateMenu(menuData);
            if (result.code === 200) {
                setIsDialogVisible(false);
                message.success(menuData.id ? '更新成功' : '添加成功');
                fetchPermissions();
            }
        } catch (error) {
            // Handle form validation error
        }
    };

    return (
        <div>
            <Table
                dataSource={permissions}
                rowKey="id"
                bordered
                style={{ width: '94%', margin: '3%' }}
            >
                <Column title="名称" dataIndex="name" key="name" />
                <Column title="权限值" dataIndex="code" key="code" />
                <Column title="修改时间" dataIndex="updateTime" key="updateTime" />
                <Column
                    title="操作"
                    key="actions"
                    render={(text, record) => (
                        <div>
                            <Button
                                style={{ width: '100px' }}
                                type="primary"
                                size="small"
                                onClick={() => handleAddPermission(record)}
                                disabled={record.level === 4}
                            >
                                {record.level === 3 ? '添加功能' : '添加菜单'}
                            </Button>
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => handleUpdatePermission(record)}
                                disabled={record.level === 1}
                            >
                                编辑
                            </Button>
                            <Popconfirm
                                title={`你确定要删除${record.name}?`}
                                onConfirm={() => handleDeletePermission(record.id)}
                            >
                                <Button
                                    type="primary"
                                    size="small"
                                    disabled={record.level === 1}
                                >
                                    删除
                                </Button>
                            </Popconfirm>
                        </div>
                    )}
                />
            </Table>

            <Modal
                title={menuData.id ? '更新菜单' : '添加菜单'}
                visible={isDialogVisible}
                onCancel={() => setIsDialogVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsDialogVisible(false)}>
                        取消
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        确定
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ name: menuData.name, code: menuData.code }}
                >
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[{ required: true, message: '请输入菜单名称' }]}
                    >
                        <Input
                            value={menuData.name}
                            onChange={(e) =>
                                setMenuData({ ...menuData, name: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="权限"
                        name="code"
                        rules={[{ required: true, message: '请输入权限数值' }]}
                    >
                        <Input
                            value={menuData.code}
                            onChange={(e) =>
                                setMenuData({ ...menuData, code: e.target.value })
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Permission;
