import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";
import { Tooltip } from 'antd';


function DownloadCsv(props) {
 
    return (
      <CSVLink
        filename={props.filename || "Emails.csv"}
        data={props.data}
        headers={props.headers}
      >
        <Tooltip title={props.title}>
          <DownloadOutlined />
        </Tooltip>
      </CSVLink>
    );
    return <></>
}

export default DownloadCsv;
