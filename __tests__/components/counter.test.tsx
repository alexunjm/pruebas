import Counter from "@/components/counter";
import { fireEvent, render, screen } from "@testing-library/react";

test("increments and decrements the counter correctly", () => {
	render(<Counter />);
	const counterElement = screen.getByText("Contador: 0");

	// Verificar que el contador inicialmente sea 0
	expect(counterElement).toBeInTheDocument();

	const incrementButton = screen.getByText("Aumentar");
	const decrementButton = screen.getByText("Disminuir");

	// Incrementar el contador
	fireEvent.click(incrementButton);
	expect(counterElement).toHaveTextContent("Contador: 1");

	// Disminuir el contador 2 veces
	fireEvent.click(decrementButton);
	fireEvent.click(decrementButton);
	expect(counterElement).toHaveTextContent("Contador: -1");
});
