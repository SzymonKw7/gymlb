import AnimatedMain from "../AnimatedMain/AnimatedMain";
import {useEffect, useRef, useState} from "react";
import unknown from "../../assets/Unknown_person.jpg";
import styles from "./Scoreboard.module.css";
import ScoreboardListElement from "./ScoreboardListElement/ScoreboardListElement";
import {Link, useParams} from "react-router-dom";
import SlotCounter from 'react-slot-counter';
import SubmitButton from "../SubmitButton/SubmitButton";
import {AnimatePresence, motion} from "framer-motion";

function Scoreboard() {

    const {name} = useParams();

    const scoreboard = useRef(null);

    const newUserElement = useRef(null);
    const newScoreDisplay = useRef(null);

    const [users, setUsers] = useState([]);
    const [scrollToLast, setScrollToLast] = useState(false);
    const [newScore, setNewScore] = useState(null);
    const [showNewScoreDisplay, setShowNewScoreDisplay] = useState(true);
    const [showNewScoreButton, setShowNewScoreButton] = useState(false);

    useEffect(() => {
        fetch("User").then(response => response.json()).then(res => res.data.sort((a, b) => {
            if (a.name === name) {
                return 1;
            } else if (b.name === name) {
                return -1;
            } else {
                return b.score - a.score;
            }
        })).then(res => setUsers(res)).catch(err => console.error(err));
    }, [name]);

    useEffect(() => {
        if (scrollToLast) {
            scoreboard.current.scrollTop = scoreboard.current.scrollHeight;
            setNewScore(users.find(user => user.name === name).score.toFixed(2));
            if (newScoreDisplay.current !== null) {
                newScoreDisplay.current.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            }
            setTimeout(() => {
                setShowNewScoreButton(true);
            }, 3000);
        }
    }, [name, scrollToLast, users]);

    useEffect(() => {
        if (newUserElement.current !== null && !showNewScoreDisplay) {
            setUsers((prev) => prev.sort((a, b) => b.score - a.score));
            // setTimeout(() => {
            // newUserElement.current.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            // window.history.pushState({}, "", "/#/scoreboard");
            // }, 500);
        }
    }, [name, showNewScoreDisplay]);

    return <AnimatedMain>
        <h1>Najsilniejsi<br/>&nbsp;<span className="detal">2024</span></h1>
        <section ref={scoreboard} className={styles.scoreboard}>
            <AnimatePresence>
                {users.length > 0 && users.map((user, index) => {
                    let imageURL;

                    if (user.profilePicture === null) {
                        imageURL = unknown;
                    } else {
                        switch (Array.from(user.profilePicture)[0]) {
                            case "/":
                                imageURL = "data:image/jpeg;base64," + user.profilePicture;
                                break;
                            case "i":
                                imageURL = "data:image/png;base64," + user.profilePicture;
                                break;
                            case "R":
                                imageURL = "data:image/gif;base64," + user.profilePicture;
                                break;
                            case "U":
                                imageURL = "data:image/webp;base64," + user.profilePicture;
                                break;
                            case "J":
                                imageURL = "data:image/pdf;base64," + user.profilePicture;
                                break;
                            case "P":
                                imageURL = "data:image/svg+xml;base64," + user.profilePicture;
                                break;
                            case "T":
                                imageURL = "data:image/tiff;base64," + user.profilePicture;
                                break;
                            default:
                                imageURL = unknown;
                        }
                    }

                    if (name && user.name === name) {
                        return <ScoreboardListElement key={user.id} image={imageURL} name={user.name}
                                                      points={user.score}
                                                      handleRef={newUserElement}
                                                      onLoad={() => setScrollToLast(true)}/>
                    }

                    return <ScoreboardListElement key={user.id} image={imageURL} name={user.name} points={user.score}/>

                })}
            </AnimatePresence>
        </section>
        <footer className={styles.footer}>
            <h3>Czym jest<br/>&nbsp;<span className={styles.wilks}>WILKS?</span></h3>
            <h5>To matematyczny współczynnik<br/><span className={"regular"}>do pomiaru</span> <span
                className={"detal"}>względnych sił.</span><br/><span className={"regular"}>Dzięki niemu jesteśmy w stanie sklasyfikować</span><br/>
                wszystkich uczestników razem,<br/><span
                    className={"detal"}>bez podziału na kategorie wagowe i płeć.</span>
            </h5>
            <h5><span className={"regular"}>Wynik obliczamy na podstawie</span><br/>wagi zawodnika i wyciśniętego
                ciężaru.</h5>
        </footer>
        <Link to={"/users/add"} className={styles.addNewScore}></Link>
        <AnimatePresence>
            {name && showNewScoreDisplay &&
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                            className={styles.newScoreDisplay} ref={newScoreDisplay}>
                    <h2>Twój<br/><span className={"detal"}>&nbsp;Wynik</span></h2>
                    <h1>
                        <SlotCounter startValue={"000"} value={Math.floor(newScore).toFixed(0)}
                                     startValueOnce={true} animateUnchanged={true} sequentialAnimationMode={true}
                                     duration={3} autoAnimationStart={false}/>
                        <span className={"detal"}>,</span>
                        <SlotCounter startValue={"00"} value={(newScore % 1 * 100).toFixed(0)} startValueOnce={true}
                                     duration={3} autoAnimationStart={false} animateUnchanged={true}/>
                    </h1>
                    <SubmitButton text={"Pokaż tebelę"} isVisible={showNewScoreButton}
                                  handleOnClick={() => setShowNewScoreDisplay(false)}/>
                </motion.div>}
        </AnimatePresence>
    </AnimatedMain>
}

export default Scoreboard;