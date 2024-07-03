import React, { useEffect, useState } from 'react'
import classes from "./ContactUs.module.css"
import Slider from 'react-slick';

export default function ContactUsNew() {

  const [activeTeam, setActiveTeam] = useState(-1);

  const web = [
    {
      name: "Sarvan Kumar Singh",
      email: "mailto:sarvan.tech17@gmail.com",
      linkedin: "http://www.linkedin.com/in/sarvantech17/",
      facebook: "https://www.instagram.com/sravansingh1709/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/Qxfdk5x4/PSX-20231114-160949.jpg",
    },
    {
      name: "Chaitanya Srinivas Dommeti",
      email: "mailto:chaitanyads127@gmail.com",
      linkedin: "https://www.linkedin.com/in/chaitanya-srinivas-41559323b/",
      facebook: "https://www.instagram.com/chaitanyads127/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/MKRKRKR2/chaitanya.jpg",
    },
    {
      name: "Greesh Raj Patairiya",
      email: "mailto:greeshraj234@gmail.com",

      linkedin: "https://in.linkedin.com/in/greeshraj/",
      facebook: "https://www.facebook.com/greeshraj.patairiya.319/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/c4X5PWDF/greesh.jpg",
    },
    {
      name: "Lemon Swargiary",
      email: "mailto:lemon10swargiary@gmail.com",

      linkedin: "https://www.linkedin.com/in/lemon-swargiary-54711b248/",
      facebook: "https://www.facebook.com/profile.php?id=100078104600152/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/Zn0R4JGz/lemon.jpg",
    },
    {
      name: "Bhanu Pratap",
      email: "mailto:bhanu0312pratap@gmail.com",
      linkedin: "https://www.linkedin.com/in/bhanu-pratap1/",
      facebook: "https://www.facebook.com/profile.php?id=100073575444854/",
      post: "Tech Team Head",
      image: "https://i.postimg.cc/vT6vDwnC/bhanupratap.jpg",
    },
    {
      name: "Abhishek",
      email: "mailto:rajput9997647419@gmail.com",
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
      image: "https://i.postimg.cc/0NzHrZRC/sonia.jpg",
    },
    {
      name: "Tushar Kumar",
      email: "",

      linkedin: "https://www.linkedin.com/in/tushar-kumar-33a932146/",
      facebook: "https://www.instagram.com/_snapshot_oo7/",
      post: "Design and media Head",
      image: "https://i.postimg.cc/Kc7Kd2kn/tushar.jpg",
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
      image: "https://i.postimg.cc/xCLjS1X3/hritwik.jpg",
    },
    {
      name: "Jeevan kumar Thummalapelli",
      email: "",

      linkedin:
        "https://www.linkedin.com/in/thummalapelli-jeevan-kumar-32464b254/",
      facebook: "https://www.instagram.com/jeevan_kumar179/",
      post: "Design and media Head",
      image: "https://i.postimg.cc/K8kmQqsv/1698676658262-2.png",
    },
  ];

  const coredata = [
    {
      name: "Aditya Kumar",
      email: "mailto:aditya.kumar@ktj.in",
      post: "events head",
      facebook: "https://www.facebook.com/profile.php?id=100075716836389",
      linkedin: "https://www.linkedin.com/in/aditya-kumar-b7b79b22b/",
      "Twitter/X": "https://twitter.com/Aditya_K_2810",
      image: "https://i.postimg.cc/4dtmBx0R/Aditya-Kumar.jpg",
    },
    {
      name: "Debjyoti Maji",
      email: "mailto:Debjyoti.Maji@ktj.in",
      post: "Events head",
      // facebook: "https://www.facebook.com/debjyoti.maji.167?mibextid=ZbWKwL",
      facebook: "https://www.instagram.com/debjyoti_majii/",
      linkedin: "https://www.linkedin.com/in/majidebjyoti108",
      "Twitter/X": "https://twitter.com/_i_am_debjyoti?s=09",
      image: "https://i.postimg.cc/nrjVK9WV/Debjyoti-Maji.jpg",
    },
    {
      name: "Hemant Kumar",
      email: "mailto:hemant.kumar@ktj.in",
      post: "Events Head",
      facebook: "https://www.facebook.com/profile.php?id=100045774070798",
      linkedin: "https://www.linkedin.com/in/hemant-kumar-5036ba22b/",
      "Twitter/X": "https://twitter.com/HK24211",
      image: "https://i.postimg.cc/vTrQwL5G/Hemant-Kumar.jpg",
    },
    {
      name: "Pratap Kodate",
      email: "mailto:pratap.kodate@ktj.in",
      post: "publicity and media Head",
      facebook:
        "https://www.facebook.com/profile.php?id=100075473537939&mibextid=ZbWKwL",
      linkedin: "https://www.linkedin.com/in/pratap-kodate-b3b05b230/",
      "Twitter/X": "https://twitter.com/PratapKodate",
      image: "https://i.postimg.cc/fW7cKVPN/Pratap-Kodate.jpg",
    },
    {
      name: "Rupesh Raj",
      email: "mailto:rupesh.raj@ktj.in",
      post: "publicity and media head",
      facebook: "https://www.facebook.com/profile.php?id=100016035738584",
      linkedin: "https://www.linkedin.com/in/saurabh-suman-ba61b8223",
      "Twitter/X": "https://mobile.twitter.com/Saurabh_17_oct",
      image: "https://i.postimg.cc/NFMYn9Q0/Rupesh-Raj.jpg",
    },
    {
      name: "Rashmita Sahoo",
      email: "mailto:rashmita.sahoo@ktj.in",
      post: "sponsorship head",
      facebook: "https://www.facebook.com/swetalina.sahoo.5661/",
      linkedin: "https://www.linkedin.com/in/qureshi-shoaib/",
      "Twitter/X": "https://twitter.com/Rashmi29092002",
      image: "https://i.postimg.cc/J7qGdZ5R/Rashmita.jpg",
    },
    {
      name: "Qureshi Shoaib",
      email: "mailto:qureshi.shoaib@ktj.in",
      post: "sponsorship head",
      facebook: "https://www.facebook.com/qureshi.shoaib.505",
      linkedin: "https://www.linkedin.com/in/qureshi-shoaib/",
      "Twitter/X":
        "https://twitter.com/qureshi1604?t=TD0r01TwO93fnXgLkClhTA&s=09",
      image: "https://i.postimg.cc/NGyzdkcH/Qureshi-Shoiab.jpg",
    },
    {
      name: "Prakhar Lohumi",
      email: "mailto:prakhar.lohumi@ktj.in",
      post: "sponsorship Head",
      facebook: "https://www.facebook.com/profile.php?id=100075092241043",
      linkedin: "https://www.linkedin.com/in/prakhar-lohumi-03701622b",
      "Twitter/X": "https://twitter.com/prakharlohumi_",
      image: "https://i.postimg.cc/L59PJT28/Prakhar.jpg",
    },
    {
      name: "Aditya Bhatia",
      email: "mailto:aditya.bhatia@ktj.in",
      post: "sponsorship head",
      facebook: "https://www.instagram.com/aditya.bhatia2021/",
      linkedin: "https://www.linkedin.com/in/aditya-bhatia-6161541aa",
      image: "https://i.postimg.cc/8cHGskcv/Aditya-bhatia.jpg",
    },

    {
      name: "Gali Siva Sai Ram ",
      email: "mailto:siva.gali@ktj.in",
      post: "Sponsorship Head",
      facebook: "http://www.instagram.com/_sivasairam",
      linkedin: "https://www.linkedin.com/in/siva-sai-ram-gali-8682b1245/",
      "Twitter/X": "https://twitter.com/sivasairam2003",
      image: "https://i.postimg.cc/tTX4tNFW/siva.png",
    },
    {
      name: "Digvijay Singh",
      email: "mailto:Digvijay.Singh@ktj.in",
      post: "Executive Head",
      facebook: "https://www.facebook.com/debjyoti.maji.167?mibextid=ZbWKwL",
      linkedin: "https://www.linkedin.com/in/digvijay-singh-b95936231/",
      "Twitter/X":
        "https://twitter.com/Digvija93354533?t=vYggyAUJyMHvzIxskaFyqg&s=08",
      image: "https://i.postimg.cc/j5jqN7VX/Digvijay-Sigh.jpg",
    },
    {
      name: "Vinayak Agarwal",
      email: "mailto:vinayak.agarwal@ktj.in",
      post: "executive  head",
      facebook: "https://www.facebook.com/411vinayak",
      linkedin: "https://www.linkedin.com/in/vinayak-agarwal-11759222a",
      "Twitter/X": "https://twitter.com/Vinayak_A03",
      image: "https://i.postimg.cc/0yfzhmsY/Vinayak-Agarwal.jpg",
    },
    {
      name: "Ayush Kumar",
      email: "mailto:ayush.kumar@ktj.in",
      post: "Finance head",
      facebook: "https://www.facebook.com/profile.php?id=100075999341977",
      linkedin: "https://www.linkedin.com/in/ayush-kumar-928a97209/",
      "Twitter/X":
        "https://twitter.com/ayushk_2106?t=sSPykKwcltZ9hbXSwPgbcg&s=09",
      image: "https://i.postimg.cc/jj74TL3M/Ayush.jpg",
    },
    {
      name: "Priyanshu Garg",
      email: "mailto:priyanshu.garg@ktj.in",
      post: "Finance Head",
      facebook:
        "https://www.facebook.com/profile.php?id=100007954007294&mibextid=ZbWKwL",
      linkedin: "https://www.linkedin.com/in/priyanshuvwxyz",
      "Twitter/X": "https://twitter.com/priyanshuvwxyz",
      image: "https://i.postimg.cc/KvD4wL7Z/Priyanshu-Garg.jpg",
    },
  ];


  const teamsData = [web, coredata, design];
  const teamsText = [
    "https://i.postimg.cc/NM4yPg4B/logo-tech-team.png",
    "https://i.postimg.cc/Y0vW4567/logo-core-1.png",
    "https://i.postimg.cc/tCCXz3w1/logo-design-team.png"
  ];

  const settings = {
    rows: 1,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    className: classes.carousel,
    speed: 500,
    // initialSlide: 0,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 480);
  }

  useEffect(() => { 

    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })



  return (
    <div className={classes.container}>
      <div className={`${classes.teams} ${(activeTeam != -1) ? classes.teamActive : ""}`}>
        <div className={`${classes.team} ${activeTeam == 0 ? classes.selectedTeam : ""}`}
          onClick={() => { setActiveTeam(0) }}>
          <img className={classes.teamLogo} src="https://i.postimg.cc/qMbzTcrB/logo-tech-team-1-1.png"/>
          <img className={classes.teamText} src="https://i.postimg.cc/NM4yPg4B/logo-tech-team.png" alt="TECH TEAM" />
        </div>
        <div className={`${classes.team} ${activeTeam == 1 ? classes.selectedTeam : ""}`}
          onClick={() => { setActiveTeam(1) }}>
            
          <img className={classes.teamLogo} src="https://i.postimg.cc/Pf6tptR2/logo-core-1.png"/>
          <img className={classes.teamText} src="https://i.postimg.cc/Y0vW4567/logo-core-1.png" alt="CORE TEAM" />
        </div>
        <div className={`${classes.team} ${activeTeam == 2 ? classes.selectedTeam : ""}`}
          onClick={() => { setActiveTeam(2) }}>

          <img className={classes.teamLogo} src="https://i.postimg.cc/PxxRBkQ5/logo-design-team-1-1.png"/>
          <img className={classes.teamText}  src="https://i.postimg.cc/tCCXz3w1/logo-design-team.png" alt="DESIGN TEAM" />
        </div>
      </div>


      <div className={`${classes.members} ${activeTeam != -1 ? classes.show : ""}`}>
        <div className={classes.backBtn} onClick={() => { setActiveTeam(-1) }}>
          <span>{"<"}</span>
          <span>BACK</span>
        </div>
        <img className={classes.membersTeamText} src={teamsText[activeTeam]} alt="TEAM MEMBERS" />
        <Slider {...settings}>
          { activeTeam != -1 &&
            teamsData[activeTeam].map((mem, i) => {
              return (
                <div className={classes.profile} key={i}>
                  <div className={classes.profileUpper}>
                    <div className={classes.socials}>
                      <a href={mem.linkedin} className={`bi bi-linkedin ${classes.socialIcons}`}></a>
                      <a href={mem.facebook} className={`bi bi-instagram ${classes.socialIcons}`}></a>
                      <a href={mem.email} className={`bi bi-envelope-fill ${classes.socialIcons}`}></a>
                    </div>
                    <div className={classes.memberImage}>
                      <img src={mem.image} alt={mem.name}/>
                    </div>
                  </div>
                  <span className={classes.memberName}>{mem.name}</span>
                  <span className={classes.memberPost}>{mem.post}</span>
                </div>
              )
            })
          }
        </Slider>
        <div className={classes.mobileSlider}>
          { activeTeam != -1 &&
              teamsData[activeTeam].map((mem, i) => {
                return (
                  <div className={classes.profile} key={i}>
                    <div className={classes.profileUpper}>
                      <div className={classes.socials}>
                        <a href={mem.linkedin} className={`bi bi-linkedin ${classes.socialIcons}`}></a>
                        <a href={mem.facebook} className={`bi bi-instagram ${classes.socialIcons}`}></a>
                        <a href={mem.email} className={`bi bi-envelope-fill ${classes.socialIcons}`}></a>
                      </div>
                      <div className={classes.memberImage}>
                        <img src={mem.image} alt={mem.name}/>
                      </div>
                    </div>
                    <span className={classes.memberName}>{mem.name}</span>
                    <span className={classes.memberPost}>{mem.post}</span>
                  </div>
                )
              })
            }
        </div>

      </div>

    </div>
  )
}
