import React, { useState } from "react";

const Formulario: React.FC = () => {
	const [nombre, setNombre] = useState("");
	const [edad, setEdad] = useState(0);
	const [email, setEmail] = useState("");
	const [errorEdad, setErrorEdad] = useState("");

	const cambioDeEdad = (e: { target: { value: any } }) => {
		setErrorEdad("");
		setEdad(Number(e.target.value));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validar la edad antes de enviar el formulario
		if (edad < 18) {
			setErrorEdad("No se permiten menores de edad");
			return;
		}

		// Aquí se realizaría el envío del formulario
		// ...
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="nombre">Nombre:</label>
				<input
					type="text"
					id="nombre"
					value={nombre}
					onChange={(e) => setNombre(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="edad">Edad:</label>
				<input
					type="number"
					id="edad"
					value={edad}
					onChange={cambioDeEdad}
				/>
				{errorEdad && <p>{errorEdad}</p>}
			</div>
			<div>
				<label htmlFor="email">Correo Electrónico:</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<button type="submit">Enviar</button>
		</form>
	);
};

export default Formulario;
