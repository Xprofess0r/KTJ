import React from "react";
import Classes from "./Coming.module.css";
import Vdo from "../../Components/vdoplayer/Vdo";
import ReactGa from "react-ga";
import PageWrapper from "../PageWrapper/PageWrapper";
import BackBtn from "../../Components/BackButton/button"

class Coming extends React.Component {
  constructor(props) {
    super();
    // this.goBack = this.goBack.bind(this);
    this.state = {
      link:
        window.innerWidth < 996
          ? "https://github.com/KSHITIJ-2022/media/blob/master/Components/Coming_soon/compressed%20coming%20soon%20mobile.mp4?raw=true"
          : "https://github.com/KSHITIJ-2022/media/blob/master/Components/Coming_soon/comingsoon%20compressed.mp4?raw=true",
    };
  }
  // goBack() {
  //   ReactGa.event({
  //     category: "Click",
  //     action: "Clicked on Back in ComingSoonpage",
  //   });
  //   this.props.history.goBack();
  // }
  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }
  handleWindowSizeChange = () => {
    if (window.innerWidth < 996) {
      this.setState({
        link: "https://github.com/KSHITIJ-2022/media/blob/master/Components/Coming_soon/compressed%20coming%20soon%20mobile.mp4?raw=true",
      });
    } else {
      this.setState({
        link: "https://github.com/KSHITIJ-2022/media/blob/master/Components/Coming_soon/new%20coming%20soon.mp4?raw=true",
      });
    }
  };
  render() {
    return (
      <PageWrapper>
        {/* <Navigation /> */}
        <Vdo name={this.state.link} loopCondition={true} />
        <BackBtn position="left-bottom" />
      </PageWrapper>
    );
  }
}
export default Coming;