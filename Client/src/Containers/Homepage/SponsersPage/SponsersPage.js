import React from "react";
import classes from "./SponsersPage.module.css";
import Card from '../../../Cards/Card'
import ReactGa from "react-ga";
import { regForNewsletters } from "../../../actions/authActions";
import {useHistory} from "react-router-dom";
const Elements = () => {
//   const homebutton =()=>{
// window.location='./spnsors'
//   }
  const History = useHistory();
  const sponsorbutton =()=>{
      History.push('/sponsors');
       
    }


    
  const emailSubmit = (event) => {
    event.preventDefault();
    ReactGa.event({
        category: "Click",
        action: "Clicked on Submit in Newsletters Homepage",
    });
    let email = document.getElementById("emailR").value;
    regForNewsletters(email);
    // console.log("Email Submitted")
}

  return (
    <div className={classes.container}>

      <div className={classes.pos3}><Card head=<span className={classes.He3}onClick={sponsorbutton} >SPONSORS</span> desc=<span className={classes.De3}>Kshitij, being one of India's most prominent fests, attracts sponsorship from mammoth MNCs every year. The ginormous fleet of renowned sponsors for Kshitij-2024 is led by Acer, our title sponsor.</span>></Card></div>
  
      <div>
{/*<img
          className={classes.asteroids}
          src="https://github.com/KSHITIJ-2024/media/blob/main/asteroids_theme_page.png?raw=true"
          alt="asteroids"
  />*/}
  <picture >
    <source media="(max-width: 480px)" srcset="https://i.imgur.com/mq0MyWO.png" />
    <img className={classes.asteroids} src="https://i.imgur.com/ZSxkUTV.png" alt="asteroids" />
</picture>
<img className={classes.meteorite1} src="https://i.imgur.com/kjcvRKb.png" alt="asteroids" />
<img className={classes.asteroidsS1} src="https://i.imgur.com/yf0eJW8.png" alt="asteroids" />
<img className={classes.asteroidsS2} src="https://i.imgur.com/kk5GT8V.png" alt="asteroids" />
      </div>
      <div>
       {/* <img 
          className={classes.spaceshipC}
          src="https://github.com/KSHITIJ-2024/media/blob/main/Sponsors%20elements/SpaceshipCombined.png?raw=true"
          alt="spaceshipC"
  />*/}
  <picture >
    <source media="(max-width: 480px)" srcset="" />
    <img className={classes.spaceshipC} src="https://i.imgur.com/XQ9AZnD.png" alt="Spaceship" />
</picture>
<picture >
    <source media="(max-width: 480px)" srcset="" />
    <img className={classes.spaceshipO} src="https://i.imgur.com/LH3LGmg.png" alt="Spaceship" />
</picture>
      </div>
      <div>
         
    
    <img className={classes.planet} src="https://i.imgur.com/NROswIk.png" alt="planet" />

     
    </div>
    <form onSubmit={emailSubmit}>
    <div className={classes.registerDiv}>
      <h3>REGISTER FOR NEWSLETTER</h3><span classname={classes.rowS}>
      <label for="emailR">E-MAIL-ID: </label>
      <input label="EMAIL-ID" id="emailR" type="email" /></span>
      <button className={classes.fsubmit} type="submit" value="Submit" onClick={()=>{
                        ReactGa.event({
                                category:"Click",
                                action: "Registered for newsletter"
                        });
                    }}>Register Now</button>
    </div>
    </form>
   
    </div>
  );
};

export default Elements;
