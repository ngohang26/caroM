import styled from "styled-components";

const Button = styled.button`
    min-width: 90px;
    max-width: 90px;
    min-height: 50px;
    max-height: 50px;
    text-align: center;
    font-family: 'Indie Flower', 'Comic Sans', cursive;
    font-weight: bold;
    font-size: 1.5em;
    border-radius: .25rem; 
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
    &:hover {
        background-color: #17a2b8;
        cursor: pointer;
    }
    margin-right: 12px;
`

export default function MyButton (props) {
    return <Button onClick={props.onClick}>OK</Button>
}