import AnimatedMain from "../../AnimatedMain/AnimatedMain";
import {useEffect, useState} from "react";
import unknown from "../../assets/Unknown_person.jpg";
import styles from "./Scoreboard.module.css";
import ScoreboardListElement from "./ScoreboardListElement/ScoreboardListElement";

function Scoreboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    fetch("User").then(response => response.json()).then(res => res.data.sort((a, b) => b.score - a.score)).then(res => setUsers(res)).catch(err => console.error(err));
    }, []);

    return <AnimatedMain>
        <h1>Najsilniejsi<br/>&nbsp;<span className="detal">2024</span></h1>
        <section className={styles.scoreboard}>
            {users.length > 0 ? users.map((user, index) => <ScoreboardListElement key={user.id}
                                                                                  image={user.profilePicture || unknown}
                                                                                  name={user.name}
                                                                                  points={user.score}/>) : null}
        < /section>
        <footer className={styles.footer}>
            <h3>Czym jest<br/><h2 className="detal">WILKS?</h2></h3>
            <h5>To matematyczny współczynnik<br/><span className={"regular"}>do pomiaru</span> <span
                className={"detal"}>względnych sił.</span><br/><span className={"regular"}>Dzięki niemu jesteśmy w stanie sklasyfikować</span><br/>
                wszystkich uczestników razem,<br/><span
                    className={"detal"}>bez podziału na kategorie wagowe i płeć.</span>
            </h5>
            <h5><span className={"regular"}>Wynik obliczamy na podstawie</span><br/>wagi zawodnika i wyciśniętego
                ciężaru.</h5>
        </footer>
    </AnimatedMain>
}

export default Scoreboard;