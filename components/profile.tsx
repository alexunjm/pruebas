import useProfile from "@/components/custom-hooks/use-profile";

const Profile: React.FC = () => {
	const { profile, error, isLoading } = useProfile();

	if (error) return <div>Error de comunicación</div>;
	if (isLoading) return <div>Cargando perfil...</div>;

	// render data
	return profile ? (
		<div>
			<h2>Perfil</h2>
			<p>Nombre: {profile.name}</p>
			<p>Edad: {profile.age}</p>
			<p>Sexo: {profile.gender}</p>
		</div>
	) : (
		<p>Información corrupta {JSON.stringify({ profile }, null, 2)}</p>
	);
};

export default Profile;
