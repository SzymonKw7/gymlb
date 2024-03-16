import AnimatedMain from "../AnimatedMain/AnimatedMain";
import PropTypes from "prop-types";
import InputBox from "../InputBox/InputBox";
import {useState} from "react";
import styles from "./CalculatorWILKS.module.css";
import SubmitButtonBox from "../SubmitButton/SubmitButton";
import unknown from "../../assets/Unknown_person.jpg";
import {useNavigate} from "react-router-dom";

function postUserData(userData, userImage, weightLifted, navigation) {
    const formData = new FormData();

    formData.append("Name", userData.name);
    formData.append("Height", userData.height);
    formData.append("IsMale", userData.isMale);
    formData.append("BodyWeight", userData.weight);
    formData.append("Category", (userData.isPro) ? 0 : 1);
    formData.append("ProfilePicture", userImage);
    formData.append("WeightLifted", weightLifted);

    fetch("User", {
        method: "POST", body: formData
    }).then(response => response.json())
        .then(navigation(`/scoreboard/${userData.name}`))
        .catch(error => console.log(error));
}

function CalculatorWILKS({userData, userImage}) {

    const navigation = useNavigate();
    const [liftedWeight, setLiftedWeight] = useState(0);

    return <AnimatedMain className={styles.main}>
        <h2>Kalkulator<br/><span className={"detal"}>WILKS</span></h2>
        <section className={styles.section}>
            <div className={styles.user}>
                <h5>{(userData.isMale) ? "Uczestnik" : "Uczestniczka"}</h5>
                <img src={(userImage) ? URL.createObjectURL(userImage) : unknown} alt={userData.name}/>
            </div>
            <InputBox inputType={"number"} handleOnChange={setLiftedWeight}
                      title={(userData.isMale) ? "Wycisnął" : "Wycisnęła"}/>
        </section>
        <SubmitButtonBox handleOnClick={() => postUserData(userData, userImage, liftedWeight, navigation)} text={"Oblicz"}/>
    </AnimatedMain>
}

CalculatorWILKS.propTypes = {
    userData: PropTypes.object, userImage: PropTypes.object
};

export default CalculatorWILKS;