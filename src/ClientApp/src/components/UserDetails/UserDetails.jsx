import styles from "./UserDetails.module.css";
import {useNavigate, useParams} from "react-router-dom";
import AnimatedMain from "../AnimatedMain/AnimatedMain";
import {useEffect, useState} from "react";
import backArrow from "../../assets/return-up-back-outline.png";
import UTILS from "../../utils";

function UserDetails() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`User/${id}`, {
            method: "GET"
        }).then(response => response.json()).then(data => {
            setUser(data.data);
        });
    }, [id]);

    return <>
        {user && <AnimatedMain className={styles.main}>
            <header className={styles.header}>
                <img src={backArrow} alt={"back"} className={styles.backButton} onClick={() => (navigate(-1))}/>
                <h1>Najsilniejsi<br/>&nbsp;<span className="detal">2024</span></h1>
            </header>
            <div className={styles.imageBlock}>
                <img src={UTILS.getImageUrl(user.profilePicture)} alt={user.name}/>
                <div>
                    <h2>{user.name}</h2>
                    <h3>
                        <span>{String(Math.floor(user.score).toFixed(0)).padStart(3, "0")}</span>
                        <span className={"detal"}>,</span>
                        <span>{String((user.score % 1 * 100).toFixed(0)).padStart(2, "0")}</span>
                        <span className={"detal"}>&nbsp;pkt</span>
                    </h3>
                </div>
            </div>
            <div className={styles.detailsBlock}>
                <h4>Wzrost: <span className={"detal"}>{user.height}cm</span></h4>
                <h4>Waga: <span className={"detal"}>{user.weight}kg</span></h4>
                <h4>Kategoria: <span className={"detal"}>{user.category === 0 ? "Pro" : "Noob"}</span></h4>
            </div>
        </AnimatedMain>}
    </>
}

export default UserDetails;