import styles from "./ScoreboardListElement.module.css";
import PropTypes from "prop-types";
import {motion} from "framer-motion";

function ScoreboardListElement({image, name, points, handleRef, ...props}) {
    return <motion.div className={`${styles.participant} ${handleRef ? styles.newUser : ""}`} ref={handleRef ? handleRef : null} {...props}>
        <span className={styles.imageBorder}></span>
        <img src={image} alt={name}/>
        <div className={styles.textCon}>
            <h5>{name}</h5>
            <h5>{+points.toFixed(2)} pkt</h5>
        </div>
    </motion.div>
}

ScoreboardListElement.propTypes = {
    image: PropTypes.string.isRequired || PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    handleRef: PropTypes.object,
};

export default ScoreboardListElement;