import React, { useState, useEffect } from 'react'
import {
  Col,
  Row,
  Typography,
  message,
  Button,
  Modal,
  Form,
  Input,
  Tooltip,
  Space,
  Radio,
} from 'antd'
import API from '../../api'
const { TextArea } = Input

import Loader from '../Loader/index'
import classes from './index.module.css'
import axios from '../../api'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined, ReloadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import DownloadCsv from '../DownloadCsv/DownloadCsv'
import EmailComposer from '../Admin_panel/Email_Composer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Competitions from "../Competitions/Competitions.jsx"
const { Text } = Typography
function Dashboard(props) {
  const [activities, setActivities] = useState([])
  const [mail, showMail] = useState(false)
  const [activitiesLoading, setactivitesLoading] = useState(true)
  const [userCount, setuserCount] = useState(0)
  const [userCountLoading, setuserCountLoading] = useState(false)
  const [notificationSubscriberCount, setNotificationSubscriberCount] =
    useState(0)
  const [
    notifcationSubscriberCountLoading,
    setnotifcationSubscriberCountLoading,
  ] = useState(false)
  const [regUsers, setregUsers] = useState([])
  const [regUsersLoading, setregUsersLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [UserVerified, setUserVerified] = useState(false)
  const [title, setTitle] = useState('User Verification')
  const [value, setvalue] = useState(1)
  const [userId, setuserId] = useState('')
  const [verifying, setverifying] = useState(false)
  const [isuserModalVisible, setIsUserModalVisible] = useState(false)
  const [sending, setsending] = useState(false)
  const [testing, settesting] = useState(false)
  const [testMode, setTestMode] = useState(true)
  const state = useSelector((state) => state.auth)
  console.log(state)
  useEffect(() => {
    fetchActivities()
    NewsLetter_reg_users()
    fetchUsercount()
    fetchnotificationSubscriberCount()
  }, [state])
  console.log(activities);

  const saveSubscription = async (subscription) => {
    // const { data } = await API.get('/csrf-token')
    // const token = data.csrfToken
    // const response = await API('notification/test', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-csrf-token': token,
    //   },
    //   data: {
    //     subscription: JSON.stringify(subscription),
    //   },
    // })
    // return response.json()
  }

  const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const fetchnotificationSubscriberCount = () => {
    setnotifcationSubscriberCountLoading(true)
    axios
      .get('/notification/userCount')
      .then((res) => {
        setnotifcationSubscriberCountLoading(false)
        setNotificationSubscriberCount(res.data.count)
      })
      .catch((error) => {
        setnotifcationSubscriberCountLoading(false)
        message.error(error.message)
      })
  }
  const fetchUsercount = () => {
    setuserCountLoading(true)
    axios
      .get('/userCount')
      .then((res) => {
        setuserCountLoading(false)
        setuserCount(res.data.userCount)
      })
      .catch((error) => {
        setuserCountLoading(false)
        message.error(error.message)
      })
  }
  const fetchActivities = () => {
    setactivitesLoading(true)
    axios
      .get('activities/')
      .then((res) => {
        setactivitesLoading(false)
        setActivities(res.data.activities)
      })
      .catch((error) => {
        setactivitesLoading(false)
        message.error(error.message)
      })
  }
  const NewsLetter_reg_users = () => {
    axios
      .get('regForLetter/')
      .then((result) => {
        setregUsersLoading(false)
        setregUsers(result.data.users)
      })
      .catch((error) => {
        setregUsersLoading(false)
        message.error(error.message)
      })
  }

  const [form] = Form.useForm()
  const [userForm] = Form.useForm()

  const addEventsubmitHandler = async (values) => {
    let body = {
      ...values,
    }

    const swRegistration = await navigator.serviceWorker.register('service.js')
    let subscription
    try {
      const applicationServerKey = urlB64ToUint8Array(
        'BGAFZ9hQZDF4GhJ_NWZkZWbt3U8X6hzjp9Hm_rFig7DZTcaZFyNgLaHqV71_9OhkqC47PKGdnuWrqRjJ4pvPed8'
      )
      const options = { applicationServerKey, userVisibleOnly: true }
      subscription = await swRegistration.pushManager.subscribe(options)
    } catch (err) {}

    let url

    if (testMode) {
      url = 'notification/test'
      settesting(true)
      body = {
        ...body,
        subscription: JSON.stringify(subscription),
      }
    } else {
      url = 'notification/push'
      setsending(true)
    }

    axios
      .post(url, body)
      .then((res) => {
        if (testMode) settesting(false)
        else {
          setsending(false)
        }

        message.success(res.data.message)
        if (!testMode) form.resetFields()
      })
      .catch((error) => {
        if (testMode) settesting(false)
        else {
          setsending(false)
        }
      })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setUserVerified(false)
    setTitle('User Verification')
  }

  const showUserModal = () => {
    setIsUserModalVisible(true)
  }

  const handleUserOk = () => {
    setIsUserModalVisible(false)
  }

  const handleUserCancel = () => {
    setIsUserModalVisible(false)
  }
  const UserinfoVerfiyHandler = (values) => {
    const useremail = values.email
    setverifying(true)
    axios
      .post('userCheck', { email: useremail })
      .then((result) => {
        let isExist = result.data.isExist
        if (isExist) {
          message.success(' User Verified')
          userForm.resetFields()
          setTitle('Change User Type')
          setUserVerified(true)
          let userdata = result.data.user
          setuserId(userdata._id)
          switch (userdata.userType) {
            case 'normal':
              setvalue(1)
              break
            case 'superAdmin':
              setvalue(3)
              break
            case 'admin':
              setvalue(2)
              break
            default:
              setvalue(1)
          }
        } else {
          message.error('User does not  exit ')
          userForm.resetFields()
        }
        setverifying(false)
      })
      .catch((error) => {
        setverifying(false)
        message.error(error.message)
      })
  }

  const onChange = (e) => {
    setvalue(e.target.value)
  }

  const ChangeUserTypeHandler = () => {
    let userType

    if (value == 1) userType = 'normal'
    if (value == 2) userType = 'admin'

    setverifying(true)
    axios
      .post('changeUserType', {
        userId: userId,
        userType: userType,
      })
      .then((res) => {
        message.success(res.data.message)
        handleCancel()
        setverifying(false)
      })
      .catch((error) => {
        message.error(
          error.response.data.message
            ? error.response.data.message
            : error.response.data
        )
        setverifying(false)
      })
  }

  const testModeHandler = () => {
    setTestMode(true)
  }

  const sendModeHandler = () => {
    setTestMode(false)
  }

  return (
    <>
      <Row
        gutter={[15, 15]}
        justify="center"
        align="top"
        style={{
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
        }}
      >
        <Modal
          visible={mail}
          onCancel={() => {
            showMail(false);
          }}
          footer={<div></div>}
        >
          <EmailComposer
            users={regUsers}
            showMail={(value) => showMail(value)}
          />
        </Modal>

        <Modal
          title={<Row justify="center">Newsletter Users</Row>}
          visible={isuserModalVisible}
          onOk={handleUserOk}
          onCancel={handleUserCancel}
          footer={[
            <Button key="back" onClick={handleUserCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                showMail(true);
                handleUserOk();
              }}
            >
              Send Mail
            </Button>,
          ]}
        >
          <Row style={{ rowGap: "10px" }}>
            {regUsers.map((user) => {
              return (
                <Col span={12}>
                  <span style={{ backgroundColor: "rgb(0 132 253 / 13%)" }}>
                    {user.email}
                  </span>
                </Col>
              );
            })}
          </Row>
        </Modal>

        <Col span={10}>
          <Col className={`${classes.boxShadowFlex}`} span={24}>
            <Row span={24} justify="center" align="end">
              <Col span={5}></Col>
              <Col className={`${classes.Heading}`} span={15}>
                Activity Log
              </Col>
              <Col alignSelf="end">
                <i className="fas fa-sync-alt" onClick={fetchActivities}></i>
              </Col>
            </Row>
            <hr />
            <Row
              className={` ${classes.activityLog}`}
              justify="center"
              align="center"
            >
              {activitiesLoading ? <Loader /> : null}
              {activities && !activitiesLoading
                ? activities.map((activity, index) => {
                    var username=activity.user?activity.user.username:"";
                    var utcDate = activity.createdAt; // ISO-8601 formatted date returned from server
                    var localDate = new Date(utcDate);
                    localDate = localDate.toString();
                    let datetime = localDate.split(" ");
                    const time = datetime[4].slice(0, 5);
                    const date = datetime[2] + "/" + datetime[1];
                    return (
                      <Col className={classes.activity} span={23} key={index}>
                        {`${index + 1}. ${username} : `}
                        <Text ellipsis={true}>{activity.description}</Text>
                        <p className={classes.time}>{time + "  " + date}</p>
                      </Col>
                    );
                  })
                : null}
            </Row>
          </Col>
          {state.user.userType == "superAdmin" ? (
            <Col className={`${classes.boxShadowFlex}`} span={24}>
              <Row span={24} justify="center" align="center">
                <Col span={5}></Col>
                <Col className={`${classes.Heading}`} span={15}>
                  Change User Type
                </Col>
              </Row>
              <hr />
              <Row
                className={` ${classes.activityLog}`}
                justify="center"
                align="center"
              >
                {!UserVerified ? (
                  <Form
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    onFinish={UserinfoVerfiyHandler}
                    form={userForm}
                    style={{ width: "90%" }}
                  >
                    <Form.Item
                      label="Email"
                      required
                      name="email"
                      rules={[
                        { required: true, message: "Email field is empty" },
                      ]}
                      style={{ marginTop: "1rem" }}
                    >
                      <Input
                        required
                        style={{
                          border: "none",
                          borderBottom: "2px solid black",
                        }}
                        type="text"
                        placeholder="Enter User Email"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={verifying}
                      >
                        Verify
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <Form
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    onFinish={ChangeUserTypeHandler}
                    form={userForm}
                    style={{ width: "80%", marginTop: "2rem" }}
                  >
                    <Form.Item>
                      <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                          <Radio value={1}>Normal</Radio>
                          <Radio value={2}>Admin</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item style={{ float: "right" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={verifying}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setUserVerified(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </Row>
            </Col>
          ) : null}
        </Col>
        <Col span={12}>
          <Col className={`${classes.boxShadowFlex}`} span={22}>
            <Row
              gutter={[5, 0]}
              className={`${classes.Heading}`}
              justify="center"
              align="center"
            >
              <Col> Notification Subscribers</Col>
            </Row>
            <hr />
            <Row justify="center" align="center" className={classes.UserCount}>
              {notifcationSubscriberCountLoading ? (
                <Loader />
              ) : (
                notificationSubscriberCount
              )}
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col className={`${classes.boxShadowFlex}`} span={10}>
                <Row
                  gutter={[5, 0]}
                  className={`${classes.Heading}`}
                  justify="center"
                  align="center"
                >
                  <Col> Total Users</Col>
                </Row>
                <hr />
                <Row
                  justify="center"
                  align="center"
                  className={classes.UserCount}
                >
                  {userCountLoading ? <Loader /> : userCount}
                </Row>
              </Col>
              <Col className={`${classes.boxShadowFlex}`} span={11}>
                <Row
                  gutter={[5, 0]}
                  className={`${classes.Heading}`}
                  justify="center"
                  align="center"
                >
                  <Col> Newsletter Users</Col>
                  <Col>
                    <CopyToClipboard
                      onCopy={() => {
                        message.success("Email Ids copied to clipboard");
                      }}
                      text={regUsers
                        .map((user) => {
                          return user.email;
                        })
                        .join(",")}
                    >
                      <Tooltip title="Copy all email ids">
                        <CopyOutlined />
                      </Tooltip>
                    </CopyToClipboard>
                  </Col>

                  <Col>
                    <DownloadCsv
                      title="Download Newsletter User's Email list "
                      data={regUsers.map((user) => {
                        return {
                          Email: user.email,
                        };
                      })}
                    />
                  </Col>
                </Row>
                <hr />
                <Row
                  justify="center"
                  align="center"
                  className={classes.UserCount}
                >
                  {regUsersLoading ? <Loader /> : regUsers.length}
                </Row>

                {state.user.userType === "superAdmin" && (
                  <Row justify="center" align="center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={showUserModal}
                    >
                      Send Mail
                    </Button>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>

          {state.user.userType === "superAdmin" && (
            <Col
              style={{ marginBottom: "1em" }}
              className={`${classes.boxShadowFlex}`}
              span={22}
            >
              <Row
                span={24}
                style={{ marginBottom: "1em" }}
                className={`${classes.Heading}`}
                justify="center"
              >
                Send Notification to Users
              </Row>
              <Row span={24} className={`${classes.Heading}`} justify="center">
                <Form
                  labelCol={{ span: 8 }}
                  labelAlign="left"
                  onFinish={addEventsubmitHandler}
                  form={form}
                  style={{ width: "80%" }}
                >
                  <Form.Item
                    label="Title"
                    required
                    name="title"
                    rules={[
                      { required: true, message: "Title field is empty" },
                    ]}
                  >
                    <Input required type="text" placeholder="Enter the Title" />
                  </Form.Item>

                  <Form.Item
                    label="RedirectURL"
                    required
                    name="redirecturl"
                    rules={[
                      { required: true, message: "Redirecting URL is empty" },
                    ]}
                  >
                    <Input
                      required
                      type="text"
                      placeholder="Enter redirectingURL"
                    />
                  </Form.Item>

                  <Form.Item label="ImageURL" name="imageurl">
                    <Input type="text" placeholder="Enter ImageURL" />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    required
                    name="message"
                    rules={[
                      { required: true, message: " Message field is Empty" },
                    ]}
                  >
                    <TextArea
                      style={{ backgroundColor: "#f5f5f5" }}
                      rows={4}
                      allowClear
                      placeholder="Enter the Message"
                    />
                  </Form.Item>
                  <div style={{ display: "flex", columnGap: "2em" }}>
                    <Form.Item>
                      <Button
                        loading={sending}
                        onClick={sendModeHandler}
                        type="primary"
                        htmlType="submit"
                      >
                        Send Notification
                      </Button>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        loading={testing}
                        onClick={testModeHandler}
                        type="primary"
                        htmlType="submit"
                      >
                        Test Notification
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Row>
            </Col>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Dashboard