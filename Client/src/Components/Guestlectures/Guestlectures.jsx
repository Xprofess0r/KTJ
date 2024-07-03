import React, { useState, useEffect } from "react";
import { userTableColumns } from "../../table_column_formats";
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
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
const { TextArea } = Input;
// import EmailComposer from "../Admin_panel/Email_Composer";
import axios from "../../api";
import classes from "./Guestlecture.module.css";
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
  CheckCircleOutlined,
} from "@ant-design/icons";
// import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
const { Option } = Select;
function Event(props) {
  const [Mail, showMail] = useState(false);

  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [guestData, setguestData] = useState([]);
  const [loading, setloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [form] = Form.useForm();
  const [category, setCategory] = useState(null);
  const [editMode, seteditMode] = useState(false);
  const [editMode1, seteditMode1] = useState(false);
  const [guestId, setguestId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [eventDeleteId, setEventDeleteId] = useState(null);
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const ShowHideHandler = (guestlecture) => {
    seteditMode(true);
    console.log("editMode", editMode);
    setguestId(guestlecture._id);
    if (guestlecture.active == true) {
      addEventsubmitHandler(
        {
          ...guestlecture,
          active: false,
        },
        true,
        guestlecture._id
      );
    } else {
      addEventsubmitHandler(
        {
          ...guestlecture,
          active: true,
        },
        true,
        guestlecture._id
      );
    }
  };
  const RegistrationHandler = (regi) => {
    seteditMode(true);
    console.log("editMode", editMode);
    setguestId(regi._id);
    if (regi.registration == true) {
      addEventsubmitHandler(
        {
          ...regi,
          registration: false,
        },
        true,
        regi._id
      );
    } else {
      addEventsubmitHandler(
        {
          ...regi,
          registration: true,
        },
        true,
        regi._id
      );
    }
  };

  const editEventHandler = (guest) => {
    // console.log(guest,"hiii");
    form.setFieldsValue({
      guestName: guest.guestName,
      imageUrl: guest.imageUrl,
      headKtjId: guest.headKtjId,
      lectureDescription: guest.lectureDescription,
      youtubeLink: guest.youtubeLink,
      registrationLink: guest.registrationLink,
    });
    // seteditMode(true);
    setguestId(guest._id);
    setshowModal(true);
  };
  const columns = [
    {
      title: "Guestname",
      dataIndex: "guestName",
      key: "guestName",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "lectureDescription",
      key: "lectureDescription",
      ellipsis: true,
    },
    {
      title: "KTJ ID of Event's Head ",
      dataIndex: "headKtjId",
      key: "headKtjId",
    },
    // { title: "ImageUrl", dataIndex: "imageUrl", key: "imageUrl", ellipsis: true  },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions) => {
        // console.log(actions)
        var eye = null;
        var regi = null;

        regi = actions.registration ? (
          <CheckCircleOutlined
            color="primary"
            style={{ color: "#52c41a" }}
            onClick={() => {
              console.log("Regi working");
              RegistrationHandler(actions);
            }}
          />
        ) : (
          <CloseCircleOutlined
            color="primary"
            style={{ color: "#f5222d" }}
            onClick={() => {
              console.log("regi working");
              RegistrationHandler(actions);
            }}
          />
        );

        eye = actions.active ? (
          <EyeOutlined
            color="primary"
            onClick={() => {
              console.log("Eye working");
              ShowHideHandler(actions);
            }}
          />
        ) : (
          <EyeInvisibleOutlined
            color="primary"
            style={{ color: "#bfbfbf" }}
            onClick={() => {
              console.log("eye working");
              ShowHideHandler(actions);
            }}
          />
        );

        return (
          <Space justify="space-between">
            <Tooltip placement="bottom" title="Delete Lecture">
              <DeleteOutlined
                color="primary"
                onClick={() => {
                  // console.log(guest);
                  setshowDeleteModal(true);
                  // console.log(actions);
                  setEventDeleteId(actions._id);
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Edit Lecture">
              <EditOutlined
                color="primary"
                onClick={() => {
                  editEventHandler(actions);
                  seteditMode(true);
                  // seteditMode1(true)
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Users List">
              <UserOutlined
                color="primary"
                onClick={() => {
                  setUsers(actions.users);
                  setShowUsers(true);
                }}
              />
            </Tooltip>

            <CopyToClipboard
              onCopy={() => {
                message.success("Email Ids copied to clipboard");
              }}
              text={
                actions.users
                  ? actions.users
                      .map((user) => {
                        return user.email;
                      })
                      .join(",")
                  : " "
              }
            >
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

  const deleteEventHandler = (guestId) => {
    // console.log(guestId);

    setDeleting(true);

    axios
      .delete("/guestLectures/deleteguestLecture", {
        data: {
          _id: guestId,
        },
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
        console.log(error.response);
        message.error(error.response.data?.message);
        setDeleting(false);
        setshowDeleteModal(false);
      });
  };
  const fetchEventData = () => {
    setloading(true);
    axios
      .get("/guestLectures")
      .then((result) => {
        // console.log(result.data.guestLectures);

        let data = result.data.guestLectures.map((guest) => {
          return {
            guestName: guest.guestName,
            lectureDescription: guest.lectureDescription,
            headKtjId: guest.headKtjId,
            youtubeLink: guest.youtubeLink,
            registrationLink: guest.registrationLink,
            imageUrl: guest.imageUrl,
            actions: guest,
          };
        });

        //console.log(data); //Data for the Guest lectures (array type)

        message.success("Data Fetched Successfully");

        setguestData(data);
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
  const addEventsubmitHandler = (values, edit = false, guestid = "") => {
    //console.log(values);
    // if (!values.guests || values.guests?.length === 0) {
    //   return message.error("Please Enter at least one guest Information");
    // }

    // let guest_profile_photos = values.guests?.map(
    //   (guest) => guest.guest_profile_photo
    // );
    const body = {
      ...values,
    };
    //console.log(body);

    let url = "/guestLectures/createguestLecture";

    if (editMode || edit) {
      url = "/guestLectures/updateguestLecture";
      body._id = guestid ? guestid : guestId;

      axios
        .put(url, body)
        .then((res) => {
          message.success(res.data.message);
          form.resetFields();
          setshowModal(false);
          fetchEventData();
        })
        .catch((error) => {
          console.log(error.data, error.response);
          message.error(
            error.response.data.message
              ? error.response.data.message
              : error.response.data
          );
        });
      seteditMode(false);
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
          console.log(error.data, error.response);
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
          visible={Mail}
          onCancel={() => {
            showMail(false);
          }}
          footer={<div></div>}
        >
          {/* <EmailComposer users={users} showMail={(value) => showMail(value)} /> */}
        </Modal>
        <Modal
          title={<Row justify="center">Add New GuestLectures</Row>}
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
              label="GuestName"
              required
              name="guestName"
              rules={[{ required: true, message: "Title field is empty" }]}
            >
              <Input required type="text" placeholder="Enter the Guest Name" />
            </Form.Item>
            <Form.Item label="Head of Event" name="headKtjId">
              <Input
                type="text"
                placeholder="Enter the KTJ ID of Head of Event"
              />
            </Form.Item>
            <Form.Item label="ImageUrl" name="imageUrl">
              <Input
                type="text"
                name="imageUrl"
                placeholder="Enter the Image Url"
              />
            </Form.Item>
            <Form.Item label="youtubeLink" name="youtubeLink">
              <Input
                type="text"
                name="youtubeLink"
                placeholder="Enter the youtube link."
              />
            </Form.Item>
            <Form.Item label="registrationLink" name="registrationLink">
              <Input
                type="text"
                name="registrationLink"
                placeholder="Enter the registration link."
              />
            </Form.Item>

            <Form.Item
              label="Description"
              required
              name="lectureDescription"
              rules={[
                { required: true, message: " Lecture Description is missing" },
              ]}
            >
              <TextArea
                rows={4}
                allowClear
                placeholder="Enter the Description"
                value={category}
                onChange={handleCategoryChange}
              />
            </Form.Item>
            {/* <Form.List name="guests" justify="center" label="Guests">
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
                      onClick={() => {add();}}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Guest
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List> */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
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
            deleteEventHandler(eventDeleteId);
          }}
        >
          Are you sure you want to delete this event ?
        </Modal>
        <Modal
          visible={showUsers}
          width={900}
          footer={
            <>
              <Col span={4}>
                <Button type="primary" onClick={() => showMail(true)}>
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
        </Modal>
        <Col offset={20} style={{ padding: "1rem" }}>
          {" "}
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setshowModal(true)}
          >
            Add GuestLecture
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ padding: "1rem" }}>
        <Col span={20}>
          <Table
            className={classes.Table}
            bordered
            columns={columns}
            dataSource={guestData}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
}

export default Event;
