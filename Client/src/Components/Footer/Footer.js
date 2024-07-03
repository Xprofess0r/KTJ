import classes from "./Footer.module.css";
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    const [width, setWidth] = useState(0);

    const scrollup=()=>{
        window.scrollTo(0, 0);
    }

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    //   console.log("updating Widht"+newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions) 

  }, []);
    
    if(window.innerWidth >=600){
    return ( 
        <div className={classes.full}>
        <div className={classes.upper_Footer}>
            <div className={classes.left_Footer}>
                <Link to="/" className={classes.ktj}>KSHITIJ</Link>
                <p>
                Kshitij, IIT Kharagpur's annual techno-management symposium, has grown in popularity, celebrating the
                spirit of science and technology by bringing together students from all across India to demonstrate 
                their scientific and managerial prowess.<br/><br/>

                We're renowned for putting on an eclectic mix of events, including synchronized workshops, technical 
                displays, and guest talks by experts in the fields of technology and entrepreneurship. Students can assess 
                their abilities and set greater goals than ever before thanks to events ranging from technology to management.
                </p>
                <div className={classes.SFN}>Subscribe for Newsletters:</div>
            </div>
            <div className={classes.right_Footer}>
               <div className={classes.right_Footer_up}>
                    <ul className={classes.space_list_1}>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/" onClick={scrollup}>SITEMAP</Link></div>
                        </li>
                        <li><Link to="/events" onClick={scrollup}>Events</Link></li>
                        <li><Link to="/" onClick={scrollup}>Activities</Link></li>
                        <li><Link to="/" onClick={scrollup}>Theme</Link></li>
                        <li><Link to="/" onClick={scrollup}>Initiative</Link></li>
                        <li><Link to="/sponsors" onClick={scrollup}>Sponsors</Link></li>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/accommodation" onClick={scrollup}>ACCOMODATION </Link></div>
                        </li>
                    </ul>
                    <ul className={classes.space_list}>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/" onClick={scrollup}>ACTIVITIES</Link></div>
                        </li>
                        <li><Link to="/exhibitions" onClick={scrollup}>Exhibition</Link></li>
                        <li><Link to="/guestLecture" onClick={scrollup}>Guest Lectures</Link></li>
                        <li><Link to="/interactivesession" onClick={scrollup}>Interactive Sessions</Link></li>
                        <li><Link to="/ComingSoon" onClick={scrollup}>Summits</Link></li>
                        <li><Link to="/workshop" onClick={scrollup}>Workshops</Link></li>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/sponsors" onClick={scrollup}>SPONSORS</Link></div>
                        </li>
                    </ul>
                    <ul className={classes.space_list}>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/events" onClick={scrollup}>EVENTS</Link></div>
                        </li>
                        <li><Link to="/gamefest" onClick={scrollup}>Gamefest</Link></li>
                        <li><Link to="/events" onClick={scrollup}>Competition</Link></li>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/contactpage" onClick={scrollup}>CONTACT US</Link></div>
                        </li>
                        <li><Link to="/contactpage/core" onClick={scrollup}>Core Team</Link></li>
                        <li><Link to="/contactpage/design" onClick={scrollup}>Design Team</Link></li>
                        <li><Link to="/contactpage/tech" onClick={scrollup}>Tech Team</Link></li>
                    </ul>
                </div>
                <div className={classes.follow}>Follow Us</div>   
            </div>
        </div>
        <div className={classes.lower_Footer}>
            <div className={classes.lower_Footer_left}>
                <input type="text" placeholder="Your Email"/>
                <button>Submit</button>
            </div>
            <div className={classes.lower_Footer_right}>
            <a href="https://www.facebook.com/ktj.iitkgp/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg></a>
                <a href="https://www.instagram.com/ktj.iitkgp/?hl=en"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg></a>
                <a href="https://www.linkedin.com/company/kshitij-iit-kharagpur/mycompany/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></a>
                <a href="https://mobile.twitter.com/ktj_iitkgp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"/></svg></a>
                <a href="https://www.youtube.com/user/ktjiitkgp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg></a>
            </div>
        </div>
        </div>
     );
}


