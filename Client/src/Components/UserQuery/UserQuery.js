import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createIssue } from "../../actions/issueActions";
import Loader from "../Loader/index";
import {
  Row,
  Col,
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tooltip,
  Space,
} from "antd";
const { TextArea } = Input;

import axios from "../../api";

function UserQuery(props) {
  const user = useSelector((state) => state.auth.user);
  const issues = useSelector((state) => state.issues);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      eventName: props.eventname,
      eventType: props.eventType,
      subject: "",
      description: "",
    });
  }, [form]);

  const addQueryHandler = async (values) => {
    let EventHeadKtjId = "";
    let EventHeadId = "";

    await axios
      .get("/" + values.eventType.toLowerCase())
      .then((result) => {
        console.log(result.data);
        let getHeadData = result.data[values.eventType.toLowerCase()].find(
          (event) => event.title == values.eventName
        );
        EventHeadKtjId = getHeadData.headKtjId;
      });

    // console.log(EventHeadKtjId);

    await axios.get("/getUsers").then((result) => {
      console.log(result.data);
      let getHeadData = result.data.users.find(
        (user) => user.ktjID == EventHeadKtjId
      );
      EventHeadId = getHeadData._id;
    });

    // console.log(EventHeadId)

    const body = {
      ...values,
      status: false,
      userId: user._id,
      headId: EventHeadId,
    };
    dispatch(createIssue(body));
    form.resetFields();
    // console.log(body);

    // let url = "/issue/createIssue";

    // axios
    //   .post(url, body)
    //   .then((res) => {
    //     message.success(res.data.message);
    //     setIsModalVisible(false);
    //     form.setFieldsValue({
    //       eventName: props.eventname,
    //       eventType: props.eventType,
    //       subject: "",
    //       description: "",
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //     message.error(error.response.data?.message);
    //   });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row style={{ padding: "0em 1em" }}>
      {/* <Button type="primary" onClick={showModal}>
        Ask Query
      </Button> */}
      {/* <Modal
        title="Query Form"
        justify="center"
        visible={isModalVisible}
        width={900}
        footer={<div></div>}
        onCancel={handleCancel}
      > */}
      {issues.inProgress ? (
        <Loader />
      ) : (
        <Form
          form={form}
          labelCol={{ span: 7 }}
          labelAlign="left"
          wrapperCol={{
              span: 24,
            }}
          style = {{
            width: "100%",
            flex: 1
          }}
          layout="horizontal"
          onFinish={addQueryHandler}
        >
          <Form.Item label="EventType" name="eventType">
            <Input type="text" name="eventType" />
          </Form.Item>

          <Form.Item label="EventName" name="eventName">
            <Input type="text" name="eventName" />
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Subject is missing" }]}
          >
            <Input type="text" name="subject" placeholder="Enter the subject" />
          </Form.Item>

          <Form.Item
            label="Description"
            required
            name="description"
            rules={[
              { required: true, message: "Issue Description is missing" },
            ]}
          >
            <TextArea rows={4} allowClear placeholder="Enter the Description" />
          </Form.Item>
            <Row justify="center">
            <Form.Item>
                <Button shape="round" style={{
                    backgroundImage: "linear-gradient(-225deg, rgb(255, 195, 113) 20%, rgb(255, 95, 109) 100%)"
                }} htmlType="submit">
                Submit Query
              </Button>
            </Form.Item>
          </Row>
        </Form>
      )}
      {/* </Modal> */}
    </Row>
  );
}

export default UserQuery;
