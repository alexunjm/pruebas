import React, { useState } from "react";

interface TextInputProps {
	label: string;
	maxLength: number;
}

const TextInput: React.FC<TextInputProps> = ({ label, maxLength }) => {
	const inputId = `${label}-input`; // Genera un id único para el control de formulario return (

	const [value, setValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setValue(newValue);

		if (newValue.length > maxLength) {
			setErrorMessage(
				`El texto no debe exceder los ${maxLength} caracteres`
			);
		} else {
			setErrorMessage("");
		}
	};

	return (
		<div>
			<label htmlFor={inputId}>{label}</label>{" "}
			{/* Establece el atributo "for" con el id del control */}
			<input
				id={inputId}
				type="text"
				maxLength={maxLength}
				value={value}
				onChange={handleChange}
			/>
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	);
};

export default TextInput;
