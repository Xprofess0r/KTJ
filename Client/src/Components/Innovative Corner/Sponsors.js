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
  Radio,

} from "antd";
import axios from "../../api";
import classes from "./Sponsors.module.css";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import './SponsorYear.module.css'
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
const { Option } = Select;
function Sponsors(props) {
  const [sponsorsData, setsponsorsData] = useState([]);
  const [priorityData, setpriorityData] = useState({
    priority: 1,
    year: 2021,
    sponsorType: "Events"
  });
  const [loading, setloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sponsorTypeId, setsponsorTypeId] = useState(null);
  const [showcategoryadd, setshowcategoryadd] = useState(false);
  const [showpriorityModal, setshowpriorityModal] = useState(false);
  const [showsponsorModal, setshowsponsorModal] = useState(false);
  const [form] = Form.useForm();
  const [sponsorform] = Form.useForm();
  const [editcategoryMode, seteditcategoryMode] = useState(false);
  const [editsponsorMode, seteditsponsorMode] = useState(false);
  const [showDeletecategoryModal, setshowDeletecategoryModal] = useState(false);
  const [showDeletesponsorModal, setshowDeletesponsorModal] = useState(false);
  const [sponsorId, setsponsorId] = useState(null);
  const [sponsorData, setsponsorData] = useState({
    sponsorName: '',
    sponsorImg: '',
    linktoWebsite: '',
    sponsorType: '',
    year: ''
  })

 
 

  const editSponser=(sponsor)=>{

    seteditsponsorMode(true)
    sponsorform.setFieldsValue({
      sponsorImg:sponsor.sponsorImg,
      sponsorName:sponsor.sponsorName,
      linktoWebsite:sponsor.linktoWebsite
    })
  }

  
  const columns = [
    { title: "Sponsor Name", dataIndex: "sponsorName", key: "sponsorName" },
    {
      title: "Link To Website",
      dataIndex: "linktoWebsite",
      key: "linktoWebsite",
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "Actions",
      dataIndex: "data",
      key: "data",

      render: (actionIndex) => {
        var eye = actionIndex.active ? (
          <EyeOutlined
            color="primary"
            onClick={() => {
              ShowHideHandler(actionIndex);
            }}
          />
        ) : (
          <EyeInvisibleOutlined
            color="primary"
            style={{ color: '#bfbfbf' }}
            onClick={() => {
              ShowHideHandler(actionIndex);
            }}
          />
        );
        return (
          <Space justify="space-between">
            <Tooltip placement="bottom" title="Delete Sponsor">
              <DeleteOutlined
                color="primary"
                onClick={() => {
                  setshowDeletesponsorModal(true);
                  setsponsorTypeId(actionIndex.sponsorTypeId);
                  setsponsorId(actionIndex.sponsorId);
                }}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Edit Sponsor">
              <EditOutlined
                color="primary"
                onClick={() => {
                  setshowsponsorModal(true);
                  editSponser(actionIndex);
                  setsponsorTypeId(actionIndex.sponsorTypeId);
                  setsponsorId(actionIndex.sponsorId);
                }}
              />
            </Tooltip>
            {/* Hide/Show*/}
            {/* <Tooltip placement="bottom" title="Show/Hide">
              {eye}
            </Tooltip> */}
          </Space>
        );
      },
    },
  ];
  const deleteSponsorHandler = (s1, s2) => {

    setDeleting(true);
    axios
      .delete("/sponsors/deleteSponsor", {
        data: { sponsorTypeId: s1, sponsorId: s2 },
      })
      .then((res) => {
        setloading(false);
        message.success(res.data.message);
        setDeleting(false);
        props.fetchyear();

        setshowDeletesponsorModal(false);
        fetchEventData();
      })
      .catch((error) => {
        setloading(false);
        message.error(" some error occured");
        setDeleting(false);
        setshowDeletesponsorModal(false);
      });
  };
  const fetchEventData = () => {
    setloading(true);
    axios
      .get(`/sponsors?year=${props.year}`)
      .then((result) => {


        let data = result.data.sponsors.map((event) => {
          return {
            sponsorType: event.sponsorType,
            year: event.year,
            sponsorTypeId: event._id,
            priority: event.priority,
            actions: event.sponsors,
            order:event.order
          };
        });

        message.success("Data Fetched Successfully");
        setsponsorsData(data);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        message.error(" some error occured");
      });
  };
  useEffect(() => {
    fetchEventData();
  }, []);




 
  const updatePriorityHandler = () => {
    let url = "/sponsors/editPriority";

    axios
      .put(url, priorityData)
      .then((res) => {
        setshowpriorityModal(false)
        message.success(res.data.message);
        fetchEventData();
      })
      .catch((error) => {
        message.error("some error occured");
      });
  }

  const onChange = (e) => {

    priorityData.priority = e.target.value
    setpriorityData({ ...priorityData })
  };

  
  const addSponsorCategoryHandler = (values) => {


    if (!editcategoryMode) {

    
    let url = "/sponsors/createSponsorCategory";

    axios
      .post(url, values)
      .then((res) => {
        setshowcategoryadd(false)
        message.success(res.data.message);
        fetchEventData();
      })
      .catch((error) => {
        message.error("some error occured");
      });
    }
    else{

      let url="/sponsors/editSponsorCategory"
      values["sponsorTypeId"] = sponsorTypeId;
      axios
      .post(url, values)
      .then((res) => {
        setshowcategoryadd(false);
        seteditcategoryMode (false)
        message.success(res.data.message);
        fetchEventData();
      })
      .catch((error) => {
        message.error("some error occured");
      });
    


    }
  }


  


  const addSponsorHandler = (values) => {

    sponsorData.sponsorName=values.sponsorName;
    sponsorData.linktoWebsite=values.linktoWebsite;
    sponsorData.sponsorImg=values.sponsorImg;
    setsponsorData({...sponsorData})


    if (!editsponsorMode) {

   
      let url = "/sponsors/createSponsor"; 
    
      axios
        .post(url, sponsorData)
        .then((res) => {
          setshowsponsorModal(false)
          message.success(res.data.message);
          fetchEventData();
        })
        .catch((error) => {
          message.error("some error occured");
        });
      }
      else{
  
        let url = "/sponsors/editSponsor"; 
        sponsorData["sponsorId"] = sponsorId;
        sponsorData["sponsorTypeId"] = sponsorTypeId;
        axios
        .put(url, sponsorData)
        .then((res) => {
          setshowsponsorModal(false)
          seteditsponsorMode (false)
          message.success(res.data.message);
          fetchEventData();
        })
        .catch((error) => {
          message.error("some error occured");
        });
      
  
  
      }


  }



  const editSponsorCategory=(sponsorCategory)=>{
    console.log(sponsorCategory)
    seteditcategoryMode(true)
    setsponsorTypeId(sponsorCategory.sponsorTypeId);
    form.setFieldsValue({
      sponsorType:sponsorCategory.sponsorType,
      year:sponsorCategory.year,
      order:sponsorCategory.order,
      priority:sponsorCategory.priority
    });
  }

  const  deleteCategoryHandler=(sponsorTypeId)=>{
    axios
    .delete("/sponsors/deleteCategory", {
      data: { sponsorTypeId:sponsorTypeId },
    })
    .then((res) => {

      message.success(res.data.message);
      props.fetchyear();

      setshowDeletecategoryModal(false)
      fetchEventData();
    })
    .catch((error) => {
      message.error(" some error occured");
      setshowDeletecategoryModal(false);
    });
  }


  return (
    <>
      <Row justify="end" span={24}>
        <Modal
          title={
            <Row justify="center" style={{ paddingRight: "20px" }}>
                   {editcategoryMode?"Update Sponsor Category":"Add Sponsor Category"}
            </Row>
          }
          visible={showcategoryadd}
          width={900}
          footer={<div></div>}
          onCancel={() => {
            form.resetFields();
            setshowcategoryadd(false);
            seteditcategoryMode(false)
          }}
        >
          <Form
            labelCol={{ span: 8 }}
            form={form}
            labelAlign="left"
            onFinish={addSponsorCategoryHandler}
          >
          
              <>
                {" "}
                <Form.Item
                  label="Sponser Type :"
                  required
                  name="sponsorType"
                  rules={[{ required: true, message: "SponserType field is empty" }]}
                >
                  <Input type="text" placeholder="Enter the  Sponser's Type" />
                </Form.Item>
                <Form.Item
                  label="Year :"
                  required
                  name="year"
                  rules={[{ required: true, message: "Year field is empty" }]}
                >

                  <Select
                    allowClear
                    placeholder="Select the year"

                  >
                    <Option value="2022">2022</Option>
                    {/* <Option value="2021">2021</Option>
                    <Option value="2020">2020</Option>
                    <Option value="2019">2019</Option>
                    <Option value="2018">2018</Option>
                    <Option value="2017">2017</Option>
                    <Option value="2016">2016</Option> */}

                  </Select>

                </Form.Item>

                
                <Form.Item label="Priority :" name="priority">
                  <Select
                    allowClear
                    placeholder="Select the Priority"

                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="4">4</Option>


                  </Select>
                </Form.Item>

                <Form.Item
                  label="Order :"
                  name="order"

                >
                  <Input type="number" placeholder="Enter the  order" />
                </Form.Item>

              </>
          


            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editcategoryMode ? "Save" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          visible={showDeletecategoryModal}
          okText="Confirm"
          cancelText="Cancel"
          confirmLoading={deleting}
          onCancel={() => {
            setshowDeletecategoryModal(false);
          }}
          onOk={() => {
            deleteCategoryHandler(sponsorTypeId);
          }}
        >
          Are you sure you want to delete this Sponsor category and all sponsors?
        </Modal>

        <Modal
          visible={showDeletesponsorModal}
          okText="Confirm"
          cancelText="Cancel"
          confirmLoading={deleting}
          onCancel={() => {
            setshowDeletesponsorModal(false);
          }}
          onOk={() => {
            deleteSponsorHandler(sponsorTypeId,sponsorId);
          }}
        >
          Are you sure you want to delete this Sponsor ?
        </Modal>
        <Col offset={20} style={{ padding: "1rem", paddingRight: "1rem !important" }}>
          {" "}
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setshowcategoryadd(true)}
          >
            Add  Sponsor category
          </Button>
        </Col>
      </Row>

      {sponsorsData.map((item) => {
        let q = item.actions;

        

        q.forEach((x) => {
          x["data"] = {
            sponsorTypeId: item.sponsorTypeId,
            sponsorId: x._id,
            linktoWebsite: x.linktoWebsite,
            sponsorImg: x.sponsorImg,
            sponsorName: x.sponsorName,
          };
        });

        return (
          <Row justify="left" style={{ padding: "1rem" }}>
            <Col span={20}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              ></div>
              <table style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }} className={classes.Table} style={{ width: "100%" }}>
                <tr style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}>
                  {" "}
                  <td>
                    <h2
                      style={{
                        marginLeft: "50px",
                        display: "flex", columnGap: "0.9em" 
                      }}
                    >
                      Sponsor Type: {item.sponsorType}

                      <span>
                      <Tooltip placement="bottom" title="Edit Sponsor Category">
                        <EditOutlined
                          color="primary"
                          onClick={() => {

                            console.log(item)
                            editSponsorCategory(item)
                        
                            setshowcategoryadd(true)
                          }}
                        />
                      </Tooltip>
                    </span>

                    
                    <span>
                      <Tooltip placement="bottom" title="Delete Sponsor Category">
                        <DeleteOutlined
                          color="primary"
                          onClick={() => {
                            setsponsorTypeId(item.sponsorTypeId);
                            setshowDeletecategoryModal(true);  
                           
                          }}
                        />
                      </Tooltip>
                    </span>
                    </h2>
                  </td>

             

                  <td style={{ display: "flex", columnGap: "0.6em" }}>
                    {" "}
                    <h2>Add Sponsor</h2>
                    <span>
                      <Tooltip placement="bottom" title="Add Sponsor">
                        <UserAddOutlined
                          color="primary"
                          onClick={() => {

                            sponsorData.year = props.year,
                              sponsorData.sponsorType = item.sponsorType

                            sponsorform.resetFields()
                            setsponsorData({ ...sponsorData })
                            setshowsponsorModal(true)
                          }}
                        />
                      </Tooltip>
                    </span>
                  </td>


                  <td style={{ display: "flex", columnGap: "0.6em" }}>
                    {" "}
                    <h2>Priority: {item.priority}</h2>
                    <span>
                      <Tooltip placement="bottom" title="Edit Priority">
                        <EditOutlined
                          color="primary"
                          onClick={() => {

                            priorityData.year = props.year,
                            priorityData.sponsorType = item.sponsorType

                            setpriorityData({ ...priorityData })
                            setshowpriorityModal(true)
                          }}
                        />
                      </Tooltip>
                    </span>
                  </td>
                </tr>
              </table>
              <Table
                className={classes.Table}
                bordered
                columns={columns}
                dataSource={q}
                loading={loading}
              />
            </Col>

            <Modal
              title={
                <Row justify="center" style={{ paddingRight: "20px" }}>
                  Edit Priority
                </Row>
              }
              visible={showpriorityModal}
              width={300}
              footer={<div></div>}
              onCancel={() => {
                form.resetFields();
                setshowpriorityModal(false);
              }}
            >
              <Form
                labelCol={{ span: 8 }}
                labelAlign="left"
                onFinish={updatePriorityHandler}
              >

                <Form.Item>
                  <Radio.Group onChange={onChange} value={priorityData.priority}>
                    <Space direction="vertical">
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={4}>4</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>


                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>


              </Form>
            </Modal>


            <Modal
              title={
                <Row justify="center" style={{ paddingRight: "20px" }}>
                   {editsponsorMode ? "Edit Sponsor" : "Add Sponsor"}
                </Row>
              }
              visible={showsponsorModal}
              width={700}
              footer={<div></div>}
              onCancel={() => {
                form.resetFields();
                seteditsponsorMode(false)
                setshowsponsorModal(false);
              }}
            >
              <Form
                labelCol={{ span: 8 }}
                labelAlign="left"
                onFinish={addSponsorHandler}
                form={sponsorform}
              >
                <Form.Item label="  Sponser's Name" name="sponsorName">
                  <Input type="text" placeholder="Enter the  Sponser's Name" />
                </Form.Item>
                <Form.Item label="  Sponser's Image URL" name="sponsorImg">
                  <Input type="text" placeholder="Enter the  Sponser's Image Url" />
                </Form.Item>

                <Form.Item label="Link of Website" name="linktoWebsite">
                  <Input type="text" placeholder="Enter the Link of Website" />
                </Form.Item>

                
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                  {editsponsorMode ? "Save" : "Submit"}
                  </Button>
                </Form.Item>


              </Form>
            </Modal>

          </Row>


        );
      })}
    </>
  );
}

export default Sponsors;