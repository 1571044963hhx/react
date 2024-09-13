import { useEffect, useState } from 'react';
import { Card, Select, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchC1, fetchC2, fetchC3, setC1Id, setC2Id, setC3Id } from '../store/category';

const { Option } = Select;
const Category = ({ scene }) => {
    const dispatch = useDispatch();
    //使用 useSelector 钩子从 Redux store 中获取数据时，该钩子会订阅 Redux store 的更新。
    //这意味着每当 Redux store 中的状态发生变化时，useSelector 钩子会重新运行，并返回最新的状态。因此，组件中的数据是实时更新的。
    const { c1Arr, c1Id, c2Arr, c2Id, c3Arr, c3Id } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(fetchC1());
    }, [dispatch]);

    const handleC1Change = (value) => {
        console.log(value)
        dispatch(setC1Id(value))
        dispatch(setC2Id(''));
        dispatch(setC3Id(''));
        dispatch(fetchC2(value));
        console.log(c1Arr, c2Arr, c3Arr)
    };

    const handleC2Change = (value) => {
        dispatch(setC2Id(value))
        dispatch(setC3Id(''));
        dispatch(fetchC3(value));
    };

    const handleC3Change = (value) => {
        dispatch(setC3Id(value));
    };

    return (
        <Card style={{ margin: '10px', height: '100px' }}>
            <Form layout="inline">
                <Form.Item label="一级分类" style={{ marginRight: '100px', height: '30px', width: '200px' }}>
                    <Select
                        value={c1Id}
                        onChange={handleC1Change}
                        disabled={scene === 0 ? false : true}
                    >
                        {c1Arr && c1Arr.map(c1 => (
                            <Option key={c1.id} value={c1.id}>
                                {c1.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="二级分类" style={{ marginRight: '100px', height: '30px', width: '200px' }}>
                    <Select
                        value={c2Id}
                        onChange={handleC2Change}
                        disabled={scene === 0 ? false : true}
                    >
                        {c2Arr && c2Arr.map(c2 => (
                            <Option key={c2.id} value={c2.id}>
                                {c2.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="三级分类" style={{ marginRight: '100px', height: '30px', width: '200px' }}>
                    <Select
                        value={c3Id}
                        onChange={handleC3Change}
                        disabled={scene === 0 ? false : true}
                    >
                        {c3Arr && c3Arr.map(c3 => (
                            <Option key={c3.id} value={c3.id}>
                                {c3.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Category;
