import React from "react";
import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const AccoGuide = () => {
    const navigate = useNavigate();
  const handleBackButtonClick = () => {
      navigate(-1); 
    };
    return (
        <div className={classes.containerk}>
            <div className={classes.container1}>
                <div className={classes.headerA}>Guide lines</div>
                <div className={classes.backBtn} onClick= {handleBackButtonClick}>
          <span>{"<"}</span>
          <span>BACK</span>
        </div>
                <div className={classes.matter}>
                    <div>
                        <span style={{ fontWeight: "bold" }} >Accommodation Charges: &nbsp;</span>
                        Accommodation charges for 3 days are INR 1499 per head. Maximum stay of 3 nights is allowed <span style={{ color: "red", fontWeight: "bold" }}>(19th January, 2024 8:00 AM to 21nd January,2024 10:00 PM). </span>  Please note that food facilities are not included in this cost. Participants and guests can purchase their meals from night canteens,food courts in the campus, and food stalls that are arranged at the arena.If the participants are reaching a day earlier than the above specified dates, then they will have to pay  an extra charge of INR 399 per head.
                        .
                    </div>
                    <br />
                    <div>
                        <span style={{ fontWeight: "bold" }} > Timing: &nbsp;</span>
                        Check-in: 8:00 AM to 10:00 PM on your check-in date
                        Check-out: Anytime on or before your check-out date

                    </div>
                    <br />
                    <div>
                        <span style={{ fontWeight: "bold" }} >Cancellation Policy:: &nbsp;</span>
                        Any queries regarding accommodation cancellation can be mailed to accomodation@ktj.in
                    </div>
                    <br />

                </div>

            </div>
        </div>
    )

}

export default AccoGuide