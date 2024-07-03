import classes from './Bullets.module.css';
const Bullets = (props) => {
    return (
        <div className={props.glow ? classes.glowBullet : classes.bullet} onClick={() => { props.func(props.obj) }}>
            <div className={props.glow ? classes.glowOuterRing : classes.outerRing}>
                <div className={props.glow ? classes.glowInnerRing : classes.innerRing}></div>
            </div>
            <div className={classes.stext}>{props.name}</div>
        </div>
    );
}

export default Bullets;