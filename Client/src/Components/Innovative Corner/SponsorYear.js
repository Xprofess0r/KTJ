import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Sponsors from "./Sponsors";
import { NavLink } from "react-router-dom";
import { Col, Row } from "antd";
import classes from "./SponsorYear.module.css";
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

import axios from "../../api";
import './Overide.css'

const { TabPane } = Tabs;
export const SponsorYear = () => {

  const [sponsorYears, setsponsorYears] = useState([]);

  const fetchEventData = () => {

    axios
      .get(`/sponsors/getAllSponsors`)
      .then((result) => {

        let data = result.data.sponsors.map((sponsor) => sponsor.year);
        console.log(data)
        const uniqueYears = Array.from(new Set(data));
         uniqueYears.sort();
         uniqueYears.reverse();
        setsponsorYears(uniqueYears);

      })
      .catch((error) => {
          
      });
  };
  useEffect(() => {
    fetchEventData();
  }, []);



  return (
    <div>
      <Tabs tabPosition="left" centered="True" defaultActiveKey="1">

        {
          sponsorYears.map((year) => (
            <TabPane
              tab={
                <span>
                   {year}
                </span>
              }
              key={year}
            >
              <Sponsors fetchyear={fetchEventData} year={year}></Sponsors>
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  );
};
