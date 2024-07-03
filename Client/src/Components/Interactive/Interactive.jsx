import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  Tooltip,
  Space,
} from "antd";
import axios from "../../api.js";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import DownloadUser from "../ActiveUsers/DownloadUser.jsx";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

const Schedule = () => {
  const [showModal, setshowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataloading, setdataLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [scheduleId, setscheduleId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editMode, seteditMode] = useState(false);

  useEffect(() => {
    getUrls();
  }, []);

  const getUrls = () => {
    setdataLoading(true);
    axios
      .get("/interactive/")
      .then((res) => {
        setdataLoading(false);
        message.success("Interaction User Fetched  Successfully");

        const data = res.data.iu.map((schedule) => {
          return {
            ...schedule,
            actions: schedule,
          };
        });
        setSchedules(data);
      })
      .catch((err) => {
        setdataLoading(false);
        message.error("Error Fetching Schedules");
        console.log(err);
      });
  };

  const addScheduleHandler = (values) => {
    setLoading(true);

    const body = {
      ...values,
    };
    let url = "interactive/addSession";
    if (editMode) {
      url = "schedule/updateSession";
      body._id = scheduleId;
      axios
        .put(url, body)
        .then((res) => {
          setLoading(false);
          message.success(res.data.message);
          form.resetFields();
          setshowModal(false);
          getUrls();
          seteditMode(false);
        })
        .catch((error) => {
          setLoading(false);
          message.error(
            error.response.data.message
              ? error.response.data.message
              : error.response.data
          );
        });
    } else {
      axios
        .post(url, body)
        .then((res) => {
          message.success(res.data.message);
          setshowModal(false);
          form.resetFields();
          setLoading(false);
          getUrls();
        })
        .catch((err) => {
          setLoading(false);
          message.error(err.response.data.message);
        });
    }
  };

  const deleteUrlHandler = (urlId) => {
    console.log(urlId);

    // setloading(true);
    setDeleting(true);
    axios
      .post("/schedule/deleteSchedule", {
        _id: urlId,
      })
      .then((res) => {
        // setloading(false);
        message.success(res.data.message);
        setDeleting(false);
        setshowDeleteModal(false);
        getUrls();
      })
      .catch((error) => {
        message.error(error.response.data?.message);
        setDeleting(false);
        setshowDeleteModal(false);
      });
  };

 
    const handleDeleteSession = async (sessionId) => {
      try {
        const response = await axios.delete(`/interactive/sessions/${sessionId}`);
    
        if (response.status === 200) {
          // If deletion is successful, you can update the sessions state or perform any other necessary actions
          // For example, refetch the sessions after deletion
          // refetchSessions();
    
          message.success('Session deleted successfully');
        } else {
          message.error('Failed to delete session');
        }
      } catch (error) {
        console.error('Error deleting session:', error);
        message.error('An error occurred while deleting the session');
      }
    };
  

  const editUrlHandler = (schedule) => {
    form.setFieldsValue({
      type: schedule.type,
      title: schedule.title,
      startingTime: schedule.startingTime,
      endingTime: schedule.endingTime,
      description: schedule.description,
      imageUrl: schedule.imageUrl,
      joiningLink: schedule.joiningLink,
      date: schedule.date,
    });
    seteditMode(true);
    setscheduleId(schedule._id);
    setshowModal(true);
  };

  const column = [
    { title: "number", dataIndex: "number", key: "number" },

    {
      title: "joiningLink",
      dataIndex: "joiningLink",
      key: "joiningLink",
      ellipsis: true,
      render: (link) => <a href={link}>{link}</a>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actionIndex) => {
        console.log(actionIndex);
        return (
          <Space justify="space-between">
            <Tooltip placement="bottom" title="Edit Schedule">
              <DownloadUser
                title="Download Csv of Users"
                data={actionIndex.users}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Delete Schedule">
    <Button
      type="danger"
      icon={<DeleteOutlined />}
      onClick={() => handleDeleteSession(actionIndex._id)} // Assuming actionIndex.id is the session ID
    />
  </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Row justify="end" span={24}>
        <Modal
          title={<Row justify="center">Add Url</Row>}
          visible={showModal}
          width={800}
          footer={<div></div>}
          onCancel={() => {
            form.resetFields();
            setshowModal(false);
            seteditMode(false);
          }}
        >
          <Form
  labelCol={{ span: 8 }}
  form={form}
  labelAlign="left"
  onFinish={addScheduleHandler}
>
  <Form.Item
    label="Number"
    required
    name="number"
    rules={[{ required: true, message: "Number is required" }]}
  >
    <Input required type="number" placeholder="Enter the Number" />
  </Form.Item>

  <Form.Item
    label="Title"
    required
    name="title"
    rules={[{ required: true, message: "Title is required" }]}
  >
    <Input required type="text" placeholder="Enter the Title" />
  </Form.Item>

  <Form.Item
    label="Joining Link"
    required
    name="joiningLink"
    rules={[{ required: true, message: "Joining Link is required" }]}
  >
    <Input required type="text" placeholder="Enter the Joining Link" />
  </Form.Item>

  <Form.Item
    label="Image URL"
    required
    name="imageUrl"
    rules={[{ required: true, message: "Image URL is required" }]}
  >
    <Input required type="text" placeholder="Enter the Image URL" />
  </Form.Item>

  <Form.Item>
    <Button loading={loading} type="primary" htmlType="submit">
      {editMode ? "Save" : "Submit"}
    </Button>
  </Form.Item>
</Form>


        </Modal>
        <Modal
          visible={showDeleteModal}
          okText="Confirm"
          cancelText="Cancel"
          confirmLoading={deleting}
          onCancel={() => {
            setshowDeleteModal(false);
          }}
          onOk={() => {
            deleteUrlHandler(scheduleId);
          }}
        >
          Are you sure you want to delete this Url ?
        </Modal>

        <Col offset={20} style={{ padding: "1rem" }}>
          {" "}
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setshowModal(true)}
          >
            Add Session
          </Button>
        </Col>
      </Row>

      <Row justify="center" style={{ padding: "1rem" }}>
        <Col span={20}>
          <Table
            bordered
            columns={column}
            dataSource={schedules}
            loading={dataloading}
          />
        </Col>
      </Row>
    </>
  );
};

export default Schedule;
