import { Menu, Button } from "antd";
import React from "react";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MonitorOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
  AliwangwangOutlined,
  BarsOutlined,
  SolutionOutlined,
  UserOutlined,
  BarChartOutlined,
  BorderOuterOutlined,
  ScheduleOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;

import { connect } from "react-redux";

class Drawer extends React.Component {
  state = {
    collapsed: false,
  };



  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {

    console.log(this.props.auth.isAuthenticated);

    return (
      <div>
        <Menu
          style={{ height: "100vh" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light "
          inlineCollapsed={this.state.collapsed}
        >
          <Button
            type="primary"
            onClick={this.toggleCollapsed}
            style={{ width: "100%" }}
          >
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
          </Button>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to="/admin-panelktj2024/dashboard">Dashboard</NavLink>
          </Menu.Item>

          {/* <Menu.Item key="2" icon={<SolutionOutlined />}>
            <NavLink to="/admin-panelktj2024/events">Events</NavLink>
          </Menu.Item> */}
          <Menu.Item key="3" icon={<TrophyOutlined />}>
            <NavLink to="/admin-panelktj2024/competitions">
              Competitions
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item key="4" icon={<UserOutlined />}>
            <NavLink to="/admin-panelktj2024/guestlectures">
              Guestlectures
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<BarsOutlined />}>
            <NavLink to="/admin-panelktj2024/Navbar">Navbar</NavLink>
          </Menu.Item> */}
          <Menu.Item key="6" icon={<UsergroupAddOutlined />}>
            <NavLink to="/admin-panelktj2024/sponsors">Sponsors</NavLink>
          </Menu.Item>
          {/* <Menu.Item key="7" icon={<DesktopOutlined />}>
            <NavLink to="/admin-panelktj2024/games">Games</NavLink>
          </Menu.Item> */}
          <Menu.Item key="8" icon={<AliwangwangOutlined />}>
            <NavLink to="/admin-panelktj2024/users">Active users</NavLink>
          </Menu.Item>
          <Menu.Item icon={<MonitorOutlined /> }>  {/* key needs to be entered here*/}
            <NavLink to="/admin-panelktj2024/payments">Payments</NavLink>
          </Menu.Item>
          <Menu.Item key="9" icon={<BarChartOutlined />}>
            <NavLink to="/admin-panelktj2024/workshop">Workshops</NavLink>
          </Menu.Item>

          {this.props.auth?.user.userType == "superAdmin" ? (
            <Menu.Item key="10" icon={<MailOutlined />}>
              <NavLink to="/admin-panelktj2024/emails">Emails</NavLink>
            </Menu.Item>
          ) : (
            ""
          )}

          <Menu.Item key="12" icon={<BorderOuterOutlined />}>
            <NavLink to="/admin-panelktj2024/customUrls">CustomUrls</NavLink>
          </Menu.Item>
          <Menu.Item key="14" icon={<ScheduleOutlined />}>
            <NavLink to="/admin-panelktj2024/schedule">Schedules</NavLink>
          </Menu.Item>
          <Menu.Item key="15" icon={<ThunderboltOutlined />}>
            <NavLink to="/admin-panelktj2024/games">Gamefest</NavLink>
          </Menu.Item>

          <Menu.Item key="16" icon={<ThunderboltOutlined />}>
            <NavLink to="/admin-panelktj2024/guestLectures">
              Guest Lectures
            </NavLink>
          </Menu.Item>
          <Menu.Item key="17" icon={<ThunderboltOutlined />}>
            <NavLink to="/admin-panelktj2024/interactive">
              Interactive Sessions
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};


export default connect(mapStateToProps, {})(Drawer);