import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    Input,
    message,
    Select,
    Spin,
    Row, Col, Card
} from "antd";
const { Option } = Select;
import axios from "../../api";
import {
    PlusCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    DownOutlined,
    UserOutlined,
    PoweroffOutlined
} from "@ant-design/icons";
import classes from "./pay.module.css"
import { useSelector } from 'react-redux';

const Payments = () => {

    const [loading, setLoading] = useState(false);
    const [paidd, setPaidd] = useState(0)
    const auth = useSelector((state) => state.auth);
   console.log(auth)
    const onFinish = (id) => {
        console.log('Received ID from form: ', id);
        setLoading(true);
        axios
            .post('/updatePay', { ktjid: id.ktjID, pay: id.status })
            .then((response) => {
                // console.log("++++++", response.status)
                if (response.status == 200) {
                    const data = response.data;
                    console.log(data)
                    message.success('Data saved successfully!');
                    setLoading(false);
                } else {
                    message.error('Could not update!'); setLoading(false);
                }
            })
            .catch((error) => { console.log('err', error); message.error('Could not update!'); setLoading(false); })
    };

    useEffect(() => {
        // console.log("auth = ====" + auth?.user?.userType);
        if(auth?.user?.userType == "superAdmin")
        axios
            .get('/paidCount')
            .then((response) => {
                // console.log("++++++", response.status)
                if (response.status == 200) {
                    const data = response.data;
                    console.log(data)
                    message.success('Payment data fetched successfully!');
                    setPaidd(data.userCount)
                } else {
                    message.error('Could not get payment update!');
                }
            })
            .catch((error) => { console.log('err', error); message.error('Could not get payment update!'); });
    }, [])


    const checkID = (_, id) => {
        console.log(id.ktjID);
        if (id.ktjID) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Enter KTJ ID!'));
    };

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        console.log("Selected value:", selectedValue);
      };
      
    

    return (
        
        <div style={{ paddingTop: "2rem" }}>
            <Row
                style={{ marginBottom: "1em", margin: "auto" }}
                span={16}
                justify="start"
            >
                <Col span={2}></Col>
                <Col span={12} className={`${classes.boxShadowFlex}`}>
                    <Form
                        name="customized_form_controls"
                        layout="inline"
                        onFinish={onFinish}
                        initialValues={{
                            data: {
                                ktjID: "",
                                status: 'yes',
                            },
                        }}
                    >
                        <Form.Item
                            label="ktjID"
                            required
                            name="ktjID"
                            rules={[{ required: true, message: "ktjID is required" }]}
                        >
                            <Input required type="text" placeholder="Enter the ktjID" />
                        </Form.Item>
                        <Form.Item
                            label="status"
                            required
                            name="status"
                            rules={[{ required: true, message: "ktjID is required" }]}
                        >
                            {/* <Select
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'yes',
                                        label: 'yes',
                                    },
                                    {
                                        value: 'no',
                                        label: 'no',
                                    },
                                ]}
                            /> */}
                            <select  style={{width: 120, }}   onChange={handleChange}>
                                <option value="no">No</option>
                                <option value="yes">yes</option>
                                </select>
                        </Form.Item>
                        <Form.Item>
                            {loading && <Spin />}
                            {!loading && <Button type="primary" htmlType="submit">
                                Submit
                            </Button>}
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={2}></Col>
            </Row>
            {
                auth?.user?.userType == "superAdmin" ?
                    <>
                        <Row
                            style={{ marginBottom: "1em", margin: "auto" }}
                            span={16}
                            justify="start"
                        >
                            <Col span={2}></Col>
                            <Col span={12} className={`${classes.boxShadowFlex}`}>
                                <Card title="Payment Info" bordered={false} >
                                    <p>Total paid users : {paidd} </p>
                                    <p>Amount collected : {paidd * 1500} </p>
                                    <p> *excluding convenience fee </p>
                                </Card>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </> :
                    <>
                    </>
            }
        </div>
    )
}


export default Payments;