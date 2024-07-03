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
import { useSelector } from "react-redux";
import axios from "../../api";
import classes from "./NavbarAdmin.css";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Option } = Select;
function Event(props) {
  const [navData, setnavData] = useState([]);
  const [loading, setloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [form] = Form.useForm();
  const [visiblity, setVisiblity] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Status, setCategory] = useState(null);
  const [editMode, seteditMode] = useState(false);
  const [navId, setnavId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [eventDeleteId, setEventDeleteId] = useState(null);
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  const state = useSelector((state) => {
    return state.auth;
  });
  const changevisiblityHandler = (navigator) => {
    if (navigator.visiblity == true) {
      addEventsubmitHandler(
        {
          ...navigator,
          visiblity: false,
        },
        true,
        navigator._id
      );
    } else {
      addEventsubmitHandler(
        {
          ...navigator,
          visiblity: true,
        },
        true,
        navigator._id
      );
    }
  };
  const changeauthHandler = (navigator) => {
    if (navigator.isAuthenticated == true) {
      addEventsubmitHandler(
        {
          ...navigator,
          isAuthenticated: false,
        },
        true,
        navigator._id
      );
    } else {
      addEventsubmitHandler(
        {
          ...navigator,
          isAuthenticated: true,
        },
        true,
        navigator._id
      );
    }
  };
  const changeStatusHandler = (navigator) => {
    if (navigator.Status == "Working") {
      addEventsubmitHandler(
        {
          ...navigator,
          Status: "Coming Soon",
        },
        true,
        navigator._id
      );
    } else {
      addEventsubmitHandler(
        {
          ...navigator,
          Status: "Working",
        },
        true,
        navigator._id
      );
    }
  };

  const editEventHandler = (navigator) => {
    form.setFieldsValue({
      navName: navigator.navName,
      Status: navigator.Status,
      navLink: navigator.navLink,
      visiblity: navigator.visiblity,
      isAuthenticated: navigator.isAuthenticated,

      actions: navigator,
    });
    setnavId(navigator._id);
    setshowModal(true);
  };

  const columns = [
    {
      title: "Navigation Menu",
      dataIndex: "navName",
      key: "navName",
      ellipsis: true,
    },
    {
      title: "Working status",
      dataIndex: "Status",
      key: "Status",
      ellipsis: true,
    },

    {
      title: "Navigation Link",
      dataIndex: "navLink",
      key: "navLink",
      ellipsis: true,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions) => {
        return (
          <Space justify="space-between">
            <Tooltip placement="bottom" title="Delete this navigation">
              <DeleteOutlined
                color="primary"
                onClick={() => {
                  setshowDeleteModal(true);
                  setEventDeleteId(actions._id);
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Edit this Navigation">
              <EditOutlined
                color="primary"
                onClick={() => {
                  editEventHandler(actions);
                  seteditMode(true);
                }}
              />
            </Tooltip>
            {actions.visiblity ? (
              <Tooltip
                placement="bottom"
                title="Change visiblity from visible to invisible"
              >
                <EyeOutlined
                  onClick={() => {
                    changevisiblityHandler(actions);
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip
                placement="bottom"
                title="Change visiblity from invisible to visible"
              >
                <EyeInvisibleOutlined
                  onClick={() => {
                    changevisiblityHandler(actions);
                  }}
                />
              </Tooltip>
            )}
            {!actions.isAuthenticated ? (
              <Tooltip
                placement="bottom"
                title="Change Authentication from unlock to lock"
              >
                <UnlockOutlined
                  color="primary"
                  onClick={() => {
                    changeauthHandler(actions);
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip
                placement="bottom"
                title="Change  Authentication from lock to unlock"
              >
                <LockOutlined
                  color="secondary"
                  onClick={() => {
                    changeauthHandler(actions);
                  }}
                />
              </Tooltip>
            )}
            {actions.Status == "Working" ? (
              <button
                style={{
                  color: "white",
                  backgroundColor: "#1890ff",
                }}
                onClick={() => {
                  changeStatusHandler(actions);
                }}
              >
                Working
              </button>
            ) : (
              <button
                style={{
                  color: "white",
                  backgroundColor: "#628334ff",
                }}
                onClick={() => {
                  changeStatusHandler(actions);
                }}
              >
                Coming Soon
              </button>
            )}
          </Space>
        );
      },
    },
  ];
  const deleteEventHandler = (navId) => {
    setDeleting(true);

    axios
      .delete("/navbar/deleteNavigation", {
        data: {
          _id: navId,
        },
      })
      .then((res) => {
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
      .get("/Navbar")
      .then((result) => {
        let data = result.data.navbar.map((navigator) => {
          return {
            navName: navigator.navName,
            Status: navigator.Status,
            navLink: navigator.navLink,
            actions: navigator,
          };
        });

        message.success("Data Fetched Successfully");
        // console.log(state);
        setnavData(
          state.user.userType != "superAdmin"
            ? data.filter((d) => d.navName != "Admin-Panel")
            : data
        );
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        message.error(error.message);
      });
  };
  useEffect(() => {
    fetchEventData();
  }, []);
  const addEventsubmitHandler = (values, edit = false, navid = "") => {
    const body = {
      ...values,
    };
    let url = "/navbar/createNavigation";

    if (editMode || edit) {
      url = "/navbar/updateNavigation";
      body._id = navid ? navid : navId;

      axios
        .put(url, body)
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
          title={<Row justify="center">Add a New Navigator</Row>}
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
              label="Navigation"
              required
              name="navName"
              rules={[
                {
                  required: true,
                  message: "A name must be assigned to a navigation.",
                },
              ]}
            >
              <Input
                required
                type="text"
                placeholder="Enter the name of Navigation"
              />
            </Form.Item>

            <Form.Item
              label="Status"
              required
              name="Status"
              rules={[
                {
                  required: true,
                  message: "The status of a navigation must be provided",
                },
              ]}
            >
              <Select
                allowClear
                placeholder="Select the status of the navigation "
                value={Status}
                onChange={handleCategoryChange}
              >
                <Option value="Working">Working</Option>
                <Option value="Coming soon">Coming soon</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="visiblity"
              required
              name="visiblity"
              rules={[
                {
                  required: true,
                  message: "The visiblity for a navigation must be decided",
                },
              ]}
            >
              <Select
                allowClear
                placeholder="Select the visiblity of the navigation for the users"
                value={visiblity}
                onChange={handleCategoryChange}
              >
                <Option value={true}>Unhide</Option>
                <Option value={false}>Hide</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="isAuthenticated"
              required
              name="isAuthenticated"
              rules={[
                {
                  required: true,
                  message:
                    "The authentication for a navigation must be decided",
                },
              ]}
            >
              <Select
                allowClear
                placeholder="Select the Authenticity of the navigation for the users"
                value={isAuthenticated}
                onChange={handleCategoryChange}
              >
                <Option value={true}>Authenticate</Option>
                <Option value={false}>Unauthenticate</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Navigation Link"
              required
              name="navLink"
              rules={[
                {
                  required: true,
                  message: "Url link for the navigation must not be empty.",
                },
              ]}
            >
              <Input
                required
                type="text"
                placeholder="Enter the Url for the Navigator"
              />
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
            deleteEventHandler(eventDeleteId);
          }}
        >
          Are you sure you want to delete this navigation link ?
        </Modal>
        <Col offset={20} style={{ padding: "1rem" }}>
          {" "}
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setshowModal(true)}
          >
            Add New Navigation
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ padding: "1rem" }}>
        <Col span={20}>
          <Table
            className={classes.Table}
            bordered
            columns={columns}
            dataSource={navData}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
}

export default Event;
