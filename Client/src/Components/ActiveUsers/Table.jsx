import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Table,
  message,
  Button,
  Modal,
  Input,
  Tooltip,
  Space,
} from "antd";

import Highlighter from "react-highlight-words";

import axios from "../../api";
import "./ActiveUsers.css";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import DownloadUser from "./DownloadUser";

function UserTable(props) {
  const [loading, setloading] = useState(false);
  const [filterMode, setFilterMode] = useState(false);
  const [userData, setuserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [currentuserData, setcurrentuserData] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [searchedColumn, setsearchedColumn] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const searchInput = useRef(null);
  const [pageCount, setPageCount] = useState(0);
  const [allUser, setAllUser] = useState([]);
  const [allLoading, setAllloading] = useState(false)




  // const fetchUserData = () => {
  //   setloading(true);

  //   axios
  //     .get("/")
  //     .then((result) => {
  //       let userdata = result.data.users.filter(
  //         (user) =>
  //           user.userType === props.userType || user.userType === "superAdmin"
  //       );

  //       let userData = userdata.map((user) => {
  //         return {
  //           ktjID: user.ktjID,
  //           email: user.email,
  //           username: user.username,
  //           actions: {
  //             userType: user.userType,
  //             gender: user.gender,
  //             username: user.username,
  //             email: user.email,
  //             college: user.college,
  //             department: user.department,
  //             city: user.city,
  //             state: user.state,
  //             ktjID: user.ktjID,
  //             phone: user.phone,
  //             userType: user.userType,
  //           },
  //         };
  //       });

  //       message.success("Data Fetched Successfully");
  //       setuserData(userData);
  //       setloading(false);
  //     })
  //     .catch((error) => {
  //       setloading(false);
  //       message.error(error.response.data);
  //     });
  // };

  const getAllUserData = () => {

    setAllloading(true);

    axios
      .get("/")
      .then((result) => {
        setAllloading(false)
        let userdata = result.data.users.filter(
          (user) =>
            user.userType === props.userType
        );

        let userData = userdata.map((user) => {
          return {
            userType: user.userType,
            gender: user.gender,
            username: user.username,
            email: user.email,
            college: user.college,
            department: user.department,
            city: user.city,
            state: user.state,
            ktjID: user.ktjID,
            phone: user.phone,
            // userType: user.userType,
          };
        });

        message.success("Data Fetched Successfully");
        setAllUser(userData);
        setAllloading(false);
      })
      .catch((error) => {
        setAllloading(false);
        message.error(error.response.data);
      });
  }

  const getUserData = (page, pagination) => {

    setloading(true);
    const queryParams = {};
    queryParams["page"] = page;
    queryParams["pagination"] = pagination;
    axios
      .post("/getSpecificPageUsers", {
        ...queryParams,
        userType: props.userType

      })
      .then((result) => {
        setloading(false)
        let userdata = result.data.users.filter(
          (user) =>
            user.userType === props.userType || user.userType === "superAdmin"
        );

        let userData = userdata.map((user) => {
          return {
            ktjID: user.ktjID,
            email: user.email,
            username: user.username,
            actions: {
              userType: user.userType,
              gender: user.gender,
              username: user.username,
              email: user.email,
              college: user.college,
              department: user.department,
              city: user.city,
              state: user.state,
              ktjID: user.ktjID,
              phone: user.phone,
              // userType: user.userType,
            },
          };
        });

        message.success("Data Fetched Successfully");
        setuserData(userData);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        message.error(error.response.data);
      });
  }

  useEffect(() => {
    getUserCount();
    if (pageCount >= 10) {
      getUserData(1, 10);
    }
    else
      getUserData(1, pageCount);
  }, []);

  const getUserCount = () => {
    const userType = props.userType;
    axios
      .post("/getSpecificUserCount", {
        userType: userType
      })
      .then((result) => {
        setPageCount(result.data.userCount);
      })
      .catch((error) => {
        message.error(error.response.data);
      });
  };



  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#e6f7ff", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {

    confirm();
    setsearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);

    setloading(true);
    setFilterMode(true)
    axios
      .post(`/filterUsers?${dataIndex}=${selectedKeys}`, {
        userType: props.userType

      })
      .then((result) => {
        setloading(false)

        let userData = result.data.users.map((user) => {
          return {
            ktjID: user.ktjID,
            email: user.email,
            username: user.username,
            actions: {
              userType: user.userType,
              gender: user.gender,
              username: user.username,
              email: user.email,
              college: user.college,
              department: user.department,
              city: user.city,
              state: user.state,
              ktjID: user.ktjID,
              phone: user.phone,
              // userType: user.userType,
            },
          };
        });

        message.success("Data Fetched Successfully");
        setFilterData(userData);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);

      });
  };

  // console.log(allUser.length)

  const handleReset = (clearFilters) => {
    clearFilters();
    setsearchText("");
    setFilterMode(false);
  };

  const usercolumns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ellipsis: true,
      ...getColumnSearchProps("username"),
    },

    {
      title: "Email Id",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      ...getColumnSearchProps("email"),
    },

    {
      title: "Ktj Id",
      dataIndex: "ktjID",
      key: "ktjID",
      ellipsis: true,
      ...getColumnSearchProps("ktjID"),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions) => {
        return (
          <Space justify="space-between">
            <Tooltip placement="bottom" title="User details">
              <UserOutlined
                color="primary"
                onClick={() => {
                  setcurrentuserData(actions);
                  showModal();
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
      <Row justify="center" style={{ padding: "1rem" }}>
        <Modal
          align="center"
          className="Userdetails"
          title="User Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" type="primary" onClick={handleCancel}>
              OK
            </Button>,
          ]}
        >

          <p>
            <span>Username:</span> {currentuserData.username}
          </p>
          <p>
            <span>Email :</span> {currentuserData.email}
          </p>
          <p>
            <span>Ktj Id :</span>
            {currentuserData.ktjID}
          </p>
          <p>
            <span>City :</span>
            {currentuserData.city}
          </p>
          <p>
            <span>State :</span>
            {currentuserData.state}
          </p>
          <p>
            <span>Gender :</span> {currentuserData.gender}
          </p>
          <p>
            <span>Contact No :</span> {currentuserData.phone}
          </p>
          <p>
            <span>College :</span>
            {currentuserData.college}
          </p>
          <p>
            <span>Department :</span> {currentuserData.department}
          </p>
        </Modal>
        {
          props.userType === "normal" ? (
            allUser.length == 0 ? (
              <Col offset={20} style={{ padding: "1rem" }}>
                <Button loading={allLoading} key="back"  onClick={getAllUserData}>
                  Get All Users
                </Button>
              </Col>
            ) :
              (

                <Col offset={20} style={{ padding: "1rem" }}>
                  <Button loading={allLoading} key="back"  >
                    Get All Users
                    <DownloadUser title="Download Csv of Users" data={allUser} />
                  </Button>
                </Col>

              )
          ) : ""
        }



        <Col style={{ overflow: "scroll" }} span={20}>
          <Table
            className="Table"
            bordered
            columns={usercolumns}
            loading={loading}
            dataSource={filterMode ? filterData : userData}
            pagination={{ pageSizeOptions: ['30', '40'], onChange: getUserData, total: pageCount, showSizeChanger: true }}

          />
        </Col>
      </Row>
    </>
  );
}

export default UserTable;
