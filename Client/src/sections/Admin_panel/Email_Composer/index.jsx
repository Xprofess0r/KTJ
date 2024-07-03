import React, { useState } from "react";
import { Button, Form, Input, message ,Row} from "antd";
import axios from "../../../api";
import classes from "./index";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Loader from "../../Loader/index";

const EmailComposer = (props) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mailForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const sendMailHandler = () => {
    let list = [];
    props.users.forEach((user) => {
      list.push(user.email);
    });
    // list = ["chiteshbansal111@gmail.com"];
    if (list.length == 0) {
      message.error("No users to Send Mail");
      return;
    }
    if (subject.trim().length == 0) {
      message.error("Enter Subject of the Email");
      return;
    } else if (description == "<p></p>\n" || description.length == 0) {
      message.error("Description is Empty");
      return;
    }
    console.log("des", description);
    setLoading(true);
    axios
      .post("/email/sendMail", {
        // users: ["chiteshbansal111@gmail.com"],
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
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  return (
    <>
    <Row style={{padding:"1em"}}>
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
          name="email"
          rules={[{ required: true, message: "Email field is empty" }]}
        >
          <Editor
            editorState={editorState}
            toolbarClassName={classes.toolbarClassName}
            wrapperClassName={classes.wrapperClassName}
            editorClassName={classes.editorClassName}
            onEditorStateChange={onEditorStateChange}
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
