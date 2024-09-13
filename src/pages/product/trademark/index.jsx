import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Card, Button, Table, Popconfirm, Pagination, Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '../../../api/product/trademark/index';
import './index.scss'

const { Column } = Table;
const TrademarkComponent = () => {
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(3);
    let [total, setTotal] = useState(0);
    const [trademarkArr, setTrademarkArr] = useState([]);
    const [dialogFormVisible, setDialogFormVisible] = useState(false);
    const [trademarkParams, setTrademarkParams] = useState({ tmName: '', logoUrl: '' });
    const formRef = useRef(null);
    const [imgList, setImgList] = useState([])
    const [dialogVisible, setDialogVisible] = useState(false);

    //当页码或者一页展示的值发生变化即可重新渲染页面
    useLayoutEffect(() => {
        getHasTrademark(pageNo);
    }, [pageNo, limit])

    const getHasTrademark = async (page = 1) => {
        const result = await reqHasTrademark(page, limit);
        if (result.code === 200) {
            setTotal(result.data.total);
            setTrademarkArr(result.data.records);
        }
    };

    const addTrademark = () => {
        setDialogFormVisible(true);
        setTrademarkParams({ tmName: '', logoUrl: '' });
        if (formRef.current) {
            formRef.current.resetFields();
        }
    };

    const updateTrademark = (row) => {
        setDialogFormVisible(true);
        setTrademarkParams(row);
        if (formRef.current) {
            formRef.current.resetFields();
        }
    };

    const handleCancel = () => {
        setDialogFormVisible(false);
    };

    const handleConfirm = async () => {
        try {
            await formRef.current.validateFields();
            const result = await reqAddOrUpdateTrademark(trademarkParams);
            console.log(trademarkParams)
            console.log(result)
            if (result.code === 200) {
                message.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功');
                setDialogFormVisible(false);
                getHasTrademark(trademarkParams.id ? pageNo : 1);
            } else {
                message.error(trademarkParams.id ? '修改品牌失败' : '添加品牌失败');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (page) => {
        setPageNo(page);
    };

    const handlePageSizeChange = (current, size) => {
        setLimit(size);
    };

    //上传文件格式确认
    const beforeAvatarUpload = (file) => {
        const isImage = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif';
        const isLt4M = file.size / 1024 / 1024 < 4;
        if (!isImage) {
            message.error('上传文件格式务必PNG|JPG|GIF');
        }
        if (!isLt4M) {
            message.error('上传文件大小小于4M');
        }
        return isImage && isLt4M;
    };

    const handlePictureCardPreview = (file) => {
        // setDialogImageUrl(file.url || file.thumbUrl);
        setDialogVisible(true);
    };

    const handleAvatarSuccess = (info) => {
        console.log('Upload info:', info);
        if (info.file.status === 'done') {
            console.log(info.file)
            setImgList(imgList)
            const { response } = info.file;
            setTrademarkParams((prev) => ({ ...prev, logoUrl: response.data }));
            if (formRef.current) {
                formRef.current.validateFields(['logoUrl']);
            }
        }
    };

    const removeTradeMark = async (id) => {
        const result = await reqDeleteTrademark(id);
        if (result.code === 200) {
            message.success('删除品牌成功')
            getHasTrademark(trademarkArr.length > 1 ? pageNo : setPageNo(pageNo - 1));
        } else {
            message.error('删除品牌失败');
        }
    };

    return (
        <div>
            <Card className="box-card">
                <Button className='addTrademark' type="primary" icon={<PlusOutlined />} onClick={addTrademark}>
                    添加品牌
                </Button>
                <Table
                    dataSource={trademarkArr}
                    style={{ margin: '10px 0' }}
                    rowKey="id"
                    pagination={false}
                >
                    <Column title="序号" render={(text, record, index) => index + 1} width="80px" align="center" />
                    <Column title="品牌名称" dataIndex="tmName" key="tmName" />
                    <Column title="品牌LOGO" key="logoUrl" render={(record) => (
                        <img src={record.logoUrl} style={{ width: 100, height: 100 }} alt="logo" />
                    )} />
                    <Column title="品牌操作" key="action" render={(text, record) => (
                        <>
                            <Button type="primary" className='btn' size="large" icon={<EditOutlined />} onClick={() => updateTrademark(record)} />
                            <Popconfirm
                                title={`您确定要删除${record.tmName}?`}
                                onConfirm={() => removeTradeMark(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" className='btn' size="large" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </>
                    )} />
                </Table>
                <Pagination
                    current={pageNo}
                    pageSize={limit}
                    total={total}
                    showSizeChanger
                    pageSizeOptions={[3, 5, 7, 9]}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    style={{ marginTop: 10 }}
                />
            </Card>
            <Modal
                title={trademarkParams.id ? '修改品牌' : '添加品牌'}
                open={dialogFormVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="confirm" type="primary" onClick={handleConfirm}>
                        确定
                    </Button>
                ]}
            >
                <Form
                    ref={formRef}
                    layout="vertical"
                    initialValues={trademarkParams}
                    onValuesChange={(changedValues) =>
                        setTrademarkParams((prev) => ({ ...prev, ...changedValues }))
                    }
                >
                    <Form.Item
                        label="品牌名称"
                        name="tmName"
                        rules={[
                            {
                                required: true,
                                message: '品牌名称位数大于等于两位',
                                min: 2
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="品牌LOGO"
                        name="logoUrl"
                        rules={[
                            {
                                required: true,
                                message: 'LOGO图片务必上传'
                            }
                        ]}
                    >
                        <Upload
                            name="avatar"
                            className="avatar-uploader"
                            fileList={imgList}
                            onPreview={handlePictureCardPreview}
                            listType="picture-card"
                            showUploadList={false}
                            action="http://sph-api.atguigu.cn/admin/product/fileUpload"
                            beforeUpload={beforeAvatarUpload}
                            onChange={handleAvatarSuccess}

                        >
                            {trademarkParams.logoUrl ? (
                                <img src={trademarkParams.logoUrl} alt="avatar" className="avatar" />
                            ) : (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TrademarkComponent;
