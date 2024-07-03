import React from 'react';
import MyVideo from "./Video"
 
import PageWrapper from './PageWrapper';
import Back from './Back';
import classes from "./Comingsoon.css"
class ComingSoon extends React.Component {
  constructor(props) {
    super();
    this.state = {
      link:
        window.innerWidth < 996
          // ? "https://i.imgur.com/AiiBtVP.gif"
          // : "https://i.imgur.com/o5ooetX.gif",
          ? "https://s6.gifyu.com/images/S6Fy9.gif"
          : "https://s6.gifyu.com/images/S6Fy9.gif",
    };
  } 

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }
  handleWindowSizeChange = () => {
    if (window.innerWidth < 996) {
      this.setState({
        // link: "https://i.imgur.com/rvBx1zZ.gif",
        link: "https://s6.gifyu.com/images/S6Fy9.gif",
      });
    } else {
      this.setState({
        // link: "https://i.imgur.com/wLslTM9.gif",
        link: "https://s6.gifyu.com/images/S6Fy9.gif",
      });
    }
  };
  render() {
    return (
     <> <PageWrapper>
      <div className={classes.backbutton}><Back /></div>
     
     <MyVideo name={this.state.link} />
   </PageWrapper>
  
   </>
    );
  }
}
export default ComingSoon;


