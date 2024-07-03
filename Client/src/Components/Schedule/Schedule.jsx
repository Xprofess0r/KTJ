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
    Space
} from "antd";
import axios from "../../api";
import {
    PlusCircleOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { Select } from 'antd';



import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";



const Schedule = () => {
    const { Option } = Select;

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
        getUrls()
    }, [])


    const getUrls = () => {
        setdataLoading(true)
        axios.get('/schedule/')
            .then(res => {
                setdataLoading(false)
                message.success('Schedules Fetched Successfully')


                const data = res.data.schedule.map(schedule => {
                    return {
                        ...schedule,
                        actions: schedule
                    }
                })
                setSchedules(data)
            })
            .catch(err => {
                setdataLoading(false)
                message.error('Error Fetching Schedules')
                console.log(err);
            })
    }


    const addScheduleHandler = (values) => {

        setLoading(true);

        const body = {
            ...values,
        };
        let url = "schedule/createSchedule";
        if (editMode) {
            url = "schedule/updateSchedule";
            body._id = scheduleId
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
                })
        }



    }

    const deleteUrlHandler = (urlId) => {
        console.log(urlId);

        // setloading(true);
        setDeleting(true);
        axios
            .post('/schedule/deleteSchedule', {
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
        sponsImageUrl: schedule.sponsImageUrl,
        joiningLinkText: schedule.joiningLinkText,
      });
      seteditMode(true);
      setscheduleId(schedule._id);
      setshowModal(true);
    };

    const column = [
      { title: "type", dataIndex: "type", key: "type", ellipsis: true },
      { title: "title", dataIndex: "title", key: "title", ellipsis: true },
      {
        title: "description",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
      },
      {
        title: "startingTIme",
        dataIndex: "startingTime",
        key: "startingTIme",
        ellipsis: true,
      },
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
              <Tooltip placement="bottom" title="Delete Schedule">
                <DeleteOutlined
                  color="primary"
                  onClick={() => {
                    setshowDeleteModal(true);

                    setscheduleId(actionIndex._id);
                  }}
                />
              </Tooltip>
              <Tooltip placement="bottom" title="Edit Schedule">
                <EditOutlined
                  color="primary"
                  onClick={() => {
                    editUrlHandler(actionIndex);
                    seteditMode(true);
                  }}
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
            title={<Row justify="center">Add Schedule</Row>}
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
                label="Type(Eg: Workshop, Tech Talk)(Sub-heading)"
                name="type"
              >
                <Input type="text" placeholder="Enter the Type" />
              </Form.Item>

              <Form.Item label="title/speaker" name="title">
                <Input type="text" placeholder="Enter the Title" />
              </Form.Item>

              <Form.Item
                label="startingTime"
                required
                name="startingTime"
                rules={[
                  { required: true, message: "StartingTime is required" },
                ]}
              >
                <Input
                  required
                  type="number"
                  placeholder="Enter the Starting Time"
                />
              </Form.Item>

              <Form.Item label="endingTime" name="endingTime">
                <Input type="number" placeholder="Enter the Ending Time" />
              </Form.Item>

              <Form.Item label="description" name="description">
                <Input type="text" placeholder="Enter the Description" />
              </Form.Item>

              <Form.Item label="imageUrl" name="imageUrl">
                <Input type="text" placeholder="Enter the ImageUrl" />
              </Form.Item>

              <Form.Item label="sponsImageUrl" name="sponsImageUrl">
                <Input type="text" placeholder="Enter the Sponsor ImageUrl" />
              </Form.Item>

              <Form.Item label="joiningLink" name="joiningLink">
                <Input type="text" placeholder="Enter the Joining Link" />
              </Form.Item>

              <Form.Item label="joiningLinkText" name="joiningLinkText">
                <Input type="text" placeholder="Enter the Joining Link Text" />
              </Form.Item>

              <Form.Item label="date" required name="date">
                {/* <Select style={{ width: 120 }}> */}
                  {/* <Option value="20/01/2024">20/01/2024</Option> */}
                  {/* <Option value="21/01/2024">21/01/2024</Option> */}
                  {/* <Option value="22/01/2024">22/01/2024</Option> */}
                  {/* <Option value="Yiminghe">yiminghe</Option> */}
                {/* </Select> */}
                <select  style={{width: 120, }}>
                <option value="20/01/2024">20/01/2024</option>
                  <option value="21/01/2024">21/01/2024</option>
                  <option value="22/01/2024">22/01/2024</option>
                                </select>
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
              Add Schedule
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
}


export default Schedule;