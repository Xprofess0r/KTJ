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
  Select,
  Tooltip,
  Space,
} from "antd";
import axios from "../../api";
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
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
// import { Editor, EditorState } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import {
//   EditorState,
//   convertToRaw,
//   ContentState,
//   convertFromHTML,
//   convertFromRaw,
// } from "draft-js";
import draftToHtml from "draftjs-to-html";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import classes from "./Workshop.module.css";
import styles from "./OldWorkshop.module.css";

function App() {
  const [Mail, showMail] = useState(false);

  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [eventData, seteventData] = useState([]);
  const [loading, setloading] = useState(false);
  const [dloading, setdloading] = useState(false);
  const [culoading, setCuloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [form] = Form.useForm();
  const [category, setCategory] = useState(null);
  const [editMode, seteditMode] = useState(false);
  const [eventId, seteventId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [eventDeleteId, setEventDeleteId] = useState(null);
  const [editorState, setEditorState] = useState("");
  const [description, setDescription] = useState("");
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(editorState);
  };
  const ShowHideHandler = (event) => {
    seteditMode(true);
    console.log("editMode", editMode);
    seteventId(event._id);
    if (event.active == true) {
      addEventsubmitHandler(
        {
          ...event,
          active: false,
        },
        true,
        event._id
      );
    } else {
      addEventsubmitHandler(
        {
          ...event,
          active: true,
        },
        true,
        event._id
      );
    }
  };
  const RegistrationHandler = (event) => {
    seteditMode(true);
    console.log("editMode", editMode);
    seteventId(event._id);
    if (event.registration == true) {
      addEventsubmitHandler(
        {
          ...event,
          registration: false,
        },
        true,
        event._id
      );
    } else {
      addEventsubmitHandler(
        {
          ...event,
          registration: true,
        },
        true,
        event._id
      );
    }
  };
  const showUserHandler = () => {
    setShowUsers(true);
  };
  const editEventHandler = (workshop) => {
    form.setFieldsValue({
      title: workshop.title,
      imageUrl: workshop.imageUrl,
      company: workshop.company,
      joining_link: workshop.joining_link,
      description: workshop.description,
    });

    setEditorState(workshop.description);

    seteditMode(true);
    seteventId(workshop._id);
    setshowModal(true);
  };
  const deleteEventHandler = (eventId) => {
    // setloading(true);
    setDeleting(true);
    axios
      .delete("/workshops/deleteWorkshop", {
        data: {
          _id: eventId,
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
        message.error(error.response.data?.message);
        setDeleting(false);
        setshowDeleteModal(false);
      });
  };
  const fetchEventData = () => {
    setdloading(true);
    axios
      .get("/workshops/")
      .then((result) => {
        let data = result.data.workshops.map((workshop, index) => {
          return {
            title: workshop.title,
            description: workshop.description,
            imageUrl: workshop.imageUrl,
            company: workshop.company,
            joining_link: workshop.joining_link,
            actions: workshop,
            key: index,
          };
        });

        // data =  data.map((data,index)=> {
        //     data["key"] = index;
        //     return data;
        //   } )
        message.success("Data Fetched Successfully");
        seteventData(data);
        setdloading(false);
      })
      .catch((error) => {
        setdloading(false);
        message.error(
          error.response.data.message
            ? error.response.data.message
            : error.response
        );
      });
  };
  useEffect(() => {
    fetchEventData();
  }, []);
  const addEventsubmitHandler = (values, edit = false, eventid = "") => {
    // if(!description) {
    //   message.error("Description is required");
    //   return;
    // }

    setCuloading(true);
    const body = {
      ...values,
      description: description ? description : values.description,
    };
    // console.log(body);
    let url = "/workshops/createWorkshop";
    if (editMode || edit) {
      url = "/workshops/updateWorkshop";
      body._id = eventid ? eventid : eventId;
      axios
        .put(url, body)
        .then((res) => {
          message.success(res.data.message);
          form.resetFields();
          setDescription("");
          setshowModal(false);
          fetchEventData();
          seteditMode(false);
          setCuloading(false);
        })
        .catch((error) => {
          message.error(
            error.response.data.message
              ? error.response.data.message
              : error.response.data
          );
          setCuloading(false);
        });
    } else {
      axios
        .post(url, body)
        .then((res) => {
          message.success(res.data.message);
          form.resetFields();
          setDescription("");
          setshowModal(false);
          fetchEventData();
          setCuloading(false);
        })
        .catch((error) => {
          message.error(
            error.response.data.message
              ? error.response.data.message
              : error.response.data
          );
          setCuloading(false);
        });
    }
  };
  const userTableColumns = [
    {
      title: "UserName",
      dataIndex: "username",
      key: "username",
      ellipsis: true,
    },
    { title: "Email-Id", dataIndex: "email", key: "email", ellipsis: true },
    { title: "KTJ Id", dataIndex: "ktjID", key: "ktjID", ellipsis: true },
  ];
  const columns = [
    { title: "Title", dataIndex: "title", key: "title", ellipsis: true },
    {
      title: "Joining Link",
      dataIndex: "joining_link",
      key: "joining_link",
      ellipsis: true,
      render: (jl) => <a href={jl}>{jl}</a>,
    },
    // {
    //   title: "imageUrl",
    //   dataIndex: "imageUrl",
    //   key: "imageUrl",
    //   ellipsis: true,
    // },
    { title: "Company", dataIndex: "company", key: "company" },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actionIndex) => {
        var regi = actionIndex.registration ? (
          <CheckCircleOutlined
            color="primary"
            style={{ color: "#52c41a" }}
            onClick={() => {
              console.log("Regi working");
              RegistrationHandler(actionIndex);
            }}
          />
        ) : (
          <CloseCircleOutlined
            color="primary"
            style={{ color: "#f5222d" }}
            onClick={() => {
              console.log("regi working");
              RegistrationHandler(actionIndex);
            }}
          />
        );
        var eye = actionIndex.active ? (
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
            style={{ color: "#bfbfbf" }}
            onClick={() => {
              console.log("eye working");
              ShowHideHandler(actionIndex);
            }}
          />
        );
        return (
          <Space justify="space-between">
            <Tooltip placement="bottom" title="Delete  Workshop">
              <DeleteOutlined
                color="primary"
                onClick={() => {
                  setshowDeleteModal(true);
                  setEventDeleteId(actionIndex._id);
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Edit Workshop">
              <EditOutlined
                color="primary"
                onClick={() => editEventHandler(actionIndex)}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Users Details">
              <UserOutlined
                color="primary"
                onClick={() => {
                  showUserHandler();
                  setShowUsers(actionIndex.users);
                }}
              />
            </Tooltip>
            {/* <DownloadUser
              title="Download Csv of Participants"
              filename={actionIndex.title}
              data={actionIndex.users}
            /> */}
            <CopyToClipboard
              onCopy={() => {
                message.success("Email Ids copied to clipboard");
              }}
              text={
                actionIndex.users
                  ? actionIndex.users
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
  return (
    <>
      <div className={classes.container}>
        <img src="https://i.postimg.cc/KjCXY1vx/bg.png" alt="" />
        <img
          className={classes.robot}
          src="https://i.postimg.cc/sgfTQp1m/robot.png"
          alt=""
        />
        <div className={classes.heading}>
          <img src="https://i.postimg.cc/Qtbq5K3Q/workshop5.png" alt="" />
        </div>
        <div className={classes.Outerbox}>
          <div className={classes.left}></div>
          <div className={classes.right}>
            <div className={classes.box}></div>
            <div className={classes.box}></div>
            <div className={classes.box}></div>
            <div className={classes.box}></div>
          </div>
        </div>
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
            title={<Row justify="center">Add New Workshop</Row>}
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
                name="title"
                rules={[{ required: true, message: "Title field is empty" }]}
              >
                <Input type="text" placeholder="Enter the Title" />
              </Form.Item>
              <Form.Item
                label="company"
                name="company"
                rules={[{ required: true, message: "company field is empty" }]}
              >
                <Input type="text" placeholder="Enter the  company Name" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <div
                  style={{
                    padding: "2px",
                    minHeight: "50vh",
                    background: "#F2F2F2",
                  }}
                >
                  <ReactQuill
                    value={editorState}
                    onChange={onEditorStateChange}
                  />
                </div>
              </Form.Item>
              <Form.Item
                label="ImageUrl"
                name="imageUrl"
                rules={[{ required: true, message: "ImageUrl field is empty" }]}
              >
                <Input type="text" placeholder="Enter the  imageUrl" />
              </Form.Item>

              <Form.Item label="Joining Link" name="joining_link">
                <Input type="text" placeholder="Enter the Joining Link" />
              </Form.Item>

              <Form.Item>
                <Button loading={culoading} type="primary" htmlType="submit">
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
          <Col offset={20} style={{ padding: "1rem" }}>
            <Modal
              visible={showUsers}
              width={900}
              footer={
                <>
                  <Col span={4}>
                    <Button onClick={() => showMail(true)} type="primary">
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
                dataSource={showUsers}
              />
            </Modal>{" "}
            <Button
              icon={<PlusCircleOutlined />}
              type="primary"
              onClick={() => {
                setEditorState("");
                setshowModal(true);
              }}
            >
              Add Workshop
            </Button>
          </Col>
        </Row>
        <Row justify="center" style={{ padding: "1rem" }}>
          <Col span={20}>
            <Table
              className={styles.Table}
              bordered
              columns={columns}
              dataSource={eventData}
              loading={dloading}
              expandable={{
                expandedRowRender: (ws) => (
                  <>
                    <h3 style={{ textAlign: "center" }}>Description</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: ws.description }}
                      style={{ textAlign: "justify", fontStyle: "italic" }}
                    />
                  </>
                ),
                //   rowExpandable: record => record.name !== 'Not Expandable',
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
