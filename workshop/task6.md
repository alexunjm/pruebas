# Taller

## **Tarea6:** Compatibilidad con servicios o cambios externos

Veamos el numeral 7 de las consideraciones a la hora de hacer pruebas

## Ejemplo compatibilidad

Si tu componente interactúa con otros componentes o servicios, asegúrate de probar diferentes combinaciones y configuraciones para garantizar la compatibilidad adecuada.

```javascript
import { AuthService } from "@/contracts/auth.service";
import React from "react";

type GreetingProps = {
	authService: AuthService,
};

const Greeting: React.FC<GreetingProps> = ({ authService }) => {
	return (
		<div>
			{authService.isLoggedIn ? (
				<h1>Bienvenido, usuario!</h1>
			) : (
				<h1>Inicia sesión para continuar</h1>
			)}
		</div>
	);
};

export default Greeting;
```

En este componente `TextInput`, hemos agregado las siguientes características:

## La prueba sería algo como la siguiente

```javascript
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Greeting from "@/components/greeting";

describe("Greeting", () => {
	test("Muestra el mensaje de bienvenida cuando el usuario ha iniciado sesión", () => {
		// Objeto authService de ejemplo
		const authService = {
			isLoggedIn: true, // Devuelve true para las pruebas
		};

		render(<Greeting authService={authService} />);

		// Verificar que se muestre el mensaje de bienvenida
		expect(screen.getByText("Bienvenido, usuario!")).toBeInTheDocument();
	});

	test("Muestra el mensaje de inicio de sesión cuando el usuario no ha iniciado sesión", async () => {
		const authService = {
			isLoggedIn: false, // Devuelve false para las pruebas
		};

		const { rerender } = render(<Greeting authService={authService} />);

		// Verificar que se muestre el mensaje de inicio de sesión
		expect(
			screen.getByText("Inicia sesión para continuar")
		).toBeInTheDocument();

		// login y render
		authService.isLoggedIn = true;
		// Volver a renderizar el componente con el nuevo estado del mock
		rerender(<Greeting authService={authService} />);

		// Verificar que se muestre el mensaje de "Bienvenido, usuario!"
		expect(screen.getByText("Bienvenido, usuario!")).toBeInTheDocument();
	});
});
```
