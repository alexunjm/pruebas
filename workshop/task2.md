# Taller

## **Tarea2:** Prueba componente y mockeo de api rest

1.  Descripción del componente Profile

-   El componente Profile utiliza el hook useEffect para realizar una petición GET a /api/profile cuando el componente se monta.
    Luego, al recibir la respuesta, los datos del perfil se almacenan en el estado utilizando el hook useState.

-   En la función fetchProfile, se utiliza la función fetch para realizar la petición GET y se espera la respuesta utilizando await. Después, se convierte la respuesta en formato JSON utilizando response.json() y se actualiza el estado del perfil con los datos obtenidos.

-   El componente Profile renderiza los datos del perfil en función del estado actual. Si el perfil está cargando (es decir, profile es null), se muestra un mensaje de "Cargando perfil...". Una vez que se obtienen los datos del perfil, se muestra el nombre, la edad y el sexo del perfil.

-   En este ejemplo se asume que se tiene configurada una ruta /api/profile en el proyecto Next.js que devuelve el objeto {nombre: 'Alex', edad:35, sexo:'masculino'}. **Nota:** Puedes implementar la lógica para manejar esta ruta en la carpeta /pages/api de tu proyecto.

2.  Creación del componente

    ```javascript
    import { useEffect, useState } from "react";

    const Profile: React.FC = () => {
    	const [profile, setProfile] = useState(null);

    	useEffect(() => {
    		const fetchProfile = async () => {
    			try {
    				const response = await fetch("/api/profile");
    				const data = await response.json();
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
    					<p>Nombre: {profile.nombre}</p>
    					<p>Edad: {profile.edad}</p>
    					<p>Sexo: {profile.sexo}</p>
    				</div>
    			) : (
    				<p>Cargando perfil...</p>
    			)}
    		</div>
    	);
    };

    export default Profile;
    ```

3.  Prueba del componente

-   En esta prueba, estamos simulando la respuesta de la petición GET a /api/profile mediante el uso de jest.spyOn. Mockeamos la función fetch y configuramos un valor de retorno simulado que incluye los datos del perfil.

-   Luego, utilizamos render de React Testing Library para renderizar el componente Perfil. Verificamos que se haya realizado la petición GET esperada utilizando expect(global.fetch).toHaveBeenCalledWith('/api/profile').

-   Después de renderizar el componente, verificamos que se muestre el mensaje "Cargando perfil...". A continuación, utilizamos waitFor de React Testing Library para esperar a que los datos del perfil se muestren en la pantalla. Dentro de la función de espera, verificamos que los elementos correspondientes a los datos del perfil estén presentes en la pantalla.

-   Esta prueba asegura que el componente Perfil realice la petición GET esperada, muestre el mensaje de carga y, finalmente, muestre los datos del perfil correctamente en la pantalla.

-   Recuerda que en este ejemplo estamos mockeando la respuesta de la petición GET para simular los datos del perfil. Asegúrate de ajustar el mock de acuerdo a tu implementación de la ruta /api/profile en tu proyecto Next.js.

    ```javascript
    import Profile from "@/components/profile";
    import { render, screen, waitFor } from "@testing-library/react";

    test("renders perfil data after fetching", async () => {
    	const mockProfile = {
    		name: "Alex",
    		age: 35,
    		gender: "masculino",
    	};

    	// Mockear la respuesta de la petición GET a /api/profile
    	global.fetch = jest.fn(() =>
    		Promise.resolve({
    			json: jest.fn().mockResolvedValueOnce(mockProfile),
    		})
    	) as jest.Mock;

    	render(<Profile />);

    	// Verificar que se haya realizado la petición
    	expect(global.fetch).toHaveBeenCalledWith("/api/profile");

    	// Verificar que se muestre el mensaje de "Cargando perfil..."
    	expect(screen.getByText("Cargando perfil...")).toBeInTheDocument();

    	// Esperar a que los datos del perfil se muestren en la pantalla
    	await waitFor(() => {
    		expect(
    			screen.getByText(`Nombre: ${mockProfile.name}`)
    		).toBeInTheDocument();
    		expect(
    			screen.getByText(`Edad: ${mockProfile.age}`)
    		).toBeInTheDocument();
    		expect(
    			screen.getByText(`Sexo: ${mockProfile.gender}`)
    		).toBeInTheDocument();
    	});
    });
    ```

4.  Ejecución de las pruebas

    -   En la terminal, asegúrate de estar en la raíz del proyecto y ejecuta el siguiente comando para ejecutar las pruebas:

    ```bash
    npm test
    ```
