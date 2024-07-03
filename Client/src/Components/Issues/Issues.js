import React from "react";
import "./IssuesStyles.css";
import { Tabs } from "antd";
import IssueList from "./IssueList";
import UserQuery from "../UserQuery/UserQuery";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;
function Issues(props) {
  const user = useSelector((state) => state.auth.user);
  function displayIssues() {
    // console.log(props.issues)
    document.getElementsByClassName("hw-issues-outer")[0].style.display =
      "flex";
    document.getElementsByClassName("issues-icon")[0].style.display = "none";
  }
  function hideIssues() {
    document.getElementsByClassName("hw-issues-outer")[0].style.display =
      "none";
    document.getElementsByClassName("issues-icon")[0].style.display = "flex";
  }
  var activeIssues = props.issues.filter((issue) => {
    return !issue.status;
  });
  var closedIssues = props.issues.filter((issue) => {
    return issue.status;
  });
  return (
    <>
      <div className="hw-issues-outer" style={{ display: "none" }}>
        <div className="issues-header">
          <h3 style={{ margin: "0px" }}>
            {user.userType == "normal"
              ? "Raise an Issue"
              : "Issues To Address By You"}
          </h3>
          <div className="hideIconOuter" style={{ height: "100%" }}>
            <i
              className="fas fa-chevron-down hideIssuesIcon"
              onClick={hideIssues}
            ></i>
          </div>
        </div>
        <div className="issues-body">
          <Tabs defaultActiveKey="create">
            {user.userType == "normal" ? (
              <TabPane
                tab={
                  <span style={{ padding: "20px" }}>
                    <i
                      class="fas fa-plus"
                      style={{ marginRight: "10px", color: "blue" }}
                    ></i>
                    Create
                  </span>
                }
                key="create"
              >
                <UserQuery />
              </TabPane>
            ) : null}
            <TabPane
              tab={
                <span style={{ padding: "20px" }}>
                  <i
                    class="fab fa-creative-commons-sampling"
                    style={{ marginRight: "10px", color: "red" }}
                  ></i>
                  Active
                </span>
              }
              key="active"
            >
              <IssueList issuelist={activeIssues} />
            </TabPane>
            <TabPane
              tab={
                <span style={{ padding: "20px" }}>
                  <i
                    class="fas fa-check"
                    style={{ marginRight: "10px", color: "green" }}
                  ></i>
                  Solved
                </span>
              }
              key="solved"
            >
              <IssueList issuelist={closedIssues} />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="issues-icon" onClick={displayIssues}>
        <i class="fas fa-exclamation"></i>
      </div>
    </>
  );
}

export default Issues;
