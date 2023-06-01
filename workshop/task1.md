# Taller

## **Tarea 1:** Pruebas a un componente en un proyecto NextJS

1.  Configuración inicial

    -   Asegúrate de tener NodeJS y npm instalados en tu sistema.
    -   Abre una terminal en el directorio y ejecuta el siguiente comando para inicializar un nuevo proyecto NextJS:

    ```bash
    npx create-next-app --example with-jest with-jest-app
    ```

2.  Veamos un ejemplo de una prueba

    `__tests__/index.test.tsx`

3.  Creación de pruebas a un componente

    -   Crea un directorio llamado `__tests__` en la raíz del proyecto (si aún no existe).
    -   Dentro de `__tests__`, crea un archivo llamado components/counter.test.tsx.
    -   Abre el archivo y escribe el siguiente código para realizar una prueba unitaria de ejemplo:

    ```javascript
    import Counter from "@/components/counter";
    import { render, fireEvent, screen } from "@testing-library/react";

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
    ```

4.  Componente que satisface las pruebas

    ```javascript
    import { useState } from "react";

    const Counter = () => {
    	const [count, setCount] = useState(0);

    	const handleIncrement = () => {
    		setCount((prevCount) => prevCount + 1);
    	};

    	const handleDecrement = () => {
    		setCount((prevCount) => prevCount - 1);
    	};

    	return (
    		<div>
    			<h1>Contador: {count}</h1>
    			<button onClick={handleIncrement}>Aumentar</button>
    			<button onClick={handleDecrement}>Disminuir</button>
    		</div>
    	);
    };

    export default Counter;
    ```

5.  Ejecución de las pruebas

    -   En la terminal, asegúrate de estar en la raíz del proyecto y ejecuta el siguiente comando para ejecutar las pruebas:

    ```bash
    npm test
    ```

¡Y eso es todo! Ahora deberías tener un entorno configurado para realizar pruebas unitarias en tu proyecto Next.ts. Puedes agregar más pruebas en el directorio **`__tests__`** siguiendo el mismo patrón que se muestra en el ejemplo.

**[Siguiente Tarea](../../task2/workshop/task2.md)**
