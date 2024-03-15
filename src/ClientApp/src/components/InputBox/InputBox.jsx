import styled from "styled-components";
import PropTypes from "prop-types";

const LabelStyled = styled.label`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    max-width: 20rem;
    height: 20dvh;
    max-height: 12rem;

    & input {
        height: 100%;
        width: 100%;
        padding: 0.5rem;
        border: none;
        border-radius: 2rem;
        text-align: center;
        background-color: var(--c-bg);
        background-image: var(--g-standard);
        color: var(--c-text);
        font-size: 2rem;
        outline: none;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &[type=file] {
            width: unset;
            aspect-ratio: 1/1;
            border-radius: 50%;
            padding: 0;
            color: transparent;
            background-color: var(--c-bg);
            ${({$userImage}) => $userImage ? `background-image: url(${URL.createObjectURL($userImage)})` : ""};
            background-size: cover;
            background-position: center center;

            &::-webkit-file-upload-button {
                display: none;
            }

            &::file-selector-button {
                display: none;
            }
        }

        &[type=radio] {
            display: none;

            & + label {
                height: 100%;
                max-height: 8rem;
                aspect-ratio: 1/1;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 1.5rem;
                cursor: pointer;
                transition: 0.3s;
                font-size: 1.5rem;
                text-transform: uppercase;
                color: ${({$textColor}) => $textColor ? $textColor : "var(--c-text)"};
                ${({
                       $leftOptionColor,
                       $rightOptionColor
                   }) => (!$leftOptionColor && !$rightOptionColor) ? `background-color: var(--c-bg); background-image: var(--g-standard);` : ""};

                &:first-of-type {
                    background-color: ${({$leftOptionColor}) => $leftOptionColor ? $leftOptionColor : "var(--c-bg)"};
                }

                &:last-of-type {
                    background-color: ${({$rightOptionColor}) => $rightOptionColor ? $rightOptionColor : "var(--c-bg)"};
                }

                &:hover {
                    filter: brightness(1.2);
                    scale: 0.9;
                }
            }

            &:checked + label {
                filter: brightness(1.2);
                scale: 0.8;
            }
        }

    }

    &:has(input[type=radio]) {

        & div {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            gap: 1rem;
        }
    }
    
    &:has(input[type=file]){
        width: 100%;
    }
`

function InputBox({
                      title,
                      inputType,
                      handleOnChange,
                      userImage,
                      leftOption,
                      leftOptionColor,
                      rightOption,
                      rightOptionColor,
                      textColor,
                      ...props
                  }) {

    let input = <input type={inputType} onChange={(e) => handleOnChange(e.target.value)}/>;

    if (inputType === "number") {
        input = <input type={inputType} onChange={(e) => handleOnChange(parseFloat(e.target.value))}/>
    }

    if (inputType === "file") {
        input = <input type={inputType} onChange={(e) => handleOnChange(e.target.files[0])}/>
    }

    if (inputType === "radio") {
        input = <>
            <div>
                <input type={inputType} name={title} id={`${title}1`}
                       onChange={(e) => handleOnChange(e.target.checked)}/>
                <label htmlFor={`${title}1`}>{leftOption}</label>
                <input type={inputType} name={title} id={`${title}2`}/>
                <label htmlFor={`${title}2`}>{rightOption}</label>
            </div>
        </>
    }

    return <LabelStyled $userImage={userImage} $leftOptionColor={leftOptionColor}
                        $rightOptionColor={rightOptionColor} $textColor={textColor}>
        <h5>{title}</h5>
        {input}
    </LabelStyled>
}

InputBox.propTypes = {
    title: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    userImage: PropTypes.object,
    leftOption: PropTypes.string,
    leftOptionColor: PropTypes.string,
    rightOption: PropTypes.string,
    rightOptionColor: PropTypes.string,
    textColor: PropTypes.string
}

export default InputBox;