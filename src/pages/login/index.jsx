import { useState } from 'react';
import { Form, Input, Button, notification, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { fetchLogin, fetchUserInfo } from '@/store/login';
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';

const App = () => {
    const [loading, setLoading] = useState(false);
    // 使用 useState 来管理表单字段的状态
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await dispatch(fetchLogin(values))
            const res = await dispatch(fetchUserInfo())
            notification.success({
                message: '欢迎回来',
                description: '登录成功'
            });
            //路由守卫中的重定向
            const from = location.state?.from || '/';
            navigate(from, { replace: true });           
        } catch (error) {
            notification.error({
                message: '登录失败',
                description: error.message
            });
        } finally {
            setLoading(false);
        }
    };
    // 处理表单字段的变化
    // 处理表单字段的变化
    return (
        <div className="login-container">
            <Row>
                <Col span={12} xs={12}></Col>
                <Col span={12} xs={12}>
                    <Form
                        form={form}
                        className="login-form"
                        onFinish={onFinish}
                        initialValues={{ username: 'admin', password: '111111' }}
                    >
                        <h2>Welcome 请坐！</h2>
                        <h2>欢迎来到硅谷甄选</h2>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }, { min: 5, message: '账号长度至少五位' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }, { min: 5, message: '密码长度至少五位' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} className="login-btn">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default App;
