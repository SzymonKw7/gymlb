import styles from "./ScoreboardListElement.module.css";
import PropTypes from "prop-types";

function ScoreboardListElement({image, name, points, handleRef, isNew, ...props}) {
    return <div className={`${styles.participant} ${isNew ? styles.newUser : ""}`} ref={handleRef ? handleRef : null} {...props}>
        <span className={styles.imageBorder}></span>
        <img src={image} alt={name}/>
        <div className={styles.textCon}>
            <h5>{name}</h5>
            <h5>{+points.toFixed(2)} pkt</h5>
        </div>
    </div>
}

ScoreboardListElement.propTypes = {
    image: PropTypes.string.isRequired || PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    handleRef: PropTypes.object,
    isNew: PropTypes.bool
};

export default ScoreboardListElement;