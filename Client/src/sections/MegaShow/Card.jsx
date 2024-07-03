//card
import classes from "./Card.module.css"

const card = (props) => {

  return (
    <div className={classes.CardContainer}>
      <div className={classes.cardDiv}>
        <div className={classes.imgC}>
          <img src={props.gInfo.imageUrl} alt="" />
          <div className={classes.descGL}>{props.gInfo.lectureDescription}</div>
          {/* <button className={classes.btnJoin} onClick={() => { openInNewTab(props.join1)}}>JOIN</button> */}
        </div>
        {/* <p>{props.gInfo.g1}</p> */}
      </div>
    </div>)
}

export default card

