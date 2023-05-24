import Profile from "@/components/profile";
import { render, screen, waitFor } from "@testing-library/react";

test("renders perfil data after fetching", async () => {
	const mockProfile = {
		name: "Alex",
		age: 35,
		gender: "masculino",
	};

	// Mockear la respuesta de la petición GET a /api/profile
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: jest.fn().mockResolvedValueOnce(mockProfile),
		})
	) as jest.Mock;

	render(<Profile />);

	// Verificar que se haya realizado la petición
	expect(global.fetch).toHaveBeenCalledWith("/api/profile");

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
