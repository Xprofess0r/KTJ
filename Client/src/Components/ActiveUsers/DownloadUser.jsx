import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";
import { Tooltip, Col, Button, } from 'antd';


function DownloadUser(props) {

  return (
    <CSVLink
      filename={props.filename?props.filename:"users.csv"}
      data={props.data}
      headers={[
        { label: "KTJ-ID", key: "ktjID" },
        { label: "Name", key: "username" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" },
        { label: "Gender", key: "gender" },
        { label: "College", key: "college" },
        { label: "Department", key: "department" },
        { label: "City", key: "city" },
        { label: "State", key: "state" },
      ]}
    >
      <Tooltip title={props.title}>
        <span style={{ marginLeft: "4px" }}>
          <DownloadOutlined />
        </span>
      </Tooltip>
    </CSVLink>
  );
}

export default DownloadUser