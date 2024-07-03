// import logo from './logo.svg';
import classes from './Event_24.module.css'
import Carousel from 'react-grid-carousel';
import styled from 'styled-components';

function App() {
  const events = [
    {
    "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    },
    {
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    }
  ]
  const ArrowBtn = styled.span`
  display: inline-block;
  position: absolute;
  top: 50%;
  right: ${({ type }) => (type === 'right' ? '8px' : 'unset')};
  left: ${({ type }) => (type === 'left' ? '8px' : 'unset')};
  transform: ${({ type }) =>
    `translateY(-50%) rotate(${type === 'right' ? '45deg' : '-135deg'})`};
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  border-top: 0.24rem solid #888;
  border-right: 0.24rem solid #888;
  border-color: white;
  font-weight: 1200;
  &:hover {
    border-color: #333;

  }
`
 return (
    <>
    <div className={classes.bg}>
      <div className ={classes.heading}>
        EVENTS
        
      </div>
      <div className={classes.container}>
        <div className={classes.human}>
        <img src ="https://i.postimg.cc/XYvW3Hj5/girl-final.png"></img>
    </div> 
    <div className={classes.carousel}>
    <Carousel   rows = {2} cols={3} loop containerStyle={{width : "100%"}} 
    arrowLeft ={<ArrowBtn type="left" />} arrowRight={<ArrowBtn type = "right"/>}>
   {events.map(events => (
  <Carousel.Item containerStyle={{}} key={events.id}>
    
    <div className={classes.Events_data}>
      <div className={classes.Events_title}>{events.title}</div>
      <button className='register_btn'> 
        REGISTER
      </button>
    </div>
  </Carousel.Item>
))}

</Carousel>
   
   </div>
   <div className={classes.tablet_screen}>
    <Carousel   rows = {1} cols={2} loop containerStyle={{width : "100%"}} 
    arrowLeft ={<ArrowBtn type="left" />} arrowRight={<ArrowBtn type = "right"/>}>
   {events.map(events => (
  <Carousel.Item containerStyle={{}} key={events.id}>
    
    <div className={classes.Events_data}>
      <div className={classes.Events_title}>{events.title}</div>
      <button className='register_btn'> 
        REGISTER
      </button>
    </div>
  </Carousel.Item>
))}

</Carousel>
   
   </div>
   <div className={classes.phone_screen}>
    <Carousel   rows = {1} cols={1} loop containerStyle={{width : "100%"}} 
    arrowLeft ={<ArrowBtn type="left" />} arrowRight={<ArrowBtn type = "right"/>}>
   {events.map(events => (
  <Carousel.Item containerStyle={{}} key={events.id}>
    
    <div className={classes.Events_data}>
      <div className={classes.Events_title}>{events.title}</div>
      <button className='register_btn'> 
        REGISTER
      </button>
    </div>
  </Carousel.Item>
))}

</Carousel>
   
   </div>

    

    <div className={classes.phone_screen_vertical}>
    <div className={classes.heading_phone}>EVENTS</div> 
    {events.map(events => (

    
    <div className={classes.car_img} key={events.id}>
      <div className={classes.Events_title}>{events.title}</div>
      <button className='register_btn'> 
        REGISTER
      </button>
    </div>
    ))}  
    </div>
  
    </div>
<div className={classes.robot}>
<img src = "https://i.postimg.cc/Hs1YX9pc/event-robot.png"></img>
</div>
</div>

  
    </>
  );
}

export default App;
 