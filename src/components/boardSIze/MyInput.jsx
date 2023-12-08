import styled from "styled-components";
const Input = styled.input`
	width: 50%;
`

const Wrapper = styled.div`
	display: flex;  
	flex-direction: row; 
	width: 20%;             
	justify-content: space-between;

	margin-bottom: 10px;
	font-size: 20px;
	font-family: 'Indie Flower', 'Comic Sans', cursive;

`
const MyInput = (props) => {
	return (        // trả về một gói !
		<Wrapper>
			<label>{props.text}</label>
			<Input onChange={props.onChange} value={props.value} type={"number"}/>
		</Wrapper>
	)
}

export default MyInput