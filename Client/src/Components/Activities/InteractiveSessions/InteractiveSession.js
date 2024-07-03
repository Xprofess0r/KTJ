// import React from 'react';
// import classes from './InteractiveSession.module.css'
// import Cards from './Cards'
// import ReactGa from "react-ga";
// import { useHistory } from "react-router-dom";
// import API from "../../../api";
// import { useState, useEffect } from "react";

import React from 'react';
import classes from './InteractiveSession.module.css'
import Cards from './Cards'
import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-material-ui-carousel'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';


function InteractiveSession() {
  // const [links, setlinks] = useState([]);

  // useEffect(() => {
  //   API.get("/interactive/getIU")
  //     .then((res) => setlinks(res.data.iu))
  //     .catch((err) => console.log(err));
  // }, []);
  // // google analytics
  // const google_analy = (x) => {
  //   ReactGa.event({
  //     category: "Click",
  //     action: x,
  //   });
  // };

  // // linking in div
  // const history = useHistory();
  // function handleClick(x, y) {
  //   history.push(x);
  //   google_analy(y);
  // }

  // const data = [
  //   {
  //     lk: "https://youtu.be/KR20QGNnRFI",
  //     number: 1,
  //     img: "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/IMG-20220302-WA0056.jpg?raw=true",
  //     title: "Actor's Round Table",
  //     persons: [
  //       {
  //         name: "Gopal Datt",
  //         company: "",
  //         imLink:
  //           "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/gopal%20datt.jpg?raw=true",
  //       },
  //       {
  //         name: "Parambrata Chatterjee",
  //         company: "",
  //         imLink:
  //           "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/parambrata%20chatterjee.jpg?raw=true",
  //       },
  //       {
  //         name: "Ahsaas Channa",
  //         company: "",
  //         imLink:
  //           "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/1.jpg?raw=true",
  //       },
  //     ],
  //   },
  //   {
  //     lk: "https://youtu.be/KR20QGNnRFI",
  //     number: 2,
  //     img: "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/Interactive-Sessions2-final.png?raw=true",
  //     title: "Youtuber's Round Table",
  //     persons: [
  //       {
  //         name: "Abhishek Chauhan",
  //         company: "",
  //         imLink:
  //           "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/176572.jpg?raw=true",
  //       },
  //       {
  //         name: "Abhilash Thapliyal",
  //         company: "",
  //         imLink:
  //           "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/2021_1$largeimg_2049010773.jpg?raw=true",
  //       },
  //       {
  //         name: "Apoorv Singh Karki",
  //         company: "",
  //         imLink:
  //           "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/Apoorv-Singh-Karki.jpg?raw=true",
  //       },
  //     ],
  //   },
  //   {
  //     lk: "https://youtu.be/KR20QGNnRFI",
  //     number: 3,
  //     img: "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/Interactive-Sessions3-4.png?raw=true",
  //     title: "Interactive Session",
  //     persons: [
  //       {
  //         name: "Ms. Manu Bhaker",
  //         company: "",
  //         imLink:
  //           "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/12.png?raw=true",
  //       },
  //     ],
  //   },
  // ];
  // // const getSession = () => {
  // //   API.get("/interactive")
  // //     .then((res) => {
  // //       console.log(res);
  // //     })
  // //     .catch((err) => {
  // //       console.log(err);
  // //     });
  // // };
  // // useEffect(() => {
  // //   getSession();
  // // }, []);

  // const renderer = data.map((e, i) => {
  //   return (
  //     <Cards
  //       img={e.img}
  //       persons={e.persons}
  //       title={e.title}
  //       key={i}
  //       lk={links[i] ? links[i].joiningLink : ""}
  //       number={e.number}
  //     />
  //   );
  // });

  const data = [
    // {
    //   lk: "https://youtu.be/KR20QGNnRFI",
    //   number: 1,
    //   img: "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/IMG-20220302-WA0056.jpg?raw=true",
    //   title: "Actor's Round Table",
    //   persons: [
    //     {
    //       name: "Gopal Datt",
    //       company: "",
    //       imLink:
    //         "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/gopal%20datt.jpg?raw=true",
    //     },
    //     {
    //       name: "Parambrata Chatterjee",
    //       company: "",
    //       imLink:
    //         "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/parambrata%20chatterjee.jpg?raw=true",
    //     },
    //     {
    //       name: "Ahsaas Channa",
    //       company: "",
    //       imLink:
    //         "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/1.jpg?raw=true",
    //     },
    //   ],
    // },
    //  {
    //   lk: "https://youtu.be/KR20QGNnRFI",
    //   number: 2,
    //   img: "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/Interactive-Sessions2-final.png?raw=true",
    //   title: "Youtuber's Round Table",
    //   persons: [
    //     {
    //       name: "Abhishek Chauhan",
    //       company: "",
    //       imLink:
    //         "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/176572.jpg?raw=true",
    //     },
    //     {
    //       name: "Abhilash Thapliyal",
    //       company: "",
    //       imLink:
    //         "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/2021_1$largeimg_2049010773.jpg?raw=true",
    //     },
    //     {
    //       name: "Apoorv Singh Karki",
    //       company: "",
    //       imLink:
    //         "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/Apoorv-Singh-Karki.jpg?raw=true",
    //     },
    //   ],
    // },
    // {
    //   lk: "https://youtu.be/KR20QGNnRFI",
    //   number: 3,
    //   img: "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/Interactive-Sessions3-4.png?raw=true",
    //   title: "Interactive Session",
    //   persons: [
    //     {
    //       name: "Ms. Manu Bhaker",
    //       company: "",
    //       imLink:
    //         "https://github.com/KSHITIJ-2022/media/blob/master/InteractiveSession/12.png?raw=true",
    //     },
    //   ],
    // },
   ];
  

  const renderer = data.map((e, i) => {
    return (
      <Cards
        img={e.img}
        persons={e.persons}
        title={e.title}
        key={i}
        number={e.number}
      />
    );
  });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 768 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };


  return (
    <>
      <div className={classes.container}>
        <div className={classes.Nscroll}>
          <div className={classes.Heading}>INTERACTIVE SESSIONS</div>
            <Carousel
             responsive={responsive}
             infinite={true}
             focusOnSelect
             autoPlay
             autoPlaySpeed={6000}
             animation={"slide"}
             indicators={false}
             NextIcon={<ArrowForwardIosTwoToneIcon />}
             PrevIcon={<ArrowBackIosTwoToneIcon />}
             navButtonsAlwaysVisible={true}
             navButtonsProps={{     
               style: {
                 backgroundColor: 'transparent',
                 color: '#f6ffae',
                 transform:'scale(1.5)',
                 borderRadius: 0
               }
              }}
            >
              {renderer} 
            </Carousel> 
        </div>
      </div>
    </>
  );
}

export default InteractiveSession;
