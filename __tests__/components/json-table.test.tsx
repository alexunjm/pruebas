import React from "react";
import { render, screen } from "@testing-library/react";
import JsonTable from "@/components/json-table";

describe("JsonTable", () => {
	it("Debería renderizar una tabla con los key values del objeto", () => {
		const jsonData = {
			name: "John Doe",
			age: 30,
			email: "johndoe@example.com",
		};

		render(<JsonTable data={jsonData} />);

		// Verificar que se muestren los encabezados de la tabla
		expect(screen.getByText("Key")).toBeInTheDocument();
		expect(screen.getByText("Value")).toBeInTheDocument();

		// Verificar que se muestren las filas de la tabla con los datos correspondientes
		expect(screen.getByText("name")).toBeInTheDocument();
		expect(screen.getByText("John Doe")).toBeInTheDocument();

		expect(screen.getByText("age")).toBeInTheDocument();
		expect(screen.getByText("30")).toBeInTheDocument();

		expect(screen.getByText("email")).toBeInTheDocument();
		expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
	});

	it("Debería actualizarse la tabla cuando cambiamos el objeto que pasamos como prop", () => {
		const initialData = {
			name: "John Doe",
			age: 30,
			email: "johndoe@example.com",
		};

		const newData = {
			name: "Jane Smith",
			age: 25,
			email: "janesmith@example.com",
		};

		const { rerender } = render(<JsonTable data={initialData} />);

		// Verificar que la tabla inicial se renderice correctamente
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("30")).toBeInTheDocument();
		expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();

		// Rerenderizar el componente con el nuevo objeto JSON
		rerender(<JsonTable data={newData} />);

		// Verificar que la tabla se actualice con los nuevos datos
		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
		expect(screen.getByText("25")).toBeInTheDocument();
		expect(screen.getByText("janesmith@example.com")).toBeInTheDocument();
	});
});
