# Taller

## **Tarea3:** Prueba componente tabla que pinta las key values de un objeto json

Este ejemplo renderiza un componente JsonTable y recibe un objeto JSON jsonData como prop.

De esta manera, el componente JsonTable generará dinámicamente una tabla con las claves y valores del objeto JSON recibido.

```javascript
import React from "react";

interface TableProps {
	data: Record<string, string | number>;
}

const JsonTable: React.FC<TableProps> = ({ data }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Key</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(data).map(([key, value]) => (
					<tr key={key}>
						<td>{key}</td>
						<td>{value}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default JsonTable;
```

¿Cómo sería una prueba para este componente?\
Aquí tenemos un ejemplo:

```javascript
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
});
```

Para probar que la tabla se actualice correctamente cuando cambie el objeto JSON que se pasa como prop, puedes utilizar Jest y React Testing Library. A continuación, te muestro un ejemplo de cómo podrías escribir una prueba para este escenario:

```javascript
describe("JsonTable", () => {
	// ...prueba anterior

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
```
