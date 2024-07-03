import React, { useState } from "react";
import { Button, Form, Input, message, Row } from "antd";
import axios from "../../../api";
import Loader from "../../Loader/index";

import classes from "./index";

const EmailComposer = (props) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [mailForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const sendMailHandler = () => {
    let list = [];
    props.users.forEach((user) => {
      list.push(user.email);
    });

    if (list.length === 0) {
      message.error("No users to Send Mail");
      return;
    }

    if (subject.trim().length === 0) {
      message.error("Enter Subject of the Email");
      return;
    } else if (description.trim().length === 0) {
      message.error("Description is Empty");
      return;
    }

    setLoading(true);

    axios
      .post("/email/sendMail", {
        users: list,
        subject: subject,
        body: description,
      })
      .then((res) => {
        message.success(res.data.message);
        mailForm.resetFields();
        props.showMail(false);
        setLoading(false);
        setSubject("");
      })
      .catch((error) => {
        console.log(error.response);
        message.error(error.message);
        setLoading(false);
        setSubject("");
      });
  };

  return (
    <>
      <Row style={{ padding: "1em" }}>
        <Form labelCol={{ span: 8 }} form={mailForm} labelAlign="left">
          <Form.Item
            label="Subject"
            required
            name="subject"
            rules={[{ required: true, message: "Subject field is empty" }]}
          >
            <Input
              required
              type="text"
              value={subject}
              placeholder="Enter the Subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Item>
          <h5>Description :</h5>
          <Form.Item
            required
            name="description"
            rules={[{ required: true, message: "Description field is empty" }]}
          >
            <textarea
              value={description}
              placeholder="Enter the Description"
              onChange={(e) => setDescription(e.target.value)}
              className={classes.textArea} // Add your custom styling class if needed
            />
          </Form.Item>
          <Button
            type="primary"
            onClick={() => {
              sendMailHandler();
            }}
            loading={loading}
          >
            Send
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default EmailComposer;
