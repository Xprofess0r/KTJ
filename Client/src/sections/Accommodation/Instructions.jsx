import React from "react";
import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const Instructions = () => {
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate(-1); 
      };
    return (
        <div className={classes.containerk}>
            <div className={classes.container1}>
                <div className={classes.headerA}>INSTRUCTIONS</div>
                <div className={classes.backBtn} onClick= {handleBackButtonClick}>
          <span>{"<"}</span>
          <span>BACK</span>
        </div>
                <div className={classes.matter}>

                    
                    <br/>
                    <div><span style={{color:"#f4dad3",fontWeight:"bold", fontSize:"1.1rem"}}> 1. All the participants will be provided with  a participant kit which includes a T-shirt, notepad, ID card and stationary.</span></div>
                    <br/> 
                    <div>
                    2. Mattresses will be provided by Kshitij. Blankets, Pillows and mattress covers will not be provided. You are recommended to carry these as the temperature will be low during the fest time.
                    </div>
                    <br/>
                    <div>
                    3. During check-out, any items provided to visitors must be returned to the organisers in good condition.
                    </div>
                    <br/>
                    <div>
                    4. All visitors must uphold the campus's decorum and cleanliness, as well as adhere to its policies at all times.
                    </div>
                    <br/>
                    <div>
                    5. Entry will only be permitted through IIT Kharagpur's "Main Gate". 
                    </div>
                    <br/>
                    <div>
                    6. Random checks will be conducted to prevent any unauthorised stays on campus. Any team that fails to present their electronic or paper lodging receipts will be penalised and disqualified.
                    </div><br/>
                    <div>
                    7. All guests are required to carry their valid government photo id proofs at all times. The student participants must also have a current picture ID from their college with them at all times. Guests won't be allowed on campus for Kshitij 2024 if they can't show their ID card.

                    </div><br/>
                    <div>
                    8. It is completely forbidden to bring alcohol, drugs, sharp items, and explosives of any type on the campus. Anything else that is deemed hazardous is forbidden. In the event of any disagreements, the Security and Kshitij team's judgement will be final.

                    </div><br/>
                    <div>
                    9. Kshitij 2024 and IIT Kharagpur will not be responsible for any mishaps that occur through the duration of the stay .

                    </div><br/>
                    <div>
                    10. Outside vehicles will not be permitted inside the campus during Kshitij 2024 fest.
                    </div><br/>
                    <div>
                    11. Visitors carrying any electronic gadgets must disclose them at IIT Kharagpur main gate. They will be checked while participants are leaving the campus.
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Instructions