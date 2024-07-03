import { useState, useEffect } from "react";
import React from "react";

import EmailComposer from "../Admin_panel/Email_Composer/index";

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
import axios from "../../api";
import classes from "./Event.module.css";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

// const [eyeState, setEyeState] = useState(true);
// const [regiState, setRegiState] = useState(true);
// const toggleShowHide = () => {
//   setEyeState(!eyeState);
// }
// const toggleRegiOpen = () => {
//   setRegiState(!regiState);
// }

const { Option } = Select;
function Event(props) { 
  const [showUsers, setShowUsers] = useState(false);
  const [showUserCount, setShowUserCount] = useState(false);
  const [users, setUsers] = useState([]);
  const [mail, showMail] = useState(false);

  const [eventData, seteventData] = useState([]);
  const [loading, setloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [form] = Form.useForm();
  const [category, setCategory] = useState(null);
  const [editMode, seteditMode] = useState(false);
  const [eventId, seteventId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [eventDeleteId, setEventDeleteId] = useState(null);

  const ShowHideHandler = (event) => {
    seteditMode(true);
    console.log("editMode", editMode);
    seteventId(event._id);
    if (event.active == true) {
      addEventsubmitHandler({
        ...event,
        active: false,
      },true, event._id);
    } else {
      addEventsubmitHandler({
        ...event,
        active: true,
      },true, event._id);
    }
  };
  const RegistrationHandler = (regi) => {
    seteditMode(true);
    console.log("editMode", editMode);
    seteventId(regi._id);
    if (regi.registration == true) {
      addEventsubmitHandler(
        {
          ...regi,
          registration: false,
        },true,regi._id);
      } else {
        addEventsubmitHandler(
          {
            ...regi,
            registration: true,
          },true,regi._id);
        }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const showUserHandler = () => {
    setloading(true);
    setShowUsers(true);

    axios
      .get("/", {})
      .then((res) => {
        setloading(false);
        message.success(res.data.message);
        
        setUsers(res.data.users);
        setShowUserCount(res.data.users.length)
      })
      .catch((error) => {
        setloading(false);
        message.error(error.response.data?.message);
      });
  };
  const editEventHandler = (event) => {
    form.setFieldsValue({
      title: event.title,
      category: event.category,
      meeting_link: event.meeting_link,
      headKtjId: event.headKtjId,
      guests: event.guests.map((guest, index) => {
        return {
          name: guest.name,
          profession: guest.profession,
          topic: guest.topic ? guest.topic : "",
          guest_profile_photo: event.guestProfilePhotos[index],
        };
      }),
    });
    seteditMode(true);
    seteventId(event._id);
    setshowModal(true);
  };

  const userTableColumns = [
    {
      title: "UserName",
      dataIndex: "username",
      key: "username",
      ellipsis: true,
    },
    {
      title: "UserCount",
      dataIndex: "usercount",
      key: "usercount",
      ellipsis: true,
    },
    { title: "Email-Id", dataIndex: "email", key: "email", ellipsis: true },
    { title: "KTJ Id", dataIndex: "ktjID", key: "ktjID", ellipsis: true },
  ];
  const columns = [
    { title: "Title", dataIndex: "title", key: "title", ellipsis: true },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Guests", dataIndex: "guests", key: "guests", ellipsis: true },
    {
      title: "KTJ ID of Event's Head ",
      dataIndex: "headKtjId",
      key: "headKtjId",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actionIndex) => {
        var eye = null;
        var regi = null;

        regi = actionIndex.registration ? (
          <CheckCircleOutlined
            color="primary"
            style={{color: '#52c41a' }}
            onClick={() => {
              console.log("Regi working");
              RegistrationHandler(actionIndex);
            }}
          />
        ) : (
          <CloseCircleOutlined
            color="primary"
            style={{color: '#f5222d' }}
            onClick={() => {
              console.log("regi working");
              RegistrationHandler(actionIndex);
            }}
          />
        );
        
        eye = actionIndex.active ? (
          <EyeOutlined
            color="primary"
            onClick={() => {
              console.log("Eye working");
              ShowHideHandler(actionIndex);
            }}
          />
        ) : (
          <EyeInvisibleOutlined
            color="primary"
            style={{color: '#bfbfbf' }}
            onClick={() => {
              console.log("eye working");
              ShowHideHandler(actionIndex);
            }}
          />
        );

        return (
          <Space justify="space-between">
            <Tooltip placement="bottom" title="Delete Event">
              <DeleteOutlined
                color="primary"
                onClick={() => {
                  setshowDeleteModal(true);
                  setEventDeleteId(actionIndex._id);
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Edit Event">
              <EditOutlined
                color="primary"
                onClick={() => editEventHandler(actionIndex)}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Users List">
              <UserOutlined
                color="primary"
                onClick={() => {
                  showUserHandler();
                }}
              />
            </Tooltip>
            <CopyToClipboard
              onCopy={() => {
                message.success("Email Ids copied to clipboard");
              }}
              text={actionIndex.users?actionIndex.users
                .map((user) => {
                  return user.email;
                })
                .join(","):' '}            >
              <Tooltip title="Copy Email Ids of Participants">
                <CopyOutlined />
              </Tooltip>
            </CopyToClipboard>

            {/* Registrations open/closed */}
            <Tooltip placement="bottom" title="Registrations open/closed">
            {regi}
            </Tooltip>
            {/* Hide/Show*/}
            <Tooltip placement="bottom" title="Show/Hide">
              {eye}
            </Tooltip>

          </Space>
        );
      },
    },
  ];

  const deleteEventHandler = (eventId) => {
    // setloading(true);
    setDeleting(true);
    axios
      .post("/events/deleteEvent", {
        _id: eventId,
      })
      .then((res) => {
        // setloading(false);
        message.success(res.data.message);
        setDeleting(false);

        setshowDeleteModal(false);
        fetchEventData();
      })
      .catch((error) => {
        setloading(false);
        message.error(error.response.data?.message);
        setDeleting(false);
        setshowDeleteModal(false);
      });
  };
  const fetchEventData = () => {
    setloading(true);
    axios
      .get("/events")
      .then((result) => {
        let data = result.data.events.map((event) => {
          // console.log(event);
          return {
            title: event.title,
            category: event.category,
            headKtjId: event.headKtjId,
            guests: event.guests
              .map((guest) => {
                return guest.name;
              })
              .join(", "),
            actions: event,
          };
        });
        let showData = result.data.events.filter((event, index) => index == 0);
        // console.log(showData[0].active);
        // setEyeState(showData[0].active);
        message.success("Data Fetched Successfully");
        seteventData(data);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        message.error(error.response.data);
      });
  };
  useEffect(() => {
    fetchEventData();
  }, []);
  const addEventsubmitHandler = (values, edit = false, eventid = "") => {
    if (!values.guests || values.guests?.length === 0) {
      return message.error("Please Enter at least one guest Information");
    }
    let guest_profile_photos = values.guests?.map(
      (guest) => guest.guest_profile_photo
    );
    const body = {
      ...values,
      guest_profile_photos: guest_profile_photos,
    };
    let url = "/events/createEvent";
    if (editMode || edit) {
      url = "/events/updateEvent";
      body._id = eventid ? eventid : eventId;
      // console.log(body);
      axios
      .post(url, body)
      .then((res) => {
        message.success(res.data.message);
        form.resetFields();
        setshowModal(false);
        fetchEventData();
        seteditMode(false);
      })
      .catch((error) => {
        message.error(
          error.response.data.message
          ? error.response.data.message
          : error.response.data
          );
        });

        // console.log("editMode", editMode);
        seteditMode(false);
        // console.log("editMode", editMode);
        // console.log("active",body.active);
        return;
    }
    if (!editMode) {
      axios
        .post(url, body)
        .then((res) => {
          message.success(res.data.message);
          form.resetFields();
          setshowModal(false);
          fetchEventData();
        })
        .catch((error) => {
          message.error(
            error.response.data.message
              ? error.response.data.message
              : error.response.data
          );
        });
    }
  };
  return (
    <>
      <Row justify="end" span={24}>
        <Modal
          title={<Row justify="center">Add New Event</Row>}
          visible={showModal}
          width={900}
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
            onFinish={addEventsubmitHandler}
          >
            <Form.Item
              label="Title"
              required
              name="title"
              rules={[{ required: true, message: "Title field is empty" }]}
            >
              <Input required type="text" placeholder="Enter the Event Title" />
            </Form.Item>
            <Form.Item label="Head of Event" name="headKtjId">
              <Input
                type="text"
                placeholder="Enter the KTJ ID of Head of Event"
              />
            </Form.Item>
            <Form.Item label="Meeting Link" name="meeting_link">
              <Input type="text" placeholder="Enter the Joining Link" />
            </Form.Item>
            <Form.Item
              label="Category"
              required
              name="category"
              rules={[{ required: true, message: "Event category is missing" }]}
            >
              <Select
                allowClear
                placeholder="Select the category of the event"
                value={category}
                onChange={handleCategoryChange}
              >
                <Option value="summit">Summit</Option>
                <Option value="interactive_session">Interactive Session</Option>
              </Select>
            </Form.Item>
            <Form.List name="guests" justify="center" label="Guests">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => {
                    return (
                      <Space
                        size={40}
                        key={field.key}
                        wrap
                        align="center"
                        // width="100%"
                      >
                        <Form.Item
                          {...field}
                          label="Name"
                          name={[field.name, "name"]}
                          fieldKey={[field.fieldKey, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "Guest name is empty",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            name="name"
                            placeholder="Enter the guest's name "
                          />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Topic"
                          name={[field.name, "topic"]}
                          fieldKey={[field.fieldKey, "topic"]}
                          rules={[
                            {
                              required: true,
                              message: "Topic is missing",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            name="topic"
                            placeholder="Enter the topic "
                          />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Profession"
                          name={[field.name, "profession"]}
                          fieldKey={[field.fieldKey, "profession"]}
                          rules={[
                            {
                              required: true,
                              message: "Profession of the guest is missing",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            name="profession"
                            placeholder="Enter guest's position in the company "
                          />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Image Link"
                          name={[field.name, "guest_profile_photo"]}
                          fieldKey={[field.fieldKey, "guest profile photo"]}
                          rules={[
                            {
                              required: true,
                              message: "Profile photo  is missing",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            name="guest profile photo"
                            placeholder="Enter guest's guest profile photo  "
                          />
                        </Form.Item>

                        <Form.Item>
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </Form.Item>
                      </Space>
                    );
                  })}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Guest
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editMode ? "Save" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          visible={mail}
          onCancel={() => {
            showMail(false);
          }}
          footer={<div></div>}
        >
          <EmailComposer users={users} showMail={(value) => showMail(value)} />
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
            deleteEventHandler(eventDeleteId);
          }}
        >
          Are you sure you want to delete this event ?
        </Modal>
        <Col offset={20} style={{ padding: "1rem" }}>
          <Modal
            visible={showUsers}
            width={900}
            title={
              <Row justify="center" style={{ paddingRight: "20px" }}>
                   UserCount: {showUserCount}
              </Row>
            }
            footer={
              <>
                <Col span={4}>
                  <Button
                    type="primary"
                    onClick={() => {
                      showMail(true);
                    }}
                  >
                    Send Mail
                  </Button>
                </Col>
              </>
            }
            size="large"
            // okText="Confirm"
            // cancelText="Cancel"
            confirmLoading={deleting}
            onCancel={() => {
              setShowUsers(false);
            }}
            // onOk={() => {
            //   deleteEventHandler(eventDeleteId);
            // }}
          >

            
            <Table
              pagination={false}
              // className={classes.Table}
              bordered
              columns={userTableColumns}
              dataSource={users}
              loading={loading}
            />
          </Modal>{" "}
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setshowModal(true)}
          >
            Add Event
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ padding: "1rem" }}>
        <Col span={20}>
          <Table
            className={classes.Table}
            bordered
            columns={columns}
            dataSource={eventData}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
}

export default Event;
