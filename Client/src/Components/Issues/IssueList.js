import React, { useState,useEffect } from "react";
import { Collapse, Row, Button,  Tooltip,message} from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

function IssueList(props) {

  useEffect(() => {
    console.log(props.issuelist);
  });
  return (
    <>
      {props.issuelist.map((issue) => {
        var utcDate = issue.createdAt; // ISO-8601 formatted date returned from server
        var localDate = new Date(utcDate);
        localDate = localDate.toString();
        let datetime = localDate.split(" ");
        const time = datetime[4].slice(0, 5);
        const date = datetime[2] + "/" + datetime[1];

        return (
          <Collapse accordion key={issue._id}>
            <Panel header={issue.subject} key={issue._id}>
              <p>
                <p style={{ fontSize: "0.8em" }}>
                  {"Issue in " + issue.eventName + " event"}
                </p>
                {issue.description}
              </p>
              <Row justify="space-between" align="bottom">
                <Button type="primary" onClick={() => {}}>
                  Solve
                </Button>
                <CopyToClipboard
                  onCopy={() => {
                    message.success("Email Id copied to clipboard");
                  }}
                  text={issue.user.email}
                >
                  <Tooltip title="Copy Email Id of User Facing this Issue">
                    <CopyOutlined />
                  </Tooltip>
                </CopyToClipboard>
                <p style={{ fontSize: "0.8em", float: "left", margin: "0" }}>
                  {time + "  " + date}
                </p>
              </Row>
            </Panel>
          </Collapse>
        );
      })}
    </>
  );
}

export default IssueList;
