import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Form, Input, Select, Upload, Button, Modal, Table, Tag, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './spu.scss';
import { reqALLSaleAttr, reqSpuImageList, reqSpuHasSaleAttr, reqAllTradeMark, reqAddOrUpdateSpu } from '@/api/product/spu'

const { Option } = Select;

const SpuForm = forwardRef((props, ref) => {
  const [spuParams, setSpuParams] = useState({
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  });

  const [imgList, setImgList] = useState([]);
  const [saleAttr, setSaleAttr] = useState([]);
  const [allSaleAttr, setAllSaleAttr] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogImageUrl, setDialogImageUrl] = useState('');
  const [saleAttrIdAndValueName, setSaleAttrIdAndValueName] = useState('');
  const [allTradeMarkRes, setAllTradeMarkRes] = useState([])

  useImperativeHandle(ref, () => ({
    initAddSpu: async (c3Id) => {
      setSpuParams({
        category3Id: c3Id,
        spuName: '',
        description: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: [],
      });
      setImgList([]);
      setSaleAttr([]);
      setSaleAttrIdAndValueName('');

      const TradeMarkRes = await reqAllTradeMark();
      setAllTradeMarkRes(TradeMarkRes.data)
      const allSaleAttrRes = await reqALLSaleAttr();
      setAllSaleAttr(allSaleAttrRes.data);
    },
    initHasSpuData: async (spu) => {
      setSpuParams(spu);

      const TradeMarkRes = await reqAllTradeMark();
      const spuImageListRes = await reqSpuImageList(spu.id);
      const spuSaleAttrRes = await reqSpuHasSaleAttr(spu.id);
      const allSaleAttrRes = await reqALLSaleAttr();

      setImgList(spuImageListRes.data.map(item => ({
        name: item.imgName,
        url: item.imgUrl,
      })));

      setSaleAttr(spuSaleAttrRes.data);
      setAllSaleAttr(allSaleAttrRes.data);
      setAllTradeMarkRes(TradeMarkRes.data)
    },
  }));

  const handlePictureCardPreview = (file) => {
    setDialogImageUrl(file.url || file.thumbUrl);
    setDialogVisible(true);
  };

  const handleRemove = (file) => {
    setImgList(prevList => prevList.filter(item => item.uid !== file.uid));
  };

  const handleUpload = (file) => {
    console.log(file)
    console.log(imgList)
    const isValidType = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif';
    if (!isValidType) {
      message.error('上传文件务必PNG|JPG|GIF');
      return false;
    }

    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error('上传文件务必小于3M');
      return false;
    }

    return true;
  };

  const handleChange = ({ fileList }) => {
    setImgList(fileList);
  };

  const toEdit = (row) => {
    row.flag = true;
    row.saleAttrValue = '';
    setSaleAttr([...saleAttr]);
  };

  const toLook = (row) => {
    if (!row.saleAttrValue.trim()) {
      message.error('属性值不能为空');
      return;
    }

    const repeat = row.spuSaleAttrValueList.some(item => item.saleAttrValueName === row.saleAttrValue);
    if (repeat) {
      message.error('属性值重复');
      return;
    }

    row.spuSaleAttrValueList.push({
      baseSaleAttrId: row.baseSaleAttrId,
      saleAttrValueName: row.saleAttrValue,
    });

    row.flag = false;
    setSaleAttr([...saleAttr]);
  };

  const addSaleValue = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.split(':');
    setSaleAttr([...saleAttr, {
      baseSaleAttrId,
      saleAttrName,
      spuSaleAttrValueList: []
    }]);
    setSaleAttrIdAndValueName('');
  };

  const save = async () => {
    const spuImageList = imgList.map(item => ({
      imgName: item.name,
      imgUrl: item.url || item.response.data,
    }));

    const newSpuParams = {
      ...spuParams,
      spuImageList,
      spuSaleAttrList: saleAttr,
    };

    const result = await reqAddOrUpdateSpu(newSpuParams);

    if (result.code === 200) {
      message.success(spuParams.id ? '更新成功' : '保存成功');
      props.onChangeScene({ flag: 0, params: spuParams.id ? 'update' : 'add' });
    } else {
      message.error(spuParams.id ? '更新失败' : '保存失败');
    }
  };

  const unSelectSaleAttr = allSaleAttr.filter(item => {
    return !saleAttr.some(attr => attr.saleAttrName === item.name);
  });

  return (
    <Form layout="vertical">
      <Form.Item label="SPU名称">
        <Input
          placeholder="请输入SPU名称"
          style={{ width: 500 }}
          value={spuParams.spuName}
          onChange={e => setSpuParams({ ...spuParams, spuName: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="SPU品牌">
        <Select
          style={{ width: 200 }}
          value={spuParams.tmId}
          onChange={value => setSpuParams({ ...spuParams, tmId: value })}
        >
          {(allTradeMarkRes || []).map(item => (
            <Option key={item.id} value={item.id}>
              {item.tmName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="SPU描述">
        <Input
          placeholder="请输入描述"
          style={{ width: 500 }}
          value={spuParams.description}
          onChange={e => setSpuParams({ ...spuParams, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="SPU照片">
        <Upload
          listType="picture-card"
          fileList={imgList}
          onPreview={handlePictureCardPreview}
          onRemove={handleRemove}
          onChange={handleChange}
          beforeUpload={handleUpload}
          action="http://sph-api.atguigu.cn/admin/product/fileUpload"
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
        <Modal visible={dialogVisible} footer={null} onCancel={() => setDialogVisible(false)}>
          <img alt="example" style={{ width: '100%' }} src={dialogImageUrl} />
        </Modal>
      </Form.Item>
      <Form.Item label="SPU销售属性">
        <Select
          style={{ width: 200 }}
          placeholder={`还有${3 - saleAttr.length}项没有选择`}
          value={saleAttrIdAndValueName}
          onChange={value => setSaleAttrIdAndValueName(value)}
        >
          {(unSelectSaleAttr || []).map(item => (
            <Option key={item.id} value={`${item.id}:${item.name}`}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Button
          className='btn'
          type="primary"
          icon={<PlusOutlined />}
          onClick={addSaleValue}
          disabled={!saleAttrIdAndValueName}
        >
          添加销售属性
        </Button>
      </Form.Item>
      <Form.Item>
        <Table dataSource={saleAttr} bordered rowKey="baseSaleAttrId">
          <Table.Column title="序号" render={(text, record, index) => index + 1} align="center" width={100} />
          <Table.Column title="属性" dataIndex="saleAttrName" align="center" width={200} />
          <Table.Column
            title="属性值"
            align="center"
            render={(text, record) => (
              <>
                {(record.spuSaleAttrValueList || []).map((item, index) => (
                  <Tag
                    closable
                    key={index}
                    onClose={() => {
                      record.spuSaleAttrValueList.splice(index, 1);
                      setSaleAttr([...saleAttr]);
                    }}
                  >
                    {item.saleAttrValueName}
                  </Tag>
                ))}
                {record.flag ? (
                  <>
                    <Input
                      style={{ width: 100, marginRight: 8 }}
                      value={record.saleAttrValue}
                      onChange={e => {
                        record.saleAttrValue = e.target.value;
                        setSaleAttr([...saleAttr]);
                      }}
                    />
                    <Button type="primary" size="small" onClick={() => toLook(record)}>确认</Button>
                    <Button size="small" style={{ marginLeft: 8 }} onClick={() => {
                      record.flag = false;
                      setSaleAttr([...saleAttr]);
                    }}>取消</Button>
                  </>
                ) : (
                  <Button className='btn' type="primary" size="small" onClick={() => toEdit(record)}>添加属性值</Button>
                )}
              </>
            )}
          />
          <Table.Column
            title="操作"
            align="center"
            render={(text, record) => (
              <Button
                style={{ height: '30px', width: '100px' }}
                type='primary'
                icon={<DeleteOutlined />}
                onClick={() => {
                  setSaleAttr(saleAttr.filter(item => item.baseSaleAttrId !== record.baseSaleAttrId));
                }}
              >
                删除
              </Button>
            )}
          />
        </Table>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={save}>保存</Button>
        <Button style={{ marginLeft: 8 }} onClick={() => props.onChangeScene({ flag: 0 })}>取消</Button>
      </Form.Item>
    </Form>
  );
});

export default SpuForm;

