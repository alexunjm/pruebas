# Taller

## **Tarea 4:** Prueba formulario

En este componente de formulario, utilizamos el estado para mantener los valores de los campos (nombre, edad, email) y el estado errorEdad para almacenar el mensaje de error cuando la edad es menor a 18. La función handleSubmit se ejecuta cuando se envía el formulario y realiza la validación de la edad antes de enviar los datos.

```javascript
import React, { useState } from "react";

const Formulario: React.FC = () => {
	// hooks para manejo del estado del componente y reactivo ante el cambio
	const [nombre, setNombre] = useState("");
	const [edad, setEdad] = useState(0);
	const [email, setEmail] = useState("");
	const [errorEdad, setErrorEdad] = useState("");

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
					onChange={(e) => setEdad(Number(e.target.value))}
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
```

¿Cómo sería una prueba para este componente?\
Aquí tenemos un ejemplo:

```javascript
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Formulario from "@/components/formulario";

describe("Formulario", () => {
	it("debería mostrar un mensaje de error cuando la edad es menor a 18", () => {
		const { getByLabelText, getByText } = render(<Formulario />);
		const edadInput = getByLabelText("Edad:");
		const submitButton = getByText("Enviar");

		fireEvent.change(edadInput, { target: { value: "17" } });
		fireEvent.click(submitButton);

		expect(getByText("No se permiten menores de edad")).toBeInTheDocument();
	});

	it("no debería mostrar un mensaje de error cuando la edad es mayor o igual a 18", () => {
		const { getByLabelText, getByText, queryByText } = render(
			<Formulario />
		);
		const edadInput = getByLabelText("Edad:");
		const submitButton = getByText("Enviar");

		fireEvent.change(edadInput, { target: { value: "18" } });
		fireEvent.click(submitButton);

		expect(queryByText("No se permiten menores de edad")).toBeNull();
	});
});
```

En estas pruebas, utilizamos render de @testing-library/react para renderizar el componente Formulario. Luego, seleccionamos el campo de entrada de edad y el botón de enviar utilizando las funciones getByLabelText y getByText, respectivamente. Utilizamos fireEvent.change para simular un cambio en el campo de entrada de edad y fireEvent.click para simular un clic en el botón de enviar.

En la primera prueba, establecemos el valor de la edad en 17 y hacemos clic en el botón de enviar. Luego verificamos que aparezca el mensaje de error "No se permiten menores de edad".

En la segunda prueba, establecemos el valor de la edad en 18 y hacemos clic en el botón de enviar. Luego verificamos que el mensaje de error no esté presente.

## ¿Cómo probar que se limpia la validación?

```javascript
describe("Formulario", () => {
	// ...pruebas anteriores

	it("debería limpiar el mensaje de error cuando se corrige la edad", async () => {
		const { getByLabelText, getByText, queryByText } = render(
			<Formulario />
		);
		const edadInput = getByLabelText("Edad:");
		const submitButton = getByText("Enviar");

		fireEvent.change(edadInput, { target: { value: "17" } });
		fireEvent.click(submitButton);

		expect(getByText("No se permiten menores de edad")).toBeInTheDocument();

		fireEvent.change(edadInput, { target: { value: "18" } });

		// Esperamos un breve momento para que se realice la validación y se limpie el mensaje de error
		await waitFor(() => {
			expect(queryByText("No se permiten menores de edad")).toBeNull();
		});
	});
});
```

## Preguntas

1. ¿Funciona?

2. ¿Qué debemos corregir para que funcione?

```javascript
// ...
const [errorEdad, setErrorEdad] = useState("");

const cambioDeEdad = (e: { target: { value: any } }) => {
	setErrorEdad("");
	setEdad(Number(e.target.value));
};

const handleSubmit = (e: React.FormEvent) => {
	// ...
};
```

y en el componente utilizar la función `cambioDeEdad` en el `onChange` del campo de texto para la edad

```javascript
<div>
	<label htmlFor="edad">Edad:</label>
	<input type="number" id="edad" value={edad} onChange={cambioDeEdad} />
	{errorEdad && <p>{errorEdad}</p>}
</div>
```

**[Siguiente Tarea](../../task5/workshop/task5.md)**
