import React from "react";
import { useSelector } from 'react-redux'
import { Tabs} from 'antd';

const { TabPane } = Tabs;
import Table from './Table.jsx'
function ActiveUsers() {

    const auth = useSelector((state) => state.auth)
    const usertype = auth.isAuthenticated?auth.user.userType:""


    return (
        <>
            <div>
                <Tabs tabPosition="left" centered="True" defaultActiveKey="1">
                    {
                         usertype == "superAdmin" ?
                            (
                                <TabPane
                                    style={{ height: "40vh !important" }}
                                    tab={
                                        <span style={{ marginTop: '20px', paddingTop: '50px', paddingBottom: '50px', height: '40vh !important' }}>
                                            SuperAdmins
                                        </span>
                                    }
                                    key="SuperAdmins"
                                >

                                    <Table userType="superAdmin" />

                                </TabPane>
                            ) : ""
                    }
                    <TabPane
                        tab={
                            <span>
                                Admins
                            </span>
                        }
                        key="Admins"
                    >
                        <Table userType="admin" />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                Normal
                            </span>
                        }
                        key="Normal Users"
                    >

                        <Table userType="normal" />

                    </TabPane>
                </Tabs>
            </div>


        </>
    )
}

export default ActiveUsers
