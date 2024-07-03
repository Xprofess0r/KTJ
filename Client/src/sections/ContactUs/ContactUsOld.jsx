import classes from "./ContactUs.module.css";
import { useState } from "react";
// import Carousel from "react-grid-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import new_styled from "styled-components";
const ContactUs = () => {
  var settings = {
    rows: 1,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    className: classes.carousel,
    speed: 500,

    // initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const web = [
    {
      name: "Sarvan Kumar Singh",
      email: "sarvan.tech17@gmail.com",
      linkedin: "http://www.linkedin.com/in/sarvantech17/",
      facebook: "https://www.instagram.com/sravansingh1709/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/Qxfdk5x4/PSX-20231114-160949.jpg",
    },
    {
      name: "Chaitanya Srinivas Dommeti",
      email: "chaitanyads127@gmail.com",
      linkedin: "https://www.linkedin.com/in/chaitanya-srinivas-41559323b/",
      facebook: "https://www.instagram.com/chaitanyads127/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/02SYSWqp/chaitu-Srinu.jpg",
    },
    {
      name: "Greesh Raj Patairiya",
      email: "greeshraj234@gmail.com",

      linkedin: "https://in.linkedin.com/in/greeshraj/",
      facebook: "https://www.facebook.com/greeshraj.patairiya.319/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/c4X5PWDF/greesh.jpg",
    },
    {
      name: "Lemon Swargiary",
      email: "lemon10swargiary@gmail.com",

      linkedin: "https://www.linkedin.com/in/lemon-swargiary-54711b248/",
      facebook: "https://www.facebook.com/profile.php?id=100078104600152/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/Zn0R4JGz/lemon.jpg",
    },
    {
      name: "Bhanu Pratap",
      email: "bhanu0312pratap@gmail.com",
      linkedin: "https://www.linkedin.com/in/bhanu-pratap1/",
      facebook: "https://www.facebook.com/profile.php?id=100073575444854/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/vT6vDwnC/bhanupratap.jpg",
    },
    {
      name: "Abhishek",
      email: "rajput9997647419@gmail.com",
      linkedin: "https://www.linkedin.com/in/abhishek-rajput-b349b9234/",
      facebook: "https://www.facebook.com/profile.php?id=100010560395109/",
      post: "Tech Team Head",
      image:
        "https://i.postimg.cc/PJYrxnGF/Screenshot-2023-12-07-at-2-04-12-PM-1.png",
    },
  ];

  const design = [
    {
      name: "Vishwas Jajpura",
      email: "",

      linkedin:
        "https://www.linkedin.com/in/vishwas-jajpura-1a9880223?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app/",
      facebook:
        "https://instagram.com/jajpuravishwas?igshid=YTQwZjQ0NmI0OA%3D%3D&utm_source=qr/",
      post: "Design and media Head",
      image: "https://i.postimg.cc/XYGRBWpL/vishwas.jpg",
    },
    {
      name: "Aditya Raj",
      email: "",

      linkedin: "https://www.linkedin.com/in/aditya-raj-iitkgp/",
      facebook: "https://www.facebook.com/profile.php?id=100014804745112/",
      post: "Design and media Head",
      image: "https://i.postimg.cc/TwN8W3qk/adityaraj.jpg",
    },
    {
      name: "Sonia Bara",
      email: "",

      linkedin: "https://www.linkedin.com/in/sonia-bara-b6931a234/",
      facebook: "https://instagram.com/sonia__bara?igshid=OGQ5ZDc2ODk2ZA==/",
      post: "Design and media Head",
      image: "",
    },
    {
      name: "Tushar Kumar",
      email: "",

      linkedin: "https://www.linkedin.com/in/tushar-kumar-33a932146/",
      facebook: "https://www.instagram.com/_snapshot_oo7/",
      post: "Design and media Head",
      image: "",
    },
    {
      name: "Atishay Jain",
      email: "",

      linkedin:
        "https://www.linkedin.com/in/atishay-jain-53aa06231?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      facebook: "https://instagram.com/___atishayjain?igshid=YTQwZjQ0NmI0OA==",
      post: "Design and media Head",
      image: "",
    },
    {
      name: "Sumedh Deshkar",
      email: "",

      linkedin: "https://www.linkedin.com/in/deshkar/",
      facebook: "https://www.instagram.com/sumedh_deshkar/",
      post: "Design and media Head",
      image: "https://i.postimg.cc/KzDP91sN/sumedh.jpg",
    },
    {
      name: "Hritiwik Raj",
      email: "",

      linkedin: "https://www.linkedin.com/in/hritwik-raj/",
      facebook: "https://www.instagram.com/ring0_bell/",
      post: "Design and media Head",
      image: "",
    },
    {
      name: "Jeevan kumar Thummalapelli",
      email: "",

      linkedin:
        "https://www.linkedin.com/in/thummalapelli-jeevan-kumar-32464b254/",
      facebook: "https://www.instagram.com/jeevan_kumar179/",
      post: "Design and media Head",
      image: "",
    },
  ];

  const coredata = [
    {
      name: "Aditya Kumar",
      email: "aditya.kumar@ktj.in",
      post: "events head",
      facebook: "https://www.facebook.com/profile.php?id=100075716836389",
      linkedin: "https://www.linkedin.com/in/aditya-kumar-b7b79b22b/",
      "Twitter/X": "https://twitter.com/Aditya_K_2810",
      image: "https://i.postimg.cc/DfqpsYgx/Aditya-Kumar.jpg",
    },
    {
      name: "Debjyoti Maji",
      email: "Debjyoti.Maji@ktj.in",
      post: "Events head",
      facebook: "https://www.facebook.com/debjyoti.maji.167?mibextid=ZbWKwL",
      linkedin: "https://www.linkedin.com/in/majidebjyoti108",
      "Twitter/X": "https://twitter.com/_i_am_debjyoti?s=09",
      image: "https://i.postimg.cc/fLHLgv7p/Debjyoti-Maji.jpg",
    },
    {
      name: "Hemant Kumar",
      email: "hemant.kumar@ktj.in",
      post: "Events Head",
      facebook: "https://www.facebook.com/profile.php?id=100045774070798",
      linkedin: "https://www.linkedin.com/in/hemant-kumar-5036ba22b/",
      "Twitter/X": "https://twitter.com/HK24211",
      image: "https://i.postimg.cc/vTrQwL5G/Hemant-Kumar.jpg",
    },
    {
      name: "Pratap Kodate",
      email: "pratap.kodate@ktj.in",
      post: "publicity and media Head",
      facebook:
        "https://www.facebook.com/profile.php?id=100075473537939&mibextid=ZbWKwL",
      linkedin: "https://www.linkedin.com/in/pratap-kodate-b3b05b230/",
      "Twitter/X": "https://twitter.com/PratapKodate",
      image: "https://i.postimg.cc/fW7cKVPN/Pratap-Kodate.jpg",
    },
    {
      name: "Rupesh Raj",
      email: "rupesh.raj@ktj.in",
      post: "publicity and media head",
      facebook: "https://www.facebook.com/profile.php?id=100016035738584",
      linkedin: "https://www.linkedin.com/in/saurabh-suman-ba61b8223",
      "Twitter/X": "https://mobile.twitter.com/Saurabh_17_oct",
      image: "https://i.postimg.cc/NFMYn9Q0/Rupesh-Raj.jpg",
    },
    {
      name: "Aditya Bhatia",
      email: "aditya.bhatia@ktj.in",
      post: "sponsorship head",
      facebook: "https://www.instagram.com/aditya.bhatia2021/",
      linkedin: "https://www.linkedin.com/in/aditya-bhatia-6161541aa",
      image: "https://i.postimg.cc/8cHGskcv/Aditya-bhatia.jpg",
    },
    {
      name: "Qureshi Shoaib",
      email: "qureshi.shoaib@ktj.in",
      post: "sponsorship head",
      facebook: "https://www.facebook.com/qureshi.shoaib.505",
      linkedin: "https://www.linkedin.com/in/qureshi-shoaib/",
      "Twitter/X":
        "https://twitter.com/qureshi1604?t=TD0r01TwO93fnXgLkClhTA&s=09",
      image: "https://i.postimg.cc/NGyzdkcH/Qureshi-Shoiab.jpg",
    },
    {
      name: "Prakhar Lohumi",
      email: "prakhar.lohumi@ktj.in",
      post: "sponsorship Head",
      facebook: "https://www.facebook.com/profile.php?id=100075092241043",
      linkedin: "https://www.linkedin.com/in/prakhar-lohumi-03701622b",
      "Twitter/X": "https://twitter.com/prakharlohumi_",
      image: "https://i.postimg.cc/L59PJT28/Prakhar.jpg",
    },
    {
      name: "Rashmita Sahoo",
      email: "rashmita.sahoo@ktj.in",
      post: "sponsorship head",
      facebook: "https://www.facebook.com/swetalina.sahoo.5661/",
      linkedin: "https://www.linkedin.com/in/qureshi-shoaib/",
      "Twitter/X": "https://twitter.com/Rashmi29092002",
      image: "https://i.postimg.cc/J7qGdZ5R/Rashmita.jpg",
    },
    {
      name: "Gali Siva Sai Ram ",
      email: "siva.gali@ktj.in",
      post: "Sponsorship Head",
      facebook:
        "https://www.facebook.com/profile.php?id=100008493647818&mibextid=LQQJ4d",
      linkedin: "https://www.linkedin.com/in/siva-sai-ram-gali-8682b1245/",
      "Twitter/X": "https://twitter.com/sivasairam2003",
      image: "https://i.postimg.cc/BQzDM2JX/Siva-gali.jpg",
    },
    {
      name: "Digvijay Singh",
      email: "Digvijay.Singh@ktj.in",
      post: "Executive Head",
      facebook: "https://www.facebook.com/debjyoti.maji.167?mibextid=ZbWKwL",
      linkedin: "https://www.linkedin.com/in/digvijay-singh-b95936231/",
      "Twitter/X":
        "https://twitter.com/Digvija93354533?t=vYggyAUJyMHvzIxskaFyqg&s=08",
      image: "https://i.postimg.cc/j5jqN7VX/Digvijay-Sigh.jpg",
    },
    {
      name: "Vinayak Agarwal",
      email: "vinayak.agarwal@ktj.in",
      post: "executive  head",
      facebook: "https://www.facebook.com/411vinayak",
      linkedin: "https://www.linkedin.com/in/vinayak-agarwal-11759222a",
      "Twitter/X": "https://twitter.com/Vinayak_A03",
      image: "https://i.postimg.cc/0yfzhmsY/Vinayak-Agarwal.jpg",
    },
    {
      name: "Ayush Kumar",
      email: "ayush.kumar@ktj.in",
      post: "Finance head",
      facebook: "https://www.facebook.com/profile.php?id=100075999341977",
      linkedin: "https://www.linkedin.com/in/ayush-kumar-928a97209/",
      "Twitter/X":
        "https://twitter.com/ayushk_2106?t=sSPykKwcltZ9hbXSwPgbcg&s=09",
      image: "https://i.postimg.cc/jj74TL3M/Ayush.jpg",
    },
    {
      name: "Priyanshu Garg",
      email: "priyanshu.garg@ktj.in",
      post: "Finance Head",
      facebook:
        "https://www.facebook.com/profile.php?id=100007954007294&mibextid=ZbWKwL",
      linkedin: "https://www.linkedin.com/in/priyanshuvwxyz",
      "Twitter/X": "https://twitter.com/priyanshuvwxyz",
      image: "https://i.postimg.cc/KvD4wL7Z/Priyanshu-Garg.jpg",
    },
  ];

  const [isEnlarged_tech, setIsEnlarged_tech] = useState(false);
  const [isShrink_tech, setIsShrink_tech] = useState(false);
  const [isEnlarged_core, setIsEnlarged_core] = useState(false);
  const [isEnlarged_design, setIsEnlarged_design] = useState(false);
  const [isShrink_design, setIsShrink_design] = useState(false);
  const [isShrink_core, setIsShrink_core] = useState(false);
  const [isFlexboxScaled, setIsFlexboxScaled] = useState(false);
  const [isNewDivVisible, setIsNewDivVisible] = useState(false);
  const [data, setIsData] = useState("");
  const [heading_tech, setIsHeading_tech] = useState(true);
  const [heading_core, setIsHeading_core] = useState(true);
  const [heading_design, setIsHeading_design] = useState(true);
  const [carousel_content, setCarousel_content] = useState("");
  const handleImageClick_design = () => {
    setIsEnlarged_core(false);
    setIsEnlarged_tech(false);
    setIsEnlarged_design(true);

    setIsShrink_tech(true);
    setIsShrink_core(true);
    setIsFlexboxScaled(true);
    setIsNewDivVisible(true);
    setIsHeading_design(false);
    setIsHeading_core(true);
    setIsHeading_tech(true);
    setCarousel_content("DESIGN");
    setIsData("design");
  };

  // const handleImageClick_design = () => {
  //     setIsEnlarged_design(!isEnlarged_design);
  //   };
  const handleImageClick_tech = () => {
    setIsEnlarged_core(false);
    setIsEnlarged_design(false);
    setIsEnlarged_tech(true);

    setIsShrink_design(true);
    setIsShrink_core(true);
    setIsFlexboxScaled(true);
    setIsNewDivVisible(true);
    setIsHeading_design(true);
    setIsHeading_tech(false);
    setIsHeading_core(true);
    setCarousel_content("TECH");
    setIsData("tech");
  };
  const handleImageClick_core = () => {
    setIsEnlarged_design(false);
    setIsEnlarged_tech(false);
    setIsEnlarged_core(true);

    setIsShrink_tech(true);
    setIsShrink_design(true);
    setIsFlexboxScaled(true);
    setIsNewDivVisible(true);
    setIsHeading_core(false);
    setIsHeading_tech(true);
    setIsHeading_design(true);
    setCarousel_content("CORE");
    setIsData("core");
  };
  //states for mobile version 
  const[core_mobile,setIsCore_Mobile] = useState(false);
  const[tech_mobile,setIsTech_Mobile] = useState(false);
  const[design_mobile,setIsDesign_Mobile] = useState(false);
  const[newDiv_mobile,setIsNewDiv_mobile]=useState(false);
  const handleImageClick_core_mobile=()=>{
    setIsCore_Mobile(true);
    setIsDesign_Mobile(false);
    setIsTech_Mobile(false);
    setIsNewDiv_mobile(true);
    setIsData("core");
    isBackClicked(false);
  }
  const handleImageClick_tech_mobile=()=>{
    setIsCore_Mobile(false);
    setIsDesign_Mobile(false);
    setIsTech_Mobile(true);
    setIsNewDiv_mobile(true);
    setIsData("tech");
    isBackClicked(false);
  }
  const handleImageClick_design_mobile=()=>{
    setIsCore_Mobile(false);
    setIsDesign_Mobile(true);
    setIsTech_Mobile(false);
    setIsNewDiv_mobile(true);
    isBackClicked(false);
    setIsData("design");
  }
  const [backclicked,isBackClicked] = useState(false);
  const handleBack=()=>{
    setIsCore_Mobile(false);
    setIsDesign_Mobile(false);
    setIsTech_Mobile(false);
    isBackClicked(true);
    setIsNewDiv_mobile(false);
    data("");
  }

  return (
    <>
      {/* flex box for teams */}
      <div className={classes.container}>
        <div
          className={`${classes.team_flex} ${
            isFlexboxScaled ? classes.scaled : ""
          }`}
        >
          {/* div for tech */}
          <div className={classes.team}>
            <img
              src="https://i.postimg.cc/sX7FVX8C/logo-tech-team-1.png"
              className={
                isEnlarged_tech
                  ? classes.enlarged
                  : isShrink_tech
                  ? classes.shrink
                  : ""
              }
              onClick={handleImageClick_tech}
            ></img>
            <div
              className={
                heading_tech && isFlexboxScaled
                  ? classes.shrink_heading
                  : !isFlexboxScaled
                  ? classes.heading_img
                  : classes.block
              }
            >
              <img
                src="https://i.postimg.cc/NM4yPg4B/logo-tech-team.png"
                onClick={handleImageClick_tech}
              ></img>
            </div>
          </div>

          {/* div for core */}
          <div className={classes.team}>
            <img
              src="https://i.postimg.cc/Cxt9kSCr/logo-core.png"
              className={
                isEnlarged_core
                  ? classes.enlarged
                  : isShrink_core
                  ? classes.shrink
                  : ""
              }
              onClick={handleImageClick_core}
            ></img>
            <div
              className={
                heading_core && isFlexboxScaled
                  ? classes.shrink_heading
                  : !isFlexboxScaled
                  ? classes.heading_img
                  : classes.block
              }
            >
              <img
                src="https://i.postimg.cc/Y0vW4567/logo-core-1.png"
                onClick={handleImageClick_core}
              ></img>
            </div>
          </div>

          {/* div for design */}
          <div className={classes.team}>
            <img
              src="https://i.postimg.cc/8kM27mVC/logo-design-team-1.png"
              className={
                isEnlarged_design
                  ? classes.enlarged
                  : isShrink_design
                  ? classes.shrink
                  : ""
              }
              onClick={handleImageClick_design}
            ></img>
            <div
              className={
                heading_design && isFlexboxScaled
                  ? classes.shrink_heading
                  : !isFlexboxScaled
                  ? classes.heading_img
                  : classes.block
              }
            >
              <img src="https://i.postimg.cc/tCCXz3w1/logo-design-team.png"></img>
            </div>
          </div>
        </div>

        {/* carousel */}
        {isNewDivVisible && (
          <div className={classes.newDiv}>
            <div className={classes.carousel_heading}>
              {carousel_content} TEAM
            </div>
            {data === "tech" && (
              <Slider {...settings}>
                {web.map((data) => (
                  <div key={data.id} className={classes.Carouselcontainer}>
                    <div className={classes.socialmedia}>
                      <a href={data.linkedin}>
                        <i
                          className={`bi bi-linkedin ${classes.linkedinicon}`}
                        ></i>
                      </a>
                      <a href={data.facebook}>
                        <i
                          className={`bi bi-instagram ${classes.facebookicon}`}
                        ></i>
                      </a>
                      <a href={data.email}>
                        <i
                          className={`bi bi-envelope-fill ${classes.emailicon}`}
                        ></i>
                      </a>
                    </div>
                    <div className={classes.info}>
                      <div className={classes.info_img}>
                        <img src={data.image} alt={data.name} />
                      </div>
                      <div className={classes.info_name}>{data.name}</div>
                      <div className={classes.designation}>{data.post}</div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}

            {data === "design" && (
              <Slider {...settings}>
                {design.map((data) => (
                  <div key={data.id} className={classes.Carouselcontainer}>
                    <div className={classes.socialmedia}>
                      <a href={data.linkedin}>
                        <i
                          className={`bi bi-linkedin ${classes.linkedinicon}`}
                        ></i>
                      </a>
                      <a href={data.facebook}>
                        <i
                          className={`bi bi-instagram ${classes.facebookicon}`}
                        ></i>
                      </a>
                      <a href={data.email}>
                        <i
                          className={`bi bi-envelope-fill ${classes.emailicon}`}
                        ></i>
                      </a>
                    </div>
                    <div className={classes.info}>
                      <div className={classes.info_img}>
                        <img src={data.image} alt={data.name} />
                      </div>
                      <div className={classes.info_name}>{data.name}</div>
                      <div className={classes.designation}>{data.post}</div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}

            {data === "core" && (
              <Slider {...settings}>
                {coredata.map((data) => (
                  <div key={data.id} className={classes.Carouselcontainer}>
                    <div className={classes.socialmedia}>
                      <a href={data.linkedin}>
                        <i
                          className={`bi bi-linkedin ${classes.linkedinicon}`}
                        ></i>
                      </a>
                      <a href={data.facebook}>
                        <i
                          className={`bi bi-instagram ${classes.facebookicon}`}
                        ></i>
                      </a>
                      <a href={data.email}>
                        <i
                          className={`bi bi-envelope-fill ${classes.emailicon}`}
                        ></i>
                      </a>
                    </div>
                    <div className={classes.info}>
                      <div className={classes.info_img}>
                        <img src={data.image} alt={data.name} />
                      </div>
                      <div className={classes.info_name}>{data.name}</div>
                      <div className={classes.designation}>{data.post}</div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        )}
      

      {/* mobile version  */}
      <div className={classes.mobile}>
        <div className={core_mobile||tech_mobile||design_mobile?classes.hide:classes.team_flex_mobile}
        >
          {/* div for tech */}
          <div className={classes.team}>
            <img
              src="https://i.postimg.cc/sX7FVX8C/logo-tech-team-1.png"
              className={core_mobile||tech_mobile||design_mobile?classes.hide:classes.logo_img}
              onClick={handleImageClick_tech_mobile}
            ></img>
            <div
              className={core_mobile||tech_mobile||design_mobile?classes.hide:classes.logo_img}
            >
              <img
                src="https://i.postimg.cc/NM4yPg4B/logo-tech-team.png"
                onClick={handleImageClick_tech_mobile}
              ></img>
            </div>
          </div>

          {/* div for core */}
          <div className={classes.team}>
            <img
              src="https://i.postimg.cc/Cxt9kSCr/logo-core.png"
              className={core_mobile||tech_mobile||design_mobile?classes.hide:classes.logo_img
              }
              onClick={handleImageClick_core_mobile}
            ></img>
            <div
              className={core_mobile||tech_mobile||design_mobile?classes.hide:classes.logo_img
              }
            >
              <img
                src="https://i.postimg.cc/Y0vW4567/logo-core-1.png"
                onClick={handleImageClick_core_mobile}
              ></img>
            </div>
          </div>

          {/* div for design */}
          <div className={classes.team}>
            <img
              src="https://i.postimg.cc/8kM27mVC/logo-design-team-1.png"
              className={core_mobile||tech_mobile||design_mobile?classes.hide:classes.logo_img}
              onClick={handleImageClick_design_mobile}
            ></img>
            <div
              className={core_mobile||tech_mobile||design_mobile?classes.hide:classes.logo_img}
            >
              <img src="https://i.postimg.cc/tCCXz3w1/logo-design-team.png"></img>
            </div>
          </div>
        </div>
        {newDiv_mobile && (
  <div className={isBackClicked?classes.newDiv_mobile:classes.hide}>
    <div className={classes.team_head_mobile}>
      {data} TEAM
    </div>
    {data === "core" && coredata.map((item) => (
      <div className={classes.mobile_info} key={item.id}>
        <div className={classes.socialmedia_mobile}>
        <a href={item.linkedin}>
                        <i
                          className={`bi bi-linkedin ${classes.linkedinicon}`}
                        ></i>
                      </a>
                      <a href={item.facebook}>
                        <i
                          className={`bi bi-instagram ${classes.facebookicon}`}
                        ></i>
                      </a>
                      <a href={item.email}>
                        <i
                          className={`bi bi-envelope-fill ${classes.emailicon}`}
                        ></i>
                      </a>
        </div>
        <div className={classes.info_mobile}>
          <div className={classes.info_img}>
            <img src={item.image} alt={item.name} />
          </div>
          <div className={classes.info_name}>{item.name}</div>
          <div className={classes.designation}>{item.post}</div>
        </div>

        
      </div>
    ))}
      {data === "design" && design.map((item) => (
      <div className={classes.mobile_info} key={item.id}>
            <div className={classes.socialmedia_mobile}>
        <a href={item.linkedin}>
                        <i
                          className={`bi bi-linkedin ${classes.linkedinicon}`}
                        ></i>
                      </a>
                      <a href={item.facebook}>
                        <i
                          className={`bi bi-instagram ${classes.facebookicon}`}
                        ></i>
                      </a>
                      <a href={item.email}>
                        <i
                          className={`bi bi-envelope-fill ${classes.emailicon}`}
                        ></i>
                      </a>
        </div>
        <div className={classes.info_mobile}>
          <div className={classes.info_img}>
            <img src={item.image} alt={item.name} />
          </div>
          <div className={classes.info_name}>{item.name}</div>
          <div className={classes.designation}>{item.post}</div>
        </div>

    
      </div>
    ))}
      {data === "tech" && web.map((item) => (
      <div className={classes.mobile_info} key={item.id}>
         <div className={classes.socialmedia_mobile}>
        <a href={item.linkedin}>
                        <i
                          className={`bi bi-linkedin ${classes.linkedinicon}`}
                        ></i>
                      </a>
                      <a href={item.facebook}>
                        <i
                          className={`bi bi-instagram ${classes.facebookicon}`}
                        ></i>
                      </a>
                      <a href={item.email}>
                        <i
                          className={`bi bi-envelope-fill ${classes.emailicon}`}
                        ></i>
                      </a>
        </div>
        <div className={classes.info_mobile}>
          <div className={classes.info_img}>
            <img src={item.image} alt={item.name} />
          </div>
          <div className={classes.info_name}>{item.name}</div>
          <div className={classes.designation}>{item.post}</div>
        </div>

       
      </div>
    ))}
  </div>
)}
<button className={core_mobile||tech_mobile||design_mobile?classes.back_btn:classes.hide} onClick={handleBack}>
  Back
</button> 

        </div>

</div>
    </>
  );
};

export default ContactUs;
