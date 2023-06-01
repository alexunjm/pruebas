import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "@/components/text-input";

describe("TextInput", () => {
	it("debería permitir ingresar la cantidad máxima de caracteres", () => {
		const maxLength = 10;
		const label = "Campo de texto";
		const value = "1234567890";

		render(<TextInput label={label} maxLength={maxLength} />);

		const input = screen.getByLabelText(label) as HTMLInputElement; // Aserción de tipo
		fireEvent.change(input, { target: { value } });

		expect(input.value).toBe(value);
		expect(
			screen.queryByText("El texto no debe exceder los 10 caracteres")
		).toBeNull();
	});

	it("debería mostrar un mensaje de error al sobrepasar el límite de caracteres", () => {
		const maxLength = 10;
		const label = "Campo de texto";
		const value = "12345678901";

		render(<TextInput label={label} maxLength={maxLength} />);

		const input = screen.getByLabelText(label) as HTMLInputElement; // Aserción de tipo
		fireEvent.change(input, { target: { value } });

		expect(input.value).toBe(value);
		expect(
			screen.getByText("El texto no debe exceder los 10 caracteres")
		).toBeInTheDocument();
	});
});
