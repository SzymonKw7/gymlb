import AnimatedMain from "../AnimatedMain/AnimatedMain";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import styles from "./AddUser.module.css";
import InputBox from "../InputBox/InputBox";
import SubmitButtonBox from "../SubmitButton/SubmitButton";

function AddUser({handleUserDataChange, handleImageChange, userImage}) {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    // const [arm, setArm] = useState(0);
    const [isMale, setIsMale] = useState(true);
    const [isPro, setIsPro] = useState(true);

    function submitUserData() {
        handleUserDataChange({name, weight, height, isMale, isPro});
        navigate("/calc");
    }

    return <AnimatedMain className={styles.main}>
        <header className={styles.header}>
            <span className={styles.backButton} onClick={() => (navigate(-1))}>Back</span>
            <h2>Dodaj <span className={"detal"}>Uczestnika</span></h2>
        </header>
        <article className={styles.formCon}>
            <section className={styles.section}>
                <InputBox title={"Waga"} inputType={"number"} handleOnChange={setWeight}/>
                <InputBox title={"Wzrost"} inputType={"number"} handleOnChange={setHeight}/>
                {/*<InputBox title={"Łapa"} inputType={"number"} handleOnChange={setArm}/>*/}
            </section>
            <section className={styles.section}>
                <InputBox title={"Imię"} inputType={"text"} handleOnChange={setName}/>
                <InputBox title={"Zdjęcie"} inputType={"file"} userImage={userImage} handleOnChange={handleImageChange}/>
            </section>
            <section className={styles.section}>
                <InputBox title={"Uczestnik"} handleOnChange={setIsMale} inputType={"radio"} leftOption={"M"}
                          leftOptionColor={"#59A9F2"} rightOption={"K"} rightOptionColor={"#DD53CE"}
                          textColor={"#070707"}></InputBox>
                <InputBox title={"Kategorie"} handleOnChange={setIsPro} inputType={"radio"} leftOption={"PRO"}
                          rightOption={"NOOB"}></InputBox>
                <SubmitButtonBox text={"Dodaj"} handleOnClick={submitUserData}/>
            </section>
        </article>
    </AnimatedMain>
}

AddUser.propTypes = {
    handleUserDataChange: PropTypes.func.isRequired,
    handleImageChange: PropTypes.func.isRequired,
    userImage: PropTypes.object
}

export default AddUser;