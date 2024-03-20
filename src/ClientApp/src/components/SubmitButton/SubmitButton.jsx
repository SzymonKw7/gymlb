import styled from "styled-components";
import PropTypes from "prop-types";

const SubmitButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    width: 100%;
    max-width: 20rem;
    height: 20dvh;
    max-height: 12rem;
    background-color: transparent;
    opacity: ${props => props.$isHidden ? 0 : 1};
    transition: opacity 0.5s ease-in-out;

    & button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        max-height: 8rem;
        border-radius: 1.5rem;
        border: none;
        background-color: var(--c-detal);
        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(9, 9, 121, 0) 18%, rgba(0, 0, 0, 0.4767156862745098) 100%);;
        font-size: 1.5rem;
        font-weight: 700;
        font-family: var(--f-main), sans-serif;
        color: var(--c-bg);
        text-transform: uppercase;
        cursor: pointer;
    }
`;

function SubmitButtonBox({handleOnClick, text, isHidden, ...props}) {
    return <SubmitButton $isHidden={isHidden} {...props}>
        <h5>&nbsp;</h5>
        <button onClick={handleOnClick}>{text}</button>
    </SubmitButton>
}

SubmitButtonBox.propTypes = {
    handleOnClick: PropTypes.func,
    text: PropTypes.string,
    isHidden: PropTypes.bool
}

export default SubmitButtonBox;