import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
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
