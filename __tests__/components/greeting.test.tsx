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
