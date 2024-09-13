import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { Form, Input, Select, Table, Button, message } from 'antd';
import { reqSpuHasSaleAttr, reqSpuImageList, reqAddSku } from '@/api/product/spu';
import { reqAttr } from '@/api/product/attr';
import './sku.scss'

const { Option } = Select;

const SkuForm = forwardRef(({ onChangeScene }, ref) => {
    const [arrAttr, setArrAttr] = useState([]);
    const [saleAttr, setSaleAttr] = useState([]);
    const [imgAttr, setImgAttr] = useState([]);
    const [skuParams, setSkuParams] = useState({
        category3Id: '',
        spuId: '',
        tmId: '',
        skuName: '',
        price: '',
        weight: '',
        skuDesc: '',
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuDefaultImg: ''
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useImperativeHandle(ref, () => ({
        initSkuData
    }));


    const initSkuData = async (c1Id, c2Id, spu) => {
        setSkuParams(prev => ({
            ...prev,
            category3Id: spu.category3Id,
            spuId: spu.id,
            tmId: spu.tmId
        }));
        const [attrRes, saleAttrRes, imgRes] = await Promise.all([
            reqAttr(c1Id, c2Id, spu.category3Id),
            reqSpuHasSaleAttr(spu.id),
            reqSpuImageList(spu.id)
        ]);
        setArrAttr(attrRes.data);
        setSaleAttr(saleAttrRes.data);
        setImgAttr(imgRes.data);
    };

    const save = async () => {
        const skuParamsCopy = { ...skuParams };
        skuParamsCopy.skuAttrValueList = arrAttr.reduce((prev, next) => {
            if (next.attrIdAndValueId) {
                const [attrId, valueId] = next.attrIdAndValueId.split(':');
                prev.push({ attrId, valueId });
            }
            return prev;
        }, []);
        skuParamsCopy.skuSaleAttrValueList = saleAttr.reduce((prev, next) => {
            if (next.saleIdAndValueId) {
                const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
                prev.push({ saleAttrId, saleAttrValueId });
            }
            return prev;
        }, []);
        try {
            const result = await reqAddSku(skuParamsCopy);
            if (result.code === 200) {
                message.success('添加SKU成功');
                onChangeScene({ flag: 0, params: '' });
            } else {
                message.error('添加SKU失败');
            }
        } catch (error) {
            message.error('添加SKU失败');
        }
    };

    const handleRowSelectionChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
        if (selectedRowKeys.length > 0) {
            const selectedRow = imgAttr.find(item => item.id === selectedRowKeys[0]);
            setSkuParams(prev => ({
                ...prev,
                skuDefaultImg: selectedRow.imgUrl
            }));
        }
    };

    const columns = [
        {
            title: '图片',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: imgUrl => <img src={imgUrl} width="80" height="80" />
        },
        {
            title: '名称',
            dataIndex: 'imgName',
            key: 'imgName'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, row) => (
                <Button type="primary" onClick={() => handleRowSelectionChange([row.id])}>设置</Button>
            )
        }
    ];

    return (
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout="horizontal" className="skuForm">
            <Form.Item label="SKU名称">
                <Input
                    placeholder="SKU名称"
                    value={skuParams.skuName}
                    onChange={e => setSkuParams({ ...skuParams, skuName: e.target.value })}
                />
            </Form.Item>
            <Form.Item label="价格（元）">
                <Input
                    placeholder="价格（元）"
                    type="number"
                    value={skuParams.price}
                    onChange={e => setSkuParams({ ...skuParams, price: e.target.value })}
                />
            </Form.Item>
            <Form.Item label="重量（克）">
                <Input
                    placeholder="重量（克）"
                    type="number"
                    value={skuParams.weight}
                    onChange={e => setSkuParams({ ...skuParams, weight: e.target.value })}
                />
            </Form.Item>
            <Form.Item label="SKU描述">
                <Input.TextArea
                    placeholder="SKU描述"
                    value={skuParams.skuDesc}
                    onChange={e => setSkuParams({ ...skuParams, skuDesc: e.target.value })}
                />
            </Form.Item>
            <Form.Item label="销售属性">
                {saleAttr.map(item => (
                    <Form.Item key={item.id} label={item.saleAttrName}>
                        <Select
                            style={{ width: '360px' }}
                            value={item.saleIdAndValueId}
                            onChange={value => {
                                const updatedSaleAttr = saleAttr.map(attr =>
                                    attr.id === item.id ? { ...attr, saleIdAndValueId: value } : attr
                                );
                                setSaleAttr(updatedSaleAttr);
                            }}
                        >
                            {item.spuSaleAttrValueList.map(item1 => (
                                <Option key={item1.id} value={`${item.id}:${item1.id}`}>
                                    {item1.saleAttrValueName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                ))}
            </Form.Item>
            <Form.Item label="图片名字">
                <Table
                    rowKey="id"
                    dataSource={imgAttr}
                    columns={columns}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys,
                        onChange: handleRowSelectionChange
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={save}>保存</Button>
                <Button type="default" onClick={() => onChangeScene({ flag: 0 })}>取消</Button>
            </Form.Item>
        </Form>
    );
});

export default SkuForm;
