import React from "react";
import classes from "./EventPage.module.css";
import Card from '../../../Cards/Card'
import {useHistory} from 'react-router-dom'

const Elements = () => {
  const history = useHistory();
  const homebutton =()=>{
        history.push('/events#/events');
    }
  
  return (
    <div className={classes.container}>
      <div className={classes.pos1}>
        <Card head=<span className={classes.He} onClick={homebutton}>EVENTS</span> desc=<span className={classes.De}>Explore the array of our endless events with bundles of packed fun, technology, and knowledge.</span>>
        </Card>
      </div>
      <div>
        <img
          className={classes.orbit}
          src="https://i.imgur.com/U45mT3k.png"
          alt=""
        />
      </div>
      <div>
        {/*<img
          className={classes.asteroids}
          src="https://github.com/KSHITIJ-2024/media/blob/main/asteroids_theme_page.png?raw=true"
          alt="asteroids"
  />*/}
      </div>
      <div>
        {/*<img
          className={classes.rocket}
          src="https://github.com/KSHITIJ-2024/media/blob/main/Events%20elements/rocket.png?raw=true"
          alt=""
  />*/}   <picture >
    <source media="(max-width: 600px)" className={classes.mobRocket} srcset="https://i.imgur.com/VujhVCq.png"  />
    <img className={classes.rocket} src="https://i.imgur.com/yivuAjj.png" alt="Rocket" />
</picture>
        
      </div>
      <div>
        <img
          className={classes['solar_system']}
          src="https://i.imgur.com/2tVn35n.png"
          alt="solar-system"
        />
      </div>
    </div>
  );
};

export default Elements;
