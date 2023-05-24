import { NextApiRequest, NextApiResponse } from "next";

export type ProfileData = {
	name: string;
	age: number;
	gender: string;
};

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
	const profile: ProfileData = {
		name: "Alex",
		age: 35,
		gender: "masculino",
	};

	// Simulamos un retardo de 500ms para simular una respuesta asincrónica
	setTimeout(() => {
		res.status(200).json(profile);
	}, 500);
};

export default handler;
