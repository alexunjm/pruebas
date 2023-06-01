import { AuthService } from "@/contracts/auth.service";
import React from "react";

type GreetingProps = {
	authService: AuthService;
};

const Greeting: React.FC<GreetingProps> = ({ authService }) => {
	return (
		<div>
			{authService.isLoggedIn ? (
				<h1>Bienvenido, usuario!</h1>
			) : (
				<h1>Inicia sesión para continuar</h1>
			)}
		</div>
	);
};

export default Greeting;
