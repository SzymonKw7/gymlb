import styles from "./ScoreboardListElement.module.css";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function ScoreboardListElement({image, name, points, handleRef, isNew, id, ...props}) {
    const nav = useNavigate();

    return <div className={`${styles.participant} ${isNew ? styles.newUser : ""}`} ref={handleRef ? handleRef : null}
                onClick={() => nav(`/users/${id}`)} {...props}>
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
    id: PropTypes.string.isRequired,
    handleRef: PropTypes.object,
    isNew: PropTypes.bool
};

export default ScoreboardListElement;