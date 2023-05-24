import { ProfileData } from "@/pages/api/profile";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
	const [profile, setProfile] = useState<ProfileData | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await fetch("/api/profile");
				const data: ProfileData = await response.json();
				setProfile(data);
			} catch (error) {
				console.error("Error al obtener el perfil:", error);
			}
		};

		fetchProfile();
	}, []);

	return (
		<div>
			{profile ? (
				<div>
					<h2>Perfil</h2>
					<p>Nombre: {profile.name}</p>
					<p>Edad: {profile.age}</p>
					<p>Sexo: {profile.gender}</p>
				</div>
			) : (
				<p>Cargando perfil...</p>
			)}
		</div>
	);
};

export default Profile;
