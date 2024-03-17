import AnimatedMain from "../AnimatedMain/AnimatedMain";
import {useEffect, useRef, useState} from "react";
import unknown from "../../assets/Unknown_person.jpg";
import styles from "./Scoreboard.module.css";
import ScoreboardListElement from "./ScoreboardListElement/ScoreboardListElement";
import {Link, useParams} from "react-router-dom";

function Scoreboard() {

    const {name} = useParams();

    const scoreboard = useRef(null);
    const newUserElement = useRef(null);

    const [users, setUsers] = useState([]);
    const [scrollToLast, setScrollToLast] = useState(false);
    const [startScroll, setStartScroll] = useState(false);

    useEffect(() => {
        fetch("User").then(response => response.json()).then(res => res.data.sort((a, b) => b.score - a.score)).then(res => setUsers(res)).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (scrollToLast) {
            scoreboard.current.scrollTop = scoreboard.current.scrollHeight;
        }
    }, [scrollToLast]);

    useEffect(() => {
        if (newUserElement.current !== null && startScroll) {
            newUserElement.current.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
            window.history.pushState({}, "", "/#/scoreboard");
        }
    }, [startScroll]);

    return <AnimatedMain>
        <h1>Najsilniejsi<br/>&nbsp;<span className="detal">2024</span></h1>
        <section className={styles.scoreboard} ref={scoreboard}>
            {users.length > 0 ? users.map((user, index) => {
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
                    return <ScoreboardListElement key={user.id} image={imageURL} name={user.name} points={user.score}
                                                  isNew={true} handleRef={newUserElement}/>
                }

                if (name && index === users.length - 1) {
                    return <ScoreboardListElement key={user.id} image={imageURL} name={user.name} points={user.score}
                                                  onLoad={() => setScrollToLast(true)}/>
                }

                return <ScoreboardListElement key={user.id} image={imageURL} name={user.name} points={user.score}/>

            }) : null
            }
        </section>
        <footer className={styles.footer} onClick={() => setStartScroll(true)}>
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
    </AnimatedMain>
}

export default Scoreboard;