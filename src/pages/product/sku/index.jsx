import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Drawer, Row, Col, Tag, Carousel, Pagination, Popconfirm, message } from 'antd';
import { EditOutlined, InfoCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { reqGetSku, reqCancelSale, reqOnSale, reqGetSkuInfo, reqDelete } from '@/api/product/sku'
import './index.scss';

const Sku = () => {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);
    const [skuArr, setSkuArr] = useState([]);
    const [drawer, setDrawer] = useState(false);
    const [drawerValue, setDrawerValue] = useState({});

    useEffect(() => {
        getHasSku();
    }, []);

    const getHasSku = async (pager = 1, size = 3) => {
        setPageNo(pager);
        const result = await reqGetSku(pager, size);
        setSkuArr(result.data.records);
        setTotal(result.data.total);
    };

    const handler = (size) => {
        setPageSize(size)
        getHasSku(1, size);
    };

    const updateSale = async (row) => {
        if (row.isSale === 1) {
            await reqCancelSale(row.id);
            message.success('下架成功');
            getHasSku(pageNo);
        } else {
            await reqOnSale(row.id);
            message.success('上架成功');
        }
    };

    const updateSku = () => {
        message.success('工作人员正在紧急更新中，尽请期待！');
    };

    const showSkuInfo = async (row) => {
        setDrawer(true);
        const result = await reqGetSkuInfo(row.id);
        setDrawerValue(result.data);
    };

    const removeSku = async (id) => {
        const result = await reqDelete(id);
        if (result.code === 200) {
            message.success('删除成功');
            getHasSku(skuArr.length > 1 ? pageNo : pageNo - 1);
        } else {
            message.error('系统数据不能删除');
        }
    };

    const columns = [
        { title: '序号', dataIndex: 'index', key: 'index', render: (_, __, index) => index + 1, align: 'center', width: 120 },
        { title: '名称', dataIndex: 'skuName', key: 'skuName', align: 'center', width: 250 },
        { title: '描述', dataIndex: 'skuDesc', key: 'skuDesc', align: 'center', width: 250 },
        {
            title: '图片',
            dataIndex: 'skuDefaultImg',
            key: 'skuDefaultImg',
            align: 'center',
            width: 220,
            render: (text) => <img src={text} alt="图片" style={{ height: '100px', width: '100px' }} />,
        },
        { title: '重量', dataIndex: 'weight', key: 'weight', align: 'center', width: 220 },
        { title: '价格', dataIndex: 'price', key: 'price', align: 'center', width: 220 },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 325,
            render: (text, row) => (
                <>
                    <Button type="primary" icon={row.isSale === 1 ? <EditOutlined /> : <InfoCircleOutlined />} onClick={() => updateSale(row)}></Button>
                    <Button type="primary" icon={<EditOutlined />} onClick={updateSku}></Button>
                    <Button type="primary" icon={<InfoCircleOutlined />} onClick={() => showSkuInfo(row)}></Button>
                    <Popconfirm title={`你确定要删除${row.skuName}`} onConfirm={() => removeSku(row.id)}>
                        <Button type="primary" icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <Card>
            <Table
                dataSource={skuArr}
                columns={columns}
                rowKey="id"
                pagination={false}
                bordered
                style={{ margin: '10px 0px' }}
            />
            <div className="demo-pagination-block">
                <Pagination
                    current={pageNo}
                    pageSize={pageSize}
                    pageSizeOptions={[2, 3, 4, 5]}
                    total={total}
                    showSizeChanger
                    onChange={getHasSku}
                    onShowSizeChange={(current, size) => {
                        handler(size);
                    }}
                />
            </div>
            <Drawer
                open={drawer}
                onClose={() => setDrawer(false)}
                width={500}
                title={<span style={{ fontSize: '30px', color: 'red', fontWeight: 'bold', fontFamily: '宋体' }}>商品属性详情</span>}
            >
                <Row style={{ margin: '30px 0px' }}>
                    <Col span={6}>名称:</Col>
                    <Col span={18}>{drawerValue.skuName}</Col>
                </Row>
                <Row style={{ margin: '30px 0px' }}>
                    <Col span={6}>描述:</Col>
                    <Col span={18}>{drawerValue.skuDesc}</Col>
                </Row>
                <Row style={{ margin: '30px 0px' }}>
                    <Col span={6}>价格:</Col>
                    <Col span={18}>{drawerValue.price}</Col>
                </Row>
                <Row style={{ margin: '30px 0px' }}>
                    <Col span={6}>属性:</Col>
                    <Col span={18}>
                        {drawerValue.skuAttrValueList &&
                            drawerValue.skuAttrValueList.map((item) => (
                                <Tag key={item.id} style={{ margin: '5px 5px' }}>
                                    {item.attrName}
                                </Tag>
                            ))}
                    </Col>
                </Row>
                <Row style={{ margin: '30px 0px' }}>
                    <Col span={6}>图片:</Col>
                    <Col span={18}>
                        <Carousel autoplay>
                            {drawerValue.skuImageList &&
                                drawerValue.skuImageList.map((item) => (
                                    <div key={item.id} className="carousel-item" style={{ height: '100%', width: '100%' }}>
                                        <img src={item.imgUrl} alt="" className="carousel-image" />
                                    </div>
                                ))}
                        </Carousel>
                    </Col>
                </Row>
            </Drawer>
        </Card>
    );
};

export default Sku;
