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
		// Configurar el mock para una petición GET a una URL específica
		mock.onGet("/api/profile").reply(200, mockProfile);
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
