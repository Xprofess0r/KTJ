import React, { useState, useEffect } from 'react'
import axios from "../../api";
import { List, Collapse, Modal, Row, Col, Tooltip, message } from 'antd';
import './Email.module.css'
import { UserOutlined, CopyOutlined } from '@ant-design/icons'
import { CopyToClipboard } from "react-copy-to-clipboard";
import DownloadCsv from '../DownloadCsv/DownloadCsv';
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


function Emails() {

    const [emails, setEmails] = useState([])
    const [loading, setLoading] = useState(false)
    const [receiver, setReceiver] = useState([]);
    const [open, setOpen] = useState(false)
    const [EmailCount, setEmailCount] = useState(0)

    useEffect(() => {
        getEmailsCount();
        if (EmailCount >= 10) {
            fetchEmails(1, 10);
        }
        else
            fetchEmails(1, EmailCount);
    }, [])

    const getEmailsCount = () => {
       
        axios
          .get("/email/getMailsCount")
          .then((result) => {
            setEmailCount(result.data.emailsCount);
          })
          .catch((error) => {
            message.error(error.response.data);
          });
      };
    

    const fetchEmails = async (page, pagination) => {

        const queryParams = {};
        queryParams["page"] = page;
        queryParams["pagination"] = pagination;

        setLoading(true)
        axios
            .post("/email/getMails", queryParams)
            .then((res) => {
                setLoading(false)

                const emailData = res.data.emails.map((email) => {
                    var utcDate = email.createdAt; // ISO-8601 formatted date returned from server
                    var localDate = new Date(utcDate);
                    localDate = localDate.toString();
                    let datetime = localDate.split(" ");
                    let day = datetime[0];
                    let month = datetime[1];
                    let year = datetime[3].slice(2, 4);
                    let time = datetime[4].slice(0, 5);
                    let hours = time.slice(0, 2);
                    let minutes = time.slice(3, 5);
                    var newformat = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    email['date'] = `${day} \xa0 ${hours}:${minutes} ${newformat} \xa0 ${datetime[2]} ${month}/ ${year}`;

                    return email

                })

                console.log(emailData)
                setEmails(emailData)
            })
            .catch((error) => {
                setLoading(false)
            });
    }

    const openReceiverModel = () => {
        setOpen(true)
    }
    return (
        <div style={{ margin: "1em 2em", minHeight: "60vh" }}>

            <List
                pagination={{
                    onChange:fetchEmails,
                    pageSize: 10,
                    total:EmailCount,
                    showSizeChanger: true
                }}
                dataSource={emails}
                footer={
                    <div> </div>
                }
                loading={loading}
                renderItem={item => (
                    <List.Item
                        key={item._id}
                    >

                        <Collapse accordion>
                            <Panel header={
                                <>
                                    <div className="headerDiv">


                                        <div className="subjectDiv">
                                            <div className="rDiv">
                                                <span> {item.senderName ? item.senderName : ""} </span>

                                            </div>

                                            <span style={{ fontSize: "1.3em", fontWeight: "500", maxWidth: "80%" }}> {item.subject}</span>
                                        </div>

                                        <div>
                                            {
                                                item.date
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                                key={item._id}>

                                <div style={{ marginBottom: "1em" }}>
                                    <span style={{ fontSize: "1em", fontWeight: "700" }}>To &nbsp;&nbsp;&nbsp;</span>
                                    <span>
                                        {item.recipientName ? item.recipientName : ""}
                                    </span>

                                    {
                                        item.commonRecipients.length && (

                                            <span style={{ cursor: "pointer" }} onClick={() => {
                                                setReceiver(item.commonRecipients);
                                                openReceiverModel();
                                            }} >
                                                <UserOutlined />
                                            </span>)
                                    }
                                </div>

                                {/* <span style={{ fontSize: "1em", fontWeight: "700" }}>Body: &nbsp;&nbsp;&nbsp;</span> */}

                                <div dangerouslySetInnerHTML={{ __html: item.emailbody }} />
                            </Panel>
                        </Collapse>

                    </List.Item>


                )}
            />

            <Modal
                title={<Row justify="center">

                    Receivers
                    &nbsp;&nbsp;
                    <CopyToClipboard
                        onCopy={() => {
                            message.success("Email Ids copied to clipboard");
                        }}
                        text={receiver
                            .map((user) => {
                                return user;
                            })
                            .join(",")}
                    >
                        <Tooltip title="Copy all email ids">
                            <CopyOutlined />
                        </Tooltip>
                    </CopyToClipboard>

                    <DownloadCsv title="Download Email list" data={receiver .map((user) => { return user; })}/>


                </Row>}
                visible={open}
                onCancel={() => {
                    setOpen(false)
                }}
                footer={
                    <></>
                }
            >
                {/* <Row style={{ rowGap: "10px" }}>
                    {receiver.map((user) => {
                        return (
                            <Col span={12}>
                                <span style={{ backgroundColor: "rgb(0 132 253 / 13%)" }}>
                                    {user}
                                </span>
                            </Col>
                        );
                    })}
                </Row> */}
            </Modal>
        </div>
    )
}

export default Emails