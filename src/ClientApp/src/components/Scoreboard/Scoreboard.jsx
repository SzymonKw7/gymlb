import AnimatedMain from "../AnimatedMain/AnimatedMain";
import {useEffect, useRef, useState} from "react";
import unknown from "../../assets/Unknown_person.jpg";
import styles from "./Scoreboard.module.css";
import scoreboardStyles from "./ScoreboardListElement/ScoreboardListElement.module.css";
import ScoreboardListElement from "./ScoreboardListElement/ScoreboardListElement";
import {Link, useParams} from "react-router-dom";
import SlotCounter from 'react-slot-counter';
import SubmitButton from "../SubmitButton/SubmitButton";
import {AnimatePresence, motion} from "framer-motion";
import PropTypes from "prop-types";
import {animateScroll} from "react-scroll";
import UTILS from "../../utils";

function Scoreboard({handleImageChange}) {

    const {name} = useParams();

    const scoreboard = useRef(null);
    const newUser = useRef(null);
    const usersUnderNew = useRef([]);
    const newScoreDisplay = useRef(null);

    const [users, setUsers] = useState([]);
    const [newUserIndex, setNewUserIndex] = useState(null);
    const [newUserScroll, setNewUserScroll] = useState(null);
    const [scrollToBottom, setScrollToBottom] = useState(false);
    const [newScore, setNewScore] = useState(null);
    const [showNewScoreDisplay, setShowNewScoreDisplay] = useState(true);
    const [showNewScoreButton, setShowNewScoreButton] = useState(false);

    useEffect(() => {
        handleImageChange(null);
        if (users.length === 0) {
            fetch("User").then(response => response.json()).then(res => res.data ? res.data.sort((a, b) => {
                return b.score - a.score;
            }) : [0]).then(res => setUsers(res)).catch(err => console.error(err));
        }
        if (users.length > 0 && name) {
            setNewUserIndex(users.findIndex(user => user.name === name));
        }
    }, [handleImageChange, name, users]);

    useEffect(() => {
        if (scrollToBottom && name && newUser.current !== null) {
            setNewUserScroll(newUser.current.getBoundingClientRect().top);
        }
    }, [scrollToBottom, name]);

    useEffect(() => {
        if (newUserScroll !== null && newUserIndex !== null) {
            scoreboard.current.height = scoreboard.current.scrollHeight;
            scoreboard.current.scrollTop = scoreboard.current.scrollHeight;
            if (usersUnderNew.current.length > 0) {
                usersUnderNew.current = usersUnderNew.current.filter(user => user !== null);
                usersUnderNew.current.forEach(user => {
                    user.style.top = `-${user.offsetHeight + (window.innerWidth * 0.03)}px`
                });
                newUser.current.classList.add(scoreboardStyles.hideTop);
                newUser.current.style.top = newUserIndex === 0 ? `${((newUser.current.offsetHeight * 0.80) + (window.innerWidth * 0.03)) * usersUnderNew.current.length}px` : `${(newUser.current.offsetHeight + (window.innerWidth * 0.03)) * usersUnderNew.current.length}px`;
                if (newUserIndex === 0) {
                    newUser.current.style.scale = "0.88";
                }
            }
            setNewScore(users.find(user => user.name === name).score.toFixed(2));
        }
    }, [name, newUserIndex, newUserScroll, users]);

    useEffect(() => {
        if (newScore !== null && showNewScoreDisplay && name) {
            newScoreDisplay.current.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            setTimeout(() => {
                setShowNewScoreButton(true);
            }, 3000);
        }
    }, [name, newScore, showNewScoreDisplay]);

    useEffect(() => {
        if (!showNewScoreDisplay && name && newUser.current !== null) {
            newUser.current.style.transition = `top ${1 + (0.07 * usersUnderNew.current.length)}s ease-in-out, scale 0.7s, left 0.5s`;
            usersUnderNew.current.forEach(user => {
                user.style.transition = `top ${1 + (0.07 * usersUnderNew.current.length)}s`;
            });
            setTimeout(() => {
                newUser.current.style.scale = newUserIndex === 0 ? "0.95" : "1.1";

                setTimeout(() => {
                    newUser.current.style.top = "0";
                    usersUnderNew.current.forEach(user => {
                        user.style.top = "0";
                    });

                    animateScroll.scrollTo(newUserScroll - scoreboard.current.getBoundingClientRect().top - window.innerWidth * 0.15, {
                        duration: 1000 + (0.1 * usersUnderNew.current.length * 1000),
                        delay: 0,
                        smooth: "easeInOutCubic",
                        containerId: "scoreboard"
                    });

                    setTimeout(() => {
                        newUser.current.style.scale = "1.05";
                        newUser.current.classList.remove(scoreboardStyles.hideTop);
                    }, 1000 + (0.1 * usersUnderNew.current.length * 1000));
                }, 1000);
            }, 500);
            window.history.pushState({}, "", "/scoreboard");
        }
    }, [name, newUserIndex, newUserScroll, showNewScoreDisplay]);

    return <AnimatedMain>
        <h1>Najsilniejsi<br/>&nbsp;<span className="detal">2024</span></h1>
        <section ref={scoreboard} className={styles.scoreboard} id={"scoreboard"}>
            {users.length > 0 && users.map((user, index) => {

                let imageURL = UTILS.getImageUrl(user.profilePicture);

                if (name && index === newUserIndex) {
                    return <ScoreboardListElement key={index} name={user.name} points={user.score} image={imageURL}
                                                  isNew={true} handleRef={newUser} id={user.id}
                                                  onLoad={() => (index === users.length - 1) ? setScrollToBottom(true) : null}/>
                }

                if (index === users.length - 1) {
                    return <ScoreboardListElement key={index} name={user.name} points={user.score} image={imageURL} id={user.id}
                                                  onLoad={() => setScrollToBottom(true)}
                                                  handleRef={(e) => usersUnderNew.current[index - newUserIndex - 1] = e}/>
                }

                if (index > newUserIndex) {
                    return <ScoreboardListElement key={index} name={user.name} points={user.score} image={imageURL}
                                                  handleRef={(e) => usersUnderNew.current[index - newUserIndex - 1] = e} id={user.id}/>
                }

                return <ScoreboardListElement key={index} name={user.name} points={user.score} image={imageURL} id={user.id}/>
            })}
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
            {!name && users.length === 0 && <motion.div initial={{opacity: 1}} animate={{opacity: 1}} exit={{opacity: 0}} className={styles.newScoreDisplay}></motion.div>}
            {name && showNewScoreDisplay &&
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                            className={styles.newScoreDisplay} ref={newScoreDisplay}>
                    <h2>Twój<br/><span className={"detal"}>&nbsp;Wynik</span></h2>
                    <h1>
                        <SlotCounter startValue={"000"} value={String(Math.floor(newScore).toFixed(0)).padStart(3, "0")}
                                     startValueOnce={true} animateUnchanged={true} sequentialAnimationMode={true}
                                     duration={3} autoAnimationStart={false}/>
                        <span className={"detal"}>,</span>
                        <SlotCounter startValue={"00"} value={String((newScore % 1 * 100).toFixed(0)).padStart(2, "0")} startValueOnce={true}
                                     duration={3} autoAnimationStart={false} animateUnchanged={true}/>
                    </h1>
                    <SubmitButton text={"Pokaż tebelę"} isHidden={!showNewScoreButton}
                                  handleOnClick={() => setShowNewScoreDisplay(false)}/>
                </motion.div>}
        </AnimatePresence>
    </AnimatedMain>
}

Scoreboard.propTypes = {
    handleImageChange: PropTypes.func
}

export default Scoreboard;