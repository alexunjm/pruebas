import Profile from "@/components/profile";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Profile", () => {
	// Crear una instancia del mock adapter
	const mock = new MockAdapter(axios);

	const mockProfile = {
		name: "Alex",
		age: 35,
		gender: "masculino",
	};

	beforeAll(() => {
		const HTTP_STATUS = 200;
		const DELAY_IN_MS = 200;
		// Configurar el mock para una petición GET a una URL específica
		mock.onGet("/api/profile").reply(async (config) => {
			await ((delay: number) =>
				new Promise((resolve) => setTimeout(resolve, delay)))(
				DELAY_IN_MS
			);
			return [HTTP_STATUS, mockProfile];
		});
	});

	it("debería mostrar los datos del perfil", async () => {
		render(<Profile />);

		// Verificar que se muestre el mensaje de "Cargando perfil..."
		expect(screen.getByText("Cargando perfil...")).toBeInTheDocument();

		// Esperar a que los datos del perfil se muestren en la pantalla
		await waitFor(() => {
			expect(
				screen.getByText(`Nombre: ${mockProfile.name}`)
			).toBeInTheDocument();
			expect(
				screen.getByText(`Edad: ${mockProfile.age}`)
			).toBeInTheDocument();
			expect(
				screen.getByText(`Sexo: ${mockProfile.gender}`)
			).toBeInTheDocument();
		});
	});
});
