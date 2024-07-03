import React from 'react';
import classes from './SummitsNew.module.css'
import Cards from './Cards'
import ReactGa from "react-ga";
import { useHistory } from "react-router-dom";

function Summits() {
    
  // google analytics 
  const google_analy = (x) => {
    ReactGa.event({
      category: "Click",
      action: x,
    });
  }

  // linking in div 
  const history = useHistory();
  function handleClick(x , y) {
    history.push(x);
    google_analy(y);
  }

    const data = [
      // {
      //   lk: "https://youtu.be/KR20QGNnRFI",
      //   img: "https://github.com/KSHITIJ-2022/media/blob/master/Events/d1.png?raw=true",
      //   title:
      //     "Topic: Artificial Intelligence, Machine Learning, and Internet of Things",
      //   persons: [
      //     {
      //       name: "Ankush Raina",
      //       company: "Vice President, Battery Pack Development",
      //       imLink:
      //         "https://i.imgur.com/6VR8egV.png",
      //     },
      //     {
      //       name: "Manoj Biswas",
      //       company: "Partner Software Architect at Microsoft Corporation",
      //       imLink:
      //         "https://i.imgur.com/EVGNf9u.jpg",
      //     },
      //     {
      //       name: "Puneet Singh Bhatia",
      //       company: " Senior Director R&D, Axtria",
      //       imLink:
      //         "https://i.imgur.com/EyHTupj.jpg",
      //     },
      //     {
      //       name: "Mukesh Jain",
      //       company:
      //         "CTO and Global Head of Innovation for Insights and Data, Capgemini",
      //       imLink:
      //         "https://i.imgur.com/XPdKOkw.jpg",
      //     },
      //     {
      //       name: "Soumanil Mhukherjee",
      //       company: " 15+ years of working with Industries and Government Ecosystems in Market Research, Brand Management, Media Planning, Advertising, Content Writing, Product Marketing, and Business Development",
      //       imLink:
      //         "https://i.imgur.com/Q0Edrki.jpg",
      //     },
      //   ],
      // },
      // {
      //   lk: "https://youtu.be/RfTpXUbCyT8",
      //   img: "https://github.com/KSHITIJ-2022/media/blob/master/Events/d2.png?raw=true",
      //   title:
      //     "Topic: Entrepreneurship, Product Management, Investment, and Marketing",
      //   persons: [
      //     {
      //       name: "Gaurav Dadhich",
      //       company: "Director of Product Management & General Manager - Magic at Razorpay",
      //       imLink:
      //         "https://i.imgur.com/PeAn3Jo.jpg",
      //     },
      //     {
      //       name: "Manan Shah",
      //       company:
      //         " 18 years of experience in Marketing and Communications",
      //       imLink:
      //         "https://i.imgur.com/rvFBQLa.jpg",
      //     },
      //     {
      //       name: "Priya k Murthy",
      //       company: "Associate Director- Enterprise Business and Global Accounts Lead",
      //       imLink:
      //         "https://i.imgur.com/t5KbryO.jpg",
      //     },
      //     {
      //       name: "Sachin S Panicker,",
      //       company: "VP Product Engineering, Fulcrum Digital",
      //       imLink:
      //         "https://i.imgur.com/8aRHbbu.jpg",
      //     },
      //     {
      //       name: "Vishal Pal Choudhary",
      //       company: "CTO for JioMart Marketplace",
      //       imLink:
      //         "https://i.imgur.com/Xb9wYrj.jpg",
      //     },
      //   ],
      // },
    ];

    const renderer = data.map((e, i) => {
        return <Cards img={e.img}  persons={e.persons} title={e.title} key={i} lk={e.lk}/>
    })

    return (
      <>
        <div className={classes.SPage}>
        <div className={classes.Nscroll}>
          <div className={classes.Heading}>SUMMITS</div>
          {renderer}
        </div>
        </div>
      </>
    );
}

export default Summits;
