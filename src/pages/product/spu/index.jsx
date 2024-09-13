import { useState, useEffect, useRef } from 'react';
import { Card, Button, Table, Pagination, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import SkuForm from './sku';
import SpuForm from './spu';
import './index.scss'

import { clearAll } from '../../../store/category';
import { useSelector, useDispatch } from 'react-redux';
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '../../../api/product/spu';
import Category from '@/components/category';


const Spu = () => {
    const [pageNO, setPageNO] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [spuAttr, setSpuAttr] = useState([]);
    const [total, setTotal] = useState(0);
    const [scene, setScene] = useState(0);
    const [skuAttr, setSkuAttr] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);

    const { c1Arr, c1Id, c2Arr, c2Id, c3Arr, c3Id } = useSelector(state => state.category);

    const dispatch = useDispatch();

    const spuRef = useRef(null);
    const skuRef = useRef(null);

    useEffect(() => {
        if (c3Id) {
            getHasSpu(pageNO, pageSize);
        } else {
            setSpuAttr([]);
        }
    }, [c3Id, pageNO, pageSize]);

    const change1Scene = () => {
        setScene(1);
        spuRef.current.initAddSpu(c3Id);
    };

    const change0Scene = (obj) => {
        setScene(obj.flag);
        if (obj.params === 'update') {
            getHasSpu(pageNO);
        } else {
            getHasSpu(1);
        }
    };

    const updateScene = (row) => {
        setScene(1);
        spuRef.current.initHasSpuData(row);
    };

    const addSku = (spu) => {
        console.log(skuRef.current)
        skuRef.current.initSkuData(c1Id, c2Id, spu);
        setScene(2);
    };

    const getHasSpu = async (page) => {
        console.log(page)
        setPageNO(page);
        const result = await reqHasSpu(page, pageSize, c3Id);
        if (result.code === 200) {
            setSpuAttr(result.data.records);
            setTotal(result.data.total);
        }
    };
    const changepage = (event) => {
        setPageNO(event)
    }

    const show = async (row) => {
        setDialogVisible(true);
        const result = await reqSkuList(row.id);
        setSkuAttr(result.data);
    };

    const deleteSpu = async (row) => {
        const result = await reqRemoveSpu(row.id);
        if (result.code === 200) {
            message.success('删除成功');
            getHasSpu(spuAttr.length > 1 ? pageNO : pageNO - 1);
        } else {
            message.error('删除失败');
        }
    };
    useEffect(() => {
        return () => {
            dispatch(clearAll());
        };
    }, [dispatch]);

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            width: 100,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'SPU属性',
            dataIndex: 'spuName',
            key: 'spuName',
            align: 'center',
        },
        {
            title: 'SPU描述',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
            ellipsis: true,
        },
        {
            title: 'SPU操作',
            key: 'action',
            align: 'center',
            render: (text, row) => (
                <div>
                    <Button type="primary" icon={<EditOutlined />} size="large" onClick={() => updateScene(row)} />
                    <Button type="primary" icon={<EyeOutlined />} size="large" onClick={() => show(row)} />
                    <Button type="primary" icon={<DeleteOutlined />} size="large" onClick={() => deleteSpu(row)} />
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => addSku(row)} />
                </div>
            ),
        },
    ];

    return (
        <div>
            <Category scene={scene} />
            <div style={{ display: scene === 0 ? 'block' : 'none' }}>
                <Card style={{ margin: '10px' }}>
                    <Button
                        className='addSPU'
                        type="primary"
                        icon={<PlusOutlined />}
                        disabled={!c3Id}
                        onClick={change1Scene}
                    >
                        添加SPU
                    </Button>
                    <Table
                        dataSource={spuAttr}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                    />
                    <Pagination
                        current={pageNO}
                        pageSize={pageSize}
                        pageSizeOptions={[3, 5, 7, 9]}
                        showSizeChanger
                        total={total}
                        onChange={
                            (page, size) => {
                                console.log(page, size)
                                setPageNO(page);
                                setPageSize(size);
                                getHasSpu(page);
                            }}
                    />
                </Card>
            </div>
            <div style={{ display: scene === 1 ? 'block' : 'none' }}>
                <Card style={{ margin: '10px' }}>
                    <SpuForm ref={spuRef} onChangeScene={change0Scene} />
                </Card>
            </div>
            <div style={{ display: scene === 2 ? 'block' : 'none' }}>
                <Card style={{ margin: '10px' }}>
                    <SkuForm ref={skuRef} onChangeScene={change0Scene} />
                </Card>
            </div>
            <Modal open={dialogVisible} onCancel={() => setDialogVisible(false)} footer={null}>
                <Table
                    dataSource={skuAttr}
                    columns={[
                        {
                            title: '型号',
                            dataIndex: 'skuName',
                            key: 'skuName',
                        },
                        {
                            title: 'SKU图片',
                            key: 'skuDefaultImg',
                            render: (text, row) => (
                                <img src={row.skuDefaultImg} alt="SKU" style={{ width: 100, height: 100 }} />
                            ),
                        },
                        {
                            title: '价格',
                            dataIndex: 'price',
                            key: 'price',
                        },
                        {
                            title: '重量',
                            dataIndex: 'weight',
                            key: 'weight',
                        },
                    ]}
                    rowKey="id"
                />
            </Modal>
        </div>
    );
};

export default Spu;

