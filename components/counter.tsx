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
