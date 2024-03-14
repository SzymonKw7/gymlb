import AnimatedMain from "../AnimatedMain/AnimatedMain";
import PropTypes from "prop-types";

function CalculatorWILKS({userData, userImage}) {
    return <AnimatedMain>
        <h1>calculatorWILKS</h1>
    </AnimatedMain>
}

CalculatorWILKS.propTypes = {
    userData: PropTypes.object.isRequired,
    userImage: PropTypes.object.isRequired
};

export default CalculatorWILKS;