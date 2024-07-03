import React, { useState, useEffect } from "react";
import { userTableColumns } from "../../table_column_formats";
import { useSelector } from "react-redux";
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
import classes from "./Competitions.module.css";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
// import EmailComposer from "../Admin_panel/Email_Composer";
import DownloadCsv from "../DownloadCsv/DownloadCsv";
function Event(props) {
  const [showUsers, setShowUsers] = useState(false);
  const [OpenModalHeadktjID, setOpenModalHeadktjID] = useState("");
  const [users, setUsers] = useState([]);
  const [competitionData, setcompetitionData] = useState([]);
  const [loading, setloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [form] = Form.useForm();
  const [Mail, showMail] = useState(false);
  const [category, setCategory] = useState(null);
  const [editMode, seteditMode] = useState(false);
  const [competitionId, setcompetitionId] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [eventDeleteId, setEventDeleteId] = useState(null);
  const [teamsData, setTeamsData] = useState([]);
  const [emaildata, setemailData] = useState([{}]);

  // logged in user
  const user = useSelector((state) => state.auth.user);
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  const ShowHideHandler = (competition) => {
    seteditMode(true);
    setcompetitionId(competition._id);

    if (competition.active == true) {
      addEventsubmitHandler(
        {
          ...competition,
          active: false,
        },
        true,
        competition._id
      );
    } else {
      addEventsubmitHandler(
        {
          ...competition,
          active: true,
        },
        true,
        competition._id
      );
    }
  };

  const getTeamsData = (teamId, eventId) => {
    axios
      .post(`/team/eventTeamDetails`, {
        teamId,
        eventId,
      })
      .then((res) => {
        setTeamsData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RegistrationHandler = (competition) => {
    seteditMode(true);
    setcompetitionId(competition._id);
    if (competition.registration == true) {
      addEventsubmitHandler(
        {
          ...competition,
          registration: false,
        },
        true,
        competition._id
      );
    } else {
      addEventsubmitHandler(
        {
          ...competition,
          registration: true,
        },
        true,
        competition._id
      );
    }
  };

  const editEventHandler = (competition) => {
    // console.log(competition);
    form.setFieldsValue({
      title: competition.title,
      prize_money: competition.prize_money,
      content: competition.content,
      imageUrl: competition.imageUrl,
      headKtjId: competition.headKtjId,
      deadline: competition.deadline,
      problem_statement_link: competition.problem_statement_link,
      posterUrl: competition.posterUrl,
      max: competition.max,
      min: competition.min,
      competitionUrl: competition.competitionUrl,
      sponsors: competition.sponsors,
    });
    seteditMode(true);
    setcompetitionId(competition._id);
    setshowModal(true);
  };
  const columns = [
    { title: "Title", dataIndex: "title", key: "title", ellipsis: true },
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

        regi = !actionIndex.registration ? (
          <Tooltip placement="bottom" title="Open Registrations">
            <CheckCircleOutlined
              color="primary"
              style={{ color: "#52c41a" }}
              onClick={() => {
                RegistrationHandler(actionIndex);
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip
            placement="bottom"
            title="
          Close Registrations"
          >
            <CloseCircleOutlined
              color="primary"
              style={{ color: "#f5222d" }}
              onClick={() => {
                RegistrationHandler(actionIndex);
              }}
            />
          </Tooltip>
        );

        eye = !actionIndex.active ? (
          <Tooltip placement="bottom" title="Show">
            <EyeOutlined
              color="primary"
              onClick={() => {
                ShowHideHandler(actionIndex);
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" title="Hide">
            <EyeInvisibleOutlined
              color="primary"
              style={{ color: "#bfbfbf" }}
              onClick={() => {
                ShowHideHandler(actionIndex);
              }}
            />
          </Tooltip>
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
                onClick={() => {
                  editEventHandler(actionIndex);
                  seteditMode(true);
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Teams List">
              <UserOutlined
                color="primary"
                onClick={() => {
                  setOpenModalHeadktjID(actionIndex.headKtjId);
                  setemailData([]);
                  actionIndex.teams
                    ? actionIndex.teams.map((team, index) => {
                        team["key"] = index;

                        setemailData((oldEmail) => [
                          ...oldEmail,
                          {
                            email: team.members[0].email,
                          },
                        ]);
                      })
                    : "";
                  setUsers(actionIndex.teams);
                  setShowUsers(true);
                }}
              />
            </Tooltip>
            <CopyToClipboard
              onCopy={() => {
                message.success("Email Ids copied to clipboard");
              }}
              text={
                actionIndex.teams
                  ? actionIndex.teams
                      .map((team) => {
                        return team.members.map((member) => member.email);
                      })
                      .join(",")
                  : " "
              }
            >
              <Tooltip title="Copy Email Ids of Participants">
                <CopyOutlined />
              </Tooltip>
            </CopyToClipboard>
            <DownloadCsv
              data={
                actionIndex.teams
                  ? actionIndex.teams
                      .map((team) =>
                        team.members.map((member) => {
                          // console.log(member);

                          return {
                            TeamKtjId: team.ktjID,
                            username: member.username,
                            ktjID: member.ktjID,
                            email: member.email,
                            category: team.category,
                            phone: member.phone,
                            gender: member.gender,
                            college: member.college,
                            department: member.department,
                            city: member.city,
                            state: member.state,
                          };
                        })
                      )
                      .flat()
                  : []
              }
              title={`Download Participant's Email List`}
              filename={actionIndex.title}
              headers={[
                { label: "Team-ID", key: "TeamKtjId" },
                { label: "KTJ-ID", key: "ktjID" },
                ...(actionIndex.title == "Robo Wars"
                  ? [{ label: "Category", key: "category" }]
                  : []),
                { label: "Name", key: "username" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
                { label: "Gender", key: "gender" },
                { label: "College", key: "college" },
                { label: "Department", key: "department" },
                { label: "City", key: "city" },
                { label: "State", key: "state" },
              ]}
            />
            {/* Registrations open/closed */}
            {regi}
            {/* Hide/Show*/}
            {eye}
          </Space>
        );
      },
    },
  ];

  const deleteEventHandler = (competitionId) => {
    // console.log(competitionId);

    // setloading(true);
    setDeleting(true);
    axios
      .post("/competitions/deleteCompetition", {
        _id: competitionId,
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
      .get("/competitions/getcompetitions")
      .then((result) => {
        let data = result.data?.competitions
          ?.sort((a, b) => {
            // console.log(a.headKtjId, user.ktjID);
            if (a.headKtjId == user.ktjID) return -1;
            else return 1;
          })
          .map((competition) => {
          
            return {
              title: competition.title,
              prize_money: competition.prize_money,
              content: competition.content,
              imageUrl: competition.imageUrl,
              headKtjId: competition.headKtjId,
              deadline: competition.deadline,
              problem_statement_link: competition.problem_statement_link,
              actions: competition,
            };
          });
        message.success("Data Fetched Successfully");
        // console.log(data);
        setcompetitionData(data);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        message.error(error?.response?.data);
      });
  };
  useEffect(() => {
    fetchEventData();
  }, []);
  const addEventsubmitHandler = (values, edit = false, competitionid = "") => {
    // if (!values.guests || values.guests?.length === 0) {
    //   return message.error("Please Enter at least one guest Information");
    // }
    // let guest_profile_photos = values.guests?.map(
    //   (guest) => guest.guest_profile_photo
    // );
    // console.log(values)
    const body = {
      ...values,
    };
    let url = "/competitions/createCompetition";
    if (editMode || edit) {
      url = "/competitions/updateCompetition";
      body._id = competitionid ? competitionid : competitionId;

      axios
        .put(url, body)
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
    } else {
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

  const teamsColumn = [
    { title: "Event", dataIndex: "event", key: "event" },
    { title: "Captain  KTJ-ID", dataIndex: "captain", key: "captain" },
    { title: " Team KTJ-ID", dataIndex: "ktjID", key: "ktjID" },
  ];

  // console.log(users.length);

  if (users.length > 0 && users[0].event == "Robo Wars") {
    teamsColumn.push({
      title: "Category",
      dataIndex: "category",
      key: "category",
    });
  }

  const membersColumn = [
    { dataIndex: "username", key: "username" },
    { dataIndex: "ktjID", key: "ktjID" },
    { dataIndex: "email", key: "email" },
  ];

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
          {/* <EmailComposer
            users={emaildata}
            showMail={(value) => showMail(value)}
          /> */}
        </Modal>
        <Modal
          title={<Row justify="center">Add New Competition</Row>}
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
            <Form.Item label="deadline" name="deadline">
              <Input required type="date" placeholder="Enter The Deadline" />
            </Form.Item>
            <Form.Item
              label="Prize Money"
              type="number"
              name="prize_money"
              rules={[{ required: true, message: "Prize Money is empty" }]}
            >
              <Input required type="text" placeholder="Enter the Prize money" />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Content is empty" }]}
            >
              <Input required type="text" placeholder="Enter the content" />
            </Form.Item>

            <Form.Item label="ImageUrl" name="imageUrl">
              <Input
                type="text"
                name="imageUrl"
                placeholder="Enter the Image Url"
              />
            </Form.Item>

            <Form.Item label="competitionUrl" name="competitionUrl">
              <Input
                type="text"
                name="competitionUrl"
                placeholder="Enter the competition Url"
              />
            </Form.Item>

            <Form.Item label="PosterUrl" name="posterUrl">
              <Input
                type="text"
                name="posterUrl"
                placeholder="Enter the Poster Url"
              />
            </Form.Item>

            <Form.Item label="Maximum Limit" name="max">
              <Input
                type="number"
                name="max"
                placeholder="Enter the Maximum Limit of Participants"
              />
            </Form.Item>

            <Form.Item label="Minimum Limit" name="min">
              <Input
                type="number"
                name="min"
                placeholder="Enter the Minimum Limit of Participants"
              />
            </Form.Item>

            <Form.Item
              label="Problem statement link"
              name="problem_statement_link"
            >
              <Input
                type="text"
                name="problem_statement_link"
                placeholder="Enter problem statement link"
              />
            </Form.Item>

            <Form.List name="sponsors" justify="center" label="Sponsors">
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
                          label=" Image Link"
                          name={[field.name, "sponsorImg"]}
                          fieldKey={[field.fieldKey, "sponsorImg"]}
                          rules={[
                            {
                              required: true,
                              message: "Sponsor Image Url  is missing",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            name="sponsorImg"
                            placeholder="Enter Sponsor Image URL "
                          />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          label="Name"
                          name={[field.name, "sponsorName"]}
                          fieldKey={[field.fieldKey, "sponsorName"]}
                          rules={[
                            {
                              required: true,
                              message: "Sponsor Name is missing",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            name="sponsorImg"
                            placeholder="Enter Sponsor Name"
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
                      Add Sponsors
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
          visible={showDeleteModal}
          okText="Confirm"
          cancelText="Cancel"
          confirmLoading={deleting}
          onCancel={() => {
            setshowDeleteModal(false);
          }}
          onOk={() => {
            // console.log(eventDeleteId);
            deleteEventHandler(eventDeleteId);
          }}
        >
          Are you sure you want to delete this Competition ?
        </Modal>
        <Modal
          visible={showUsers}
          width={900}
          footer={
            users.length !== 0 && (
              <>
                <Col span={4}>
                  <Button type="primary" onClick={() => showMail(true)}>
                    Send Mail
                  </Button>
                </Col>
              </>
            )
          }
          size="large"
          // okText="Confirm"
          // cancelText="Cancel"
          confirmLoading={deleting}
          onCancel={() => {
            setShowUsers(false);
          }}
        >
          <Table
            columns={teamsColumn}
            expandable={{
              expandedRowRender: (team) => (
                <>
                  <h1 style={{ textAlign: "center" }}> Team Members</h1>
                  <div className="teamTable">
                    <Table columns={membersColumn} dataSource={team.members} />
                  </div>
                </>
              ),
              //   rowExpandable: record => record.name !== 'Not Expandable',
            }}
            dataSource={users}
          />
        </Modal>
        <Col offset={20} style={{ padding: "1rem" }}>
          {" "}
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setshowModal(true)}
          >
            Add Competition
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ padding: "1rem" }}>
        <Col span={20}>
          <Table
            className={classes.Table}
            bordered
            columns={columns}
            dataSource={competitionData}
            loading={loading}
            scroll={{ x: 1500, y: 300 }}
          />
        </Col>
      </Row>
    </>
  );
}

export default Event;
