import { forwardRef } from "react";
import styled from "styled-components";

const Button = styled.button`
    min-width: 90px;
    max-width: 90px;
    min-height: 50px;
    max-height: 50px;
    text-align: center;
    font-family: 'Indie Flower', 'Comic Sans', cursive;
    font-weight: bold;
    font-size: 1.2em;
    border-radius: .25rem; 
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
    &:disabled{
        opacity: 0.5;
    };
    margin-right: 12px;

`

const CommandBtn = forwardRef( (props, ref) => {
    return(
        <Button ref={ref} onClick={props.onClick}>{props.text}</Button>
    )
})

export default CommandBtn;