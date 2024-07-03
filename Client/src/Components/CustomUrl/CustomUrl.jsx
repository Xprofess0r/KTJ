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


import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined} from "@ant-design/icons";



const CustomUrl = () => {

    const [showModal, setshowModal] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [dataloading, setdataLoading] = useState(false);
    const [urls, setUrls] = useState([]);
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [urlId, setUrlId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [editMode, seteditMode] = useState(false);

    useEffect(() => {
        getUrls()
    },[])


    const getUrls = () => {
        setdataLoading(true)
        axios.get('/customUrl/getUrls')
            .then(res => {
                setdataLoading(false)
                message.success('Urls Fetched Successfully')


                const Urls = res.data.urls.map(url => {
                    return {
                        ...url,
                        actions:url
                    }})
                setUrls(Urls);
            })
            .catch(err => {
                setdataLoading(false)
                message.error('Error Fetching Urls')
                console.log(err);
            })
    }


    const addUrlHandler = (values) => {

        setLoading(true);

        const body = {
            ...values,
          };
          let url = "customUrl/createUrl";
          if (editMode) {
            url = "customUrl/editUrl";
            body._id = urlId
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
          .post('/customUrl/deleteUrl', {
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


      const editUrlHandler = (url) => {
    
        form.setFieldsValue({
        actualUrl: url.actualUrl,
        customUrl: url.customUrl,
         
        });
        seteditMode(true);
        setUrlId(url._id);
        setshowModal(true);
      };


    const column = [
        { title: "ActualUrl", dataIndex: "actualUrl", key: "actualUrl" ,ellipsis:true ,render: link => <a href={link}>{link}</a>},
        { title: "CustomUrl", dataIndex: "customUrl", key: "customUrl"},
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (actionIndex) => {
            

                console.log(actionIndex)
              return (
                <Space justify="space-between">
                  <Tooltip placement="bottom" title="Delete url">
                    <DeleteOutlined
                      color="primary"
                      onClick={() => {
                        setshowDeleteModal(true);

                        setUrlId(actionIndex._id);
                      }}
                    />
                  </Tooltip>
                  <Tooltip placement="bottom" title="Edit url">
                    <EditOutlined
                      color="primary"
                      onClick={() => {
                        editUrlHandler(actionIndex);
                        seteditMode(true);
                      }}
                    />
                  </Tooltip>

                  <CopyToClipboard
                    onCopy={() => {
                      message.success(" Custom Url copied to clipboard");
                    }}
                    text={"https://link.ktj.in" + actionIndex.customUrl}
                  >
                    <Tooltip title="Copy Custom Url">
                      <CopyOutlined />
                    </Tooltip>
                  </CopyToClipboard>
                </Space>
              );
            },
          },
      ];


    return (
        <>
            <Row justify="end" span={24}>

                <Modal
                    title={<Row justify="center">Add Url</Row>}
                    visible={showModal}
                    width={500}
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
                        onFinish={addUrlHandler}
                    >
                        <Form.Item
                            label="Actual Url"
                            required
                            name="actualUrl"
                            rules={[{ required: true, message: "Actual Url is required" }]}
                        >
                            <Input required type="text" placeholder="Enter the Actual Url" />
                        </Form.Item>

                        <Form.Item
                            label="Custom Url"
                            required
                            name="customUrl"
                            rules={[{ required: true, message: "Custom Url is required" }]}
                        >
                            <Input required type="text" placeholder="Enter the Custom Url" />
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
                    
                    deleteUrlHandler(urlId);
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
                        Add Custom Urls
                    </Button>
                </Col>
            </Row>

            <Row justify="center" style={{ padding: "1rem" }}>
                <Col span={20}>
                    <Table
                        bordered
                        columns={column}
                        dataSource={urls}
                        loading={dataloading}
                    />
                </Col>
            </Row>
        </>
    )
}


export default CustomUrl;