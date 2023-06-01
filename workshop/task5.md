# Taller

## **Tarea5:** Consideraciones a la hora de realizar pruebas automatizadas

Cuando diseñas casos de prueba, es importante considerar diferentes variaciones para cubrir diversos escenarios y garantizar una cobertura adecuada. Aquí hay algunas cosas en las que puedes pensar para proponer variaciones en tus casos de prueba:

1. **Entradas válidas**: Asegúrate de probar con entradas válidas que cumplan con los requisitos y restricciones establecidos. Por ejemplo, si tienes un campo de entrada de texto que solo permite letras, prueba con diferentes combinaciones de letras válidas.

2. **Entradas inválidas**: Verifica cómo se manejan las entradas inválidas. Por ejemplo, si tienes un campo numérico, prueba con letras o caracteres especiales y comprueba si se muestra el mensaje de error correspondiente.

3. **Límites y rangos**: Considera los límites y rangos esperados para los valores de entrada. Por ejemplo, si tienes un campo de edad que debe estar en el rango de 18 a 65, prueba con valores en ese rango, así como con valores por debajo y por encima del rango.

4. **Casos extremos**: Identifica situaciones extremas o inusuales que podrían afectar el funcionamiento del componente. Por ejemplo, si tienes un campo de texto con límite de caracteres, prueba con el máximo permitido y verifica cómo se maneja.

5. **Comportamiento del usuario**: Piensa en cómo los usuarios interactuarían con el componente y qué acciones podrían realizar. Prueba diferentes secuencias de acciones y verifica si el componente responde correctamente. Por ejemplo, en un formulario, prueba enviarlo sin completar algunos campos requeridos y observa cómo se maneja esa situación.

6. **Casos de borde**: Considera situaciones límite o excepcionales que podrían afectar la lógica del componente. Por ejemplo, si tienes una lista desplegable con opciones, prueba seleccionar la primera y la última opción para asegurarte de que funcione correctamente en ambos extremos.

7. **Compatibilidad**: Si tu componente interactúa con otros componentes o servicios, asegúrate de probar diferentes combinaciones y configuraciones para garantizar la compatibilidad adecuada.

Recuerda que la idea es pensar en diferentes escenarios que puedan poner a prueba la funcionalidad y la robustez del componente. Esto ayudará a identificar posibles problemas y asegurarte de que el componente se comporte correctamente en una variedad de situaciones.

Con el componente formulario vimos los numerales 1 a 4, 6

Veamos el numeral 5

## Ejemplo caso de un comportamiento natural de usuario para un componente de campo de texto con límite de caracteres

```javascript
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
```

En este componente `TextInput`, hemos agregado las siguientes características:

-   `label` es el texto que se muestra como etiqueta para el campo de texto.
-   `maxLength` es la longitud máxima permitida para el campo de texto.
-   `value` es el valor actual del campo de texto, que se mantiene en el estado mediante el hook useState.
-   `errorMessage` es el mensaje de error que se mostrará si se excede el límite de caracteres.
-   `handleChange` es el controlador de eventos que se ejecuta cuando el usuario cambia el valor del campo de texto. Verifica si el nuevo valor excede el límite de caracteres y actualiza el estado en consecuencia.
-   En la función de renderizado, mostramos la etiqueta del campo, el propio campo de texto y el mensaje de error si está presente.
