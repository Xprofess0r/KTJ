import React, { useState } from "react";
import classes from "./FAQ.module.css";
import { useNavigate } from "react-router-dom";

const data = [
    {
        "Question": "How to avail accommodation ?",
        "Answer": <>
        <div>1. Go to URL and fill the registration form</div>
        <div>2. Complete the payment procedure.</div>
        <div>3. Confirmation will be sent to you.</div>
        <div>4. Report at accommodation desk.</div>
        </>
    },
    {
        "Question": "What is the payment procedure ?",
        "Answer": <>
        <div>The payment procedure will be online.The accommodation charges are provided under the tab Accommodation Charges on the hospitality page. You will have to report at the accommodation desk in the <span style={{color:"red",fontWeight:"bold"}}> Kshitij Arena near Vikramshila</span> with the email print out and the mandatory documents. Failing to bring any of the documents may lead to cancellation of your accommodation</div>
        </>
    },
    {
        "Question": "How do I know whether my payment is confirmed ?",
        "Answer": "Confirmation is not confirmed till confirmation mail is not received within 24 hours. If not received confirmation within 24 hours then mail your transaction ID, Kshitij ID, name, amount to accomodation@ktj.in with subject as (Transaction ID :: team ID ::Confirmation mail not received)."
    },
    {
        "Question": "What are the documents that guests have to carry ?",
        "Answer": <>
        <div>1. Any valid Govt photo ID.</div>
        <div>2. Print out/screenshot of Email confirmation.</div>
        <div>3. Valid College ID for participants.</div>
        </>

    },
    {
        "Question": "Shall I carry my ID card with me ?",
        "Answer": "It is mandatory for all guest participants to carry college IDs. This is for your own convenience. Moreover, you will be asked to show your college ID cards at the time of allotment of rooms in the hostels."
    },
    {
        "Question": "What are the accommodation charges? "        ,
        "Answer": "The accommodation charges and other necessary details regarding the payment will be available under the tab Accommodation Charges."
    },
    {
        "Question": "Will all the team members be given accommodation at the same place?        ",
        "Answer": "We will try but there is no surety for the same, there are very high chances that if you come at the same time, you will be provided accommodation at the same place. Outstation guest who have registered for accommodation are requested to report to the accommodation desk (Kshitij arena in Vikramshila) where the required formalities involving checking of documents, allotment of rooms will be done."
    },
    {
        "Question": "What kind of accommodation is provided?        ",
        "Answer": "Accommodation is provided on a shared basis inside campus halls. One mattress, and an enough space for keeping luggage, and other essential commodities will be provided. Girls and boys will be accommodated separately. Number of guest in a room will be decided by Kshitij and will be allotted by Kshitij team."
    },
    {
        "Question": "Does the accommodation charges include food facilities too?        ",
        "Answer": "No, the accommodation charges does not include food facilities. Guest can purchase their meals from the food court in our arena, night cafeteens and stalls present in our campus.        "
    },
    {
        "Question": "Do we get any food facilities at outside accommodation places?        ",
        "Answer": "You can purchase your meals from the hotels or the nearby restaurants.        "
    },
    {
        "Question": "What are the food facilities inside the campus?        ",
        "Answer": "For all our guests and participants we will set up a huge food court serving a variety of cuisines satisfying the needs of every palate. In addition, you can also eat in the many canteens, and restaurant inside the campus.        "
    },
    {
        "Question": "What about the hospital facility?        ",
        "Answer": "There is an institute Hospital named BC Roy Hospital. In case you fall ill, you are advised to report to us at the accommodation desk. We shall make appropriate arrangements for you to be treated at the Institute hospital. We shall also be carrying a first aid kit with us, at the accommodation desk.        "
    },
    {
        "Question": "What about the security facilities during the fest in the campus?        ",
        "Answer": "IIT Kharagpur campus has a vigilant and round-the-clock security service. To ensure the safety of the participants, there will be additional security guards in hostels in order to avoid thefts and other mishaps. Although Kshitij team will not take responsibility for any theft or other mishaps. So guest are requested to take care of their luggage and valuable items.        "
    },
    {
        "Question": " Where will I get my accommodation?        ",
        "Answer": "You will be getting accommodation inside the campus in various halls depending upon availability.        "
    },
    {
        "Question": " Can I enter IIT-KGP campus anytime?        ",
        "Answer": "You can enter IIT Main gate anytime by showing valid photo ID proof during 6am to 10pm, however, you need to have accommodation inside the campus to stay in the campus after 10pm.        "
    },
    {
        "Question": "We are a group of people not participating in any of competitions or workshops and just coming to Kshitij for enjoyment. Would we be provided accommodation?        ",
        "Answer": <>
        <div><span style={{color:"red",fontWeight:"bold"}}> No, Accommodation would be confirmed strictly subject to availability of rooms.</span> </div>
        </>
    },
    {
        "Question": "Where do I have to report during the fest?        ",
        "Answer": "You need to come to the Accomodation desk at Kshitij arena in Vikramshila.        "
    },
    {
        "Question": "Can I get refund if I have already made the payment?        ",
        "Answer": "Sorry, currently we are not offering any refund once you have made the payment. However if you do not receive the ticket within 24 hours, contact any core team member to get it sorted out..        "
    },
,
]



const Faqs = () => {
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate(-1); 
      };

    const [selected, setSelected] = useState(null);
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }
    return (
        <div className={classes.full}>
            <div className={classes.main}>
                <div className={classes.heading}>
                    FAQS<br />
                </div>
                <div className={classes.backBtn} onClick= {handleBackButtonClick}>
          <span>{"<"}</span>
          <span>BACK</span>
        </div>
                <div className={classes.quesDiv}>

                    {data.map((item, i) => {


                        return (

                            <div className={classes.ques}>
                                <div className={classes.que} onClick={() => toggle(i)}>{item.Question}
                                    <img src="https://i.postimg.cc/JzsNQbk0/asUViTE.png" className={classes.img} /></div>
                                <div className={selected === i ? classes.ansShow : classes.ans}>{item.Answer}</div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )


}

export default Faqs