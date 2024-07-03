import React, { useState, useEffect } from "react";
import classes from "./Spons.module.css";
import axios from "../../api"

const SponsorsPage = () => {
  const [sponsdata, setSponsdata] = useState([]);
  const [currentYear, setCurrentYear] = useState(2024)
  const [isClicked, setIsClicked] = useState(false);

  const yearClickHandler_mobile = (event) => {
    // Toggle the state value
    setIsClicked(!isClicked);
    const node = event.target;
    const parentNode = node.parentNode.parentNode;
  

  
  
    setCurrentYear(parseInt(node.innerText));
  };


  const yearClickHandler = (event) => {
    const node = event.target;
    const parentNode = node.parentNode.parentNode;

    // Reset opacity for all children
    let e = parentNode.firstChild;

    while (e) {
      if (e.firstChild === node) {
        e.style.opacity = "1"; // Set opacity for the clicked year
      } else {
        e.style.opacity = "0.3"; // Reset opacity to the original value for non-clicked years
      }
      e = e.nextSibling;
    }

    setCurrentYear(parseInt(node.innerText));
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



  const Sponscard = ({ data }) => {
    
    console.log(data.sponsorType);
    const allspons = data.sponsors;
    const title = data.sponsorType;
    // console.log(allspons,"===", title);
    if(title=="Title sponsor" || title=="Co-Title sponsor"||title=="Title Sponsor" || title=="Co-Title Sponsor") return <></>;
    return (
      <div className={classes.sponsdiv}>
        <div className={classes.name}>{title}</div>
        <div className={classes.imgdiv} >
          {
            allspons.map((ele, id) => {
              return <div className={(title == "Title Sponsor" || title == "Strategic Sponsor"||title=="Title sponsor" || title=="Strategi sponsor") ? classes.titleCover : classes.imgCover} key={ele._id}><img
                src={`${ele.sponsorImg}`} alt='' onClick={e => {
                  e.preventDefault();
                  window.open(`${ele.linktoWebsite}`
                    , '_blank', 'noopener,noreferrer');
                }
                } /></div>
            })
          }
        </div>
      </div>
    )
  }

  const Sponscardpro = ({ data }) => {
    const allspons = data.sponsors;
    const title = data.sponsorType;
    // console.log(allspons,"===", title);
    return (
      <div className={classes.sponsdivx}>
        <div className={classes.name}>{title}</div>
        <div className={classes.imgdiv} >
          {
            allspons.map((ele, id) => {
              return <div className={classes.titleCover} key={id}><img
                src={`${ele.sponsorImg}`} alt='' onClick={e => {
                  e.preventDefault();
                  window.open(`${ele.linktoWebsite}`
                    , '_blank', 'noopener,noreferrer');
                }
                } /></div>
            })
          }
        </div>
      </div>
    )
  }

  useEffect(() => {
    axios
      .get(`/sponsors?year=${currentYear}`)
      .then((res) => {
        const data = res.data?.sponsors;
        data.sort(function (first, second) {
          if (first.priority < second.priority) {
            return -1;
          }
          else if (first.priority > second.priority) {
            return 1;
          }
          else if (first.order > second.order)
            return 1;
          return -1;
        })
        // console.log("sorted", data);
        setSponsdata(data);
      })
      .catch((error) => {
        console.log('err', error)
      })
  }, [currentYear]);

  useEffect(() => {
    axios
      .get(`/sponsors?year=${currentYear}`)
      .then((res) => {
        const data = res.data?.sponsors;
        data.sort(function (first, second) {
          if (first.priority < second.priority) {
            return -1;
          }
          else if (first.priority > second.priority) {
            return 1;
          }
          else if (first.order > second.order)
            return 1;
          return -1;
        })
        // console.log("sorted", data);
        setSponsdata(data);
      })
      .catch((error) => {
        console.log('err', error)
      })
  }, [])



  const [imageOpacity1, setImageOpacity1] = useState(0.3);
  const [imageOpacity2, setImageOpacity2] = useState(0.3);
  const [imageOpacity3, setImageOpacity3] = useState(0.3);
  const [imageOpacity4, setImageOpacity4] = useState(0.3);
  const [imageOpacity5, setImageOpacity5] = useState(0.3);



  return (
    <>
      <div
        className={classes.container}
      >

        <div className={classes.sponhead}><h1 className={classes.title}>SPONSORS</h1></div>


        <div className={classes.sponsmain}>
          <div className={classes.clock_box}>
            <div className={classes.time_travel_clock}>
              <div className={classes.year_2024} onClick={yearClickHandler}>2024</div>
              <div className="time_clock">
                <img  style={{opacity: imageOpacity1}} src="https://i.postimg.cc/hjWqpzjz/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
              </div>
            </div>

            <div className={classes.time_travel_clock}>
              <div className={classes.year_2023} onClick={yearClickHandler}>2023</div>
              <div className="time_clock">
                <img  style={{opacity: imageOpacity2}} src="https://i.postimg.cc/hjWqpzjz/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
              </div>
            </div>

            <div className={classes.time_travel_clock}>
              <div className={classes.year_2022} onClick={yearClickHandler}>2022</div>
              <div className="time_clock">
                <img  style={{opacity: imageOpacity3}} src="https://i.postimg.cc/hjWqpzjz/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
              </div>
            </div>

            <div className={classes.time_travel_clock}>
              <div className={classes.year_2021} onClick={yearClickHandler}>2021</div>
              <div className="time_clock">
                <img  style={{opacity: imageOpacity4}} src="https://i.postimg.cc/hjWqpzjz/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
              </div>
            </div>

            <div className={classes.time_travel_clock}>
              <div className={classes.year_2020} onClick={yearClickHandler}>2020</div>
              <div className="time_clock">
                <img  style={{opacity: imageOpacity5}} src="https://i.postimg.cc/hjWqpzjz/glow.png" className={classes.glow} />
                <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
              </div>
            </div>

          </div>

      <div className={classes.board}> 
  
        <div className={classes.content}>
           <div className={classes.contentpro}> 
            {
              sponsdata.filter((e)=>{return (e.sponsorType==="Title sponsor" || e.sponsorType==="Co-Title sponsor"||e.sponsorType==="Title Sponsor" || e.sponsorType==="Co-Title Sponsor"                   )}).map((ele2, idx) => {
                return <><Sponscardpro data={ele2} key={idx} /></>
              })}
          </div>
          {
            sponsdata.map((ele2, idx) => {
              return <><Sponscard data={ele2} key={idx} /></>
            })}

         </div>  
        
      </div>
      </div>
      
     
    </div>
    <div className={classes.background_mobile}>
 
 <div className={isClicked?classes.backBtn:classes.hide } onClick={yearClickHandler_mobile}>
  {"<"}  BACK
 </div>

   <div className={`${classes.clock_box_mobile} ${isClicked ? "" : classes.show}`}>
  
<div className={isClicked?classes.hide:classes.outerbox}>
<div className={classes.title}>SPONSORS</div>
   <div className={classes.time_travel_clock} onClick={yearClickHandler_mobile}>
           <div className={classes.year_2024} >2024</div>
           <div className="time_clock">
             {/* <img  style={{opacity: imageOpacity1}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} /> */}
             <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
           </div>
         </div>

         <div className={classes.time_travel_clock} onClick={yearClickHandler_mobile}> 
         <div className={classes.year_2023} >2023</div>
           <div className="time_clock">
             {/* <img  style={{opacity: imageOpacity2}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} /> */}
             <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
           </div>
         </div>

         <div className={classes.time_travel_clock} onClick={yearClickHandler_mobile}>
         <div className={classes.year_2022} >2022</div>
           <div className="time_clock">
             {/* <img  style={{opacity: imageOpacity3}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} /> */}
             <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
           </div>
         </div>

         <div className={classes.time_travel_clock} onClick={yearClickHandler_mobile}>
         <div className={classes.year_2021} >2021</div>
           <div className="time_clock">
             {/* <img  style={{opacity: imageOpacity4}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} /> */}
             <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
           </div>
         </div>

         <div className={classes.time_travel_clock} onClick={yearClickHandler_mobile}>
         <div className={classes.year_2020} >2020</div>
           <div className="time_clock">
             {/* <img  style={{opacity: imageOpacity5}} src="https://i.postimg.cc/RZHYdhC7/glow.png" className={classes.glow} /> */}
             <img src="https://i.postimg.cc/MKCbw8qp/time-clock-1.png" className={classes.clock_image} />
           </div>
         </div>
          </div>
  
   <div className={`${classes.board} ${isClicked ? classes.show : ""}`} >
   <div className={classes.content}>
        <div className={classes.contentpro}> 
         {
           sponsdata.filter((e)=>{return (e.sponsorType==="Title sponsor" || e.sponsorType==="Co-Title sponsor"|| e.sponsorType==="Title Sponsor" || e.sponsorType==="Co-Title Sponsor")}).map((ele2, idx) => {
             return <Sponscardpro data={ele2} key={idx} />
           })}
       </div>
       {
         sponsdata.map((ele2, idx) => {
           return <Sponscard data={ele2} key={idx} />
         })}

      </div>  

   </div>
</div>
</div>
   
   </>
  );

};


export default SponsorsPage;
