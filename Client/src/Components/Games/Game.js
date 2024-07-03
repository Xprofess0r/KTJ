import React, { useState, useEffect } from "react";
import { userTableColumns } from "../../table_column_formats";
import EmailComposer from "../Admin_panel/Email_Composer";
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
  InputNumber,
  DatePicker,
} from "antd";
import axios from "../../api";
import moment from "moment";
import classes from "./Event.module.css";
import "./Event.module.css"
import {
  PlusCircleOutlined,
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
const { Option } = Select;
function Event(props) {
  const [Mail, showMail] = useState(false);

  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [gameData, setgameData] = useState([]);
  const [loading, setloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [form] = Form.useForm();
  const [editMode, seteditMode] = useState(false);
  const [gameId, setgameId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [gameDeleteId, setGameDeleteId] = useState(null);
  const [regdeadline, setDeadline] = useState(null);
  const deadlineChange = (value) => {
    if (value) setDeadline(value.format("DD-MM-YYYY"));
  };
  const ShowHideHandler = (game) => {
    setDeadline(game.deadline);
    seteditMode(true);
    console.log("editMode", editMode);
    setgameId(game._id);
    if (game.active == true) {
      addEventsubmitHandler({
        ...game,
        active: false,
      },true, game._id);
    } else {
      addEventsubmitHandler({
        ...game,
        active: true,
      },true, game._id);
    }
  };
  const RegistrationHandler = (game) => {
    setDeadline(game.deadline);
    seteditMode(true);
    console.log("editMode", editMode);
    setgameId(game._id);
    if (game.registration == true) {
      addEventsubmitHandler(
        {
          ...game,
          registration: false,
        },true,game._id);
      } else {
        addEventsubmitHandler(
          {
            ...game,
            registration: true,
          },true,game._id);
        }
  };
  const editEventHandler = (game) => {
    setDeadline(game.deadline);
    form.setFieldsValue({
      title: game.title,
      registration_link: game.registration_link,
      deadline: moment(
        new Date(game.deadline).toLocaleDateString("en-CA"),
        "DD-MM-YYYY"
      ),
      prize_money: game.prize_money,
      content: game.content,
      headKtjId: game.headKtjId,
      imageUrl: game.imageUrl,
    });
    seteditMode(true);
    setgameId(game._id);
    setshowModal(true);
  };
  const columns = [
    { title: "Title", dataIndex: "title", key: "title", ellipsis: true },
    { title: "Deadline", dataIndex: "deadline", key: "deadline" },
    { title: "Prize Money", dataIndex: "prize_money", key: "prize_money" },
    { title: "Content", dataIndex: "content", key: "content", ellipsis: true },
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
              RegistrationHandler(actionIndex);
            }}
          />
        ) : (
          <CloseCircleOutlined
            color="primary"
            style={{color: '#f5222d' }}
            onClick={() => {
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
            <Tooltip placement="bottom" title="Delete Game event">
              <DeleteOutlined
                color="primary"
                onClick={() => {
                  setshowDeleteModal(true);
                  setGameDeleteId(actionIndex._id);
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Edit Game event">
              <EditOutlined
                color="primary"
                onClick={() => editEventHandler(actionIndex)}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Users List">
              <UserOutlined
                color="primary"
                onClick={() => {
                  setUsers(actionIndex.users);
                  setShowUsers(true);
                }}
              />
            </Tooltip>

            <CopyToClipboard
              onCopy={() => {
                message.success("Email Ids copied to the clipboard");
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

  const deleteEventHandler = (gameId) => {
    setloading(true);
    setDeleting(true);
    axios
      .post("/games/deleteGame", {
        _id: gameId,
      })
      .then((res) => {
        setloading(false);
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
      .get("/games")
      .then((result) => {
        let data = result.data.games.map((game) => {
          return {
            title: game.title,
            registration_link: game.registration_link,
            prize_money: game.prize_money,
            content: game.content,
            imageUrl: game.imageUrl,
            headKtjId: game.headKtjId,
            deadline: game.deadline,
            actions: game,
          };
        });
        message.success("Data Fetched Successfully");
        setgameData(data);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        message.error(error);
      });
  };
  useEffect(() => {
    fetchEventData();
  }, []);
  const addEventsubmitHandler = (values, edit = false, gameid = "") => {
    values.deadline = regdeadline;
    const body = {
      ...values,
    };
    console.log(body);
    let url = "/games/createGame";
    if (editMode || edit) {
      url = "/games/updateGame";
      body._id = gameid ? gameid : gameId;
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
        seteditMode(false);
        return;
      }
      if(!editMode){
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
          <EmailComposer users={users} showMail={(value) => showMail(value)} />
        </Modal>
        <Modal
          title={<Row justify="center">Add a New Game </Row>}
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
              <Input required type="text" placeholder="Enter the Game Title" />
            </Form.Item>
            <Form.Item label="Head of Event" name="headKtjId">
              <Input
                type="text"
                placeholder="Enter the KTJ ID of Head of Event"
              />
            </Form.Item>
            <Form.Item
              required
              label="Registration Link"
              name="registration_link"
            >
              <Input type="text" placeholder="Enter the Registration Link" />
            </Form.Item>
            <Form.Item required label="Prize Money" name="prize_money">
              <InputNumber />
            </Form.Item>
            <Form.Item required label="Registration Deadline" name="deadline">
              <DatePicker format="DD-MM-YYYY" onChange={deadlineChange} />
            </Form.Item>
            <Form.Item required label="Image Url" name="imageUrl">
              <Input type="text" placeholder="Enter the Image URL" />
            </Form.Item>
            <Form.Item name="content" label="Content/Description">
              <Input.TextArea />
            </Form.Item>
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
            deleteEventHandler(gameDeleteId);
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
            Add Game
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ padding: "1rem" }}>
        <Col span={20}>
          <Table
            className={classes.Table}
            bordered
            columns={columns}
            dataSource={gameData}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
}

export default Event;