if(window.innerWidth < 600){
    return(
        <div className={classes.full}>
        <div className={classes.upper_Footer}>
            <div className={classes.left_Footer}>
                <Link to="/" className={classes.ktj}>KSHITIJ</Link>
                <p>
                Kshitij, IIT Kharagpur's annual techno-management symposium, has grown in popularity, celebrating the
                spirit of science and technology by bringing together students from all across India to demonstrate 
                their scientific and managerial prowess.<br/>

                We're renowned for putting on an eclectic mix of events, including synchronized workshops, technical 
                displays, and guest talks by experts in the fields of technology and entrepreneurship. Students can assess 
                their abilities and set greater goals than ever before thanks to events ranging from technology to management.
                </p>
                <div className={classes.SFN}>Subscribe for Newsletters:</div>
            </div>
            <div className={classes.right_Footer}>
               <div className={classes.right_Footer_up}>
                    <ul className={classes.space_list}>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/" onClick={scrollup}>SITEMAP</Link></div>
                        </li>
                    
                        <li><Link to="/events" onClick={scrollup}>Events</Link></li>
                        <li><Link to="/" onClick={scrollup}>Activities</Link></li>
                        <li><Link to="/" onClick={scrollup}>Theme</Link></li>
                        <li><Link to="/" onClick={scrollup}>Initiative</Link></li>
                        <li><Link to="/sponsors" onClick={scrollup}>Sponsors</Link></li>

                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/contactpage" onClick={scrollup}>CONTACT US</Link></div>
                        </li>
                        <li><Link to="/contactpage/core" onClick={scrollup}>Core Team</Link></li>
                        <li><Link to="/contactpage/design" onClick={scrollup}>Design Team</Link></li>
                        <li><Link to="/contactpage/tech" onClick={scrollup}>Tech Team</Link></li>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/accommodation" onClick={scrollup}>ACCOMODATION</Link></div>
                        </li>
                    </ul>
                    <ul className={classes.space_list}>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/" onClick={scrollup}>ACTIVITIES</Link></div>
                        </li>
                        <li><Link to="/exhibitions" onClick={scrollup}>Exhibition</Link></li>
                        <li><Link to="/guestLecture" onClick={scrollup}>Guest Lectures</Link></li>
                        <li><Link to="/interactivesession" onClick={scrollup}>Interactive Sessions</Link></li>
                        <li><Link to="/ComingSoon" onClick={scrollup}>Summits</Link></li>
                        <li><Link to="/workshop" onClick={scrollup}>Workshops</Link></li>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/events" onClick={scrollup}>EVENTS</Link></div>
                        </li>
                        <li><Link to="/gamefest" onClick={scrollup}>Gamefest</Link></li>
                        <li><Link to="/events" onClick={scrollup}>Competition</Link></li>
                        <li className={classes.sp}>
                            <div className={classes.img}><img src="https://i.imgur.com/gxvUcLg.png"/></div>
                            <div className={classes.ft_li}><Link to="/sponsors" onClick={scrollup}>SPONSORS</Link></div>
                        </li>
                    </ul>
                </div>
                <div className={classes.follow}>Follow Us</div>   
            </div>
        </div>
        <div className={classes.lower_Footer}>
            <div className={classes.lower_Footer_left}>
                <input type="text" placeholder="Your Email" style={{fontSize: "small"}}/>
                <button>Submit</button>
            </div>
            <div className={classes.lower_Footer_right}>
            <a href="https://www.facebook.com/ktj.iitkgp/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg></a>
                <a href="https://www.instagram.com/ktj.iitkgp/?hl=en"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg></a>
                <a href="https://www.linkedin.com/company/kshitij-iit-kharagpur/mycompany/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></a>
                <a href="https://mobile.twitter.com/ktj_iitkgp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"/></svg></a>
                <a href="https://www.youtube.com/user/ktjiitkgp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg></a>
            </div>
        </div>
        <div className={classes.copyright}>
        &#169; KSHITIJ IIT KHARAGPUR, ALL RIGHT RESERVED
        </div>
        </div>
    );
}
}
 
export default Footer;