# Taller

## **Tarea 2:** Prueba componente y mockeo de api rest

1.  Descripción del componente Profile

    -   El componente Profile utiliza el hook useSWR para realizar una petición GET a /api/profile cuando el componente se monta.

    -   En la función fetcher, se utiliza axios para realizar la petición GET. Después, se convierte la respuesta en formato JSON utilizando res.data de la respuesta de axios y se actualiza el estado del perfil con los datos obtenidos.

    -   El componente Profile renderiza los datos del perfil en función del estado actual. Si el perfil está cargando (es decir, profile es null), se muestra un mensaje de "Cargando perfil...". Una vez que se obtienen los datos del perfil, se muestra el nombre, la edad y el sexo del perfil.

    -   En este ejemplo se asume que se tiene configurada una ruta /api/profile en el proyecto Next.js que devuelve el objeto {name: 'Alex', age:35, gender:'masculino'}. **Nota:** Puedes implementar la lógica para manejar esta ruta en la carpeta /pages/api de tu proyecto.

2.  Creación del componente con un custom hook que utiliza axios para la petición http

    ```javascript
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
    ```

3.  Custom hook para consultar los datos del perfil

    ```javascript
    // archivo @/components/custom-hooks/use-profile
    import { ProfileData } from "@/pages/api/profile";
    import axios from "axios";
    import useSWR from "swr";

    const fetcher = (url: string) => axios.get(url).then((res) => res.data);

    function useProfile(): {
    	profile: ProfileData | undefined,
    	error: any,
    	isLoading: any,
    } {
    	const { data, error, isLoading } =
    		useSWR < ProfileData > ("/api/profile", fetcher);

    	return {
    		profile: data,
    		error,
    		isLoading,
    	};
    }

    export default useProfile;
    ```

4.  Prueba del componente

    ```javascript
    import Profile from "@/components/profile";
    import { render, screen, waitFor } from "@testing-library/react";
    import axios from "axios";
    import MockAdapter from "axios-mock-adapter";

    describe("Profile", () => {
    	// Crear una instancia del mock adapter
    	const mock = new MockAdapter(axios);

    	const mockProfile = {
    		name: "Alex",
    		age: 35,
    		gender: "masculino",
    	};

    	beforeAll(() => {
    		// Configurar el mock para una petición GET a una URL específica
    		mock.onGet("/api/profile").reply(200, mockProfile);
    	});

    	it("debería mostrar los datos del perfil", async () => {
    		render(<Profile />);

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
    });
    ```

    -   En esta prueba, estamos simulando la respuesta de la petición GET a /api/profile mediante el uso de axios-mock-adapter. Mockeamos el objeto axios y configuramos un valor de retorno simulado que incluye los datos del perfil.

    -   Luego, utilizamos render de React Testing Library para renderizar el componente Perfil. Verificamos que se haya realizado la petición GET esperada utilizando expect(global.fetch).toHaveBeenCalledWith('/api/profile').

    -   Después de renderizar el componente, verificamos que se muestre el mensaje "Cargando perfil...". A continuación, utilizamos waitFor de React Testing Library para esperar a que los datos del perfil se muestren en la pantalla. Dentro de la función de espera, verificamos que los elementos correspondientes a los datos del perfil estén presentes en la pantalla.

    -   Esta prueba asegura que el componente Perfil realice la petición GET esperada, muestre el mensaje de carga y, finalmente, muestre los datos del perfil correctamente en la pantalla.

    -   Recuerda que en este ejemplo estamos mockeando la respuesta de la petición GET para simular los datos del perfil. Asegúrate de ajustar el mock de acuerdo a tu implementación de la ruta /api/profile en tu proyecto Next.js.

5.  Ejecución de las pruebas

    -   En la terminal, asegúrate de estar en la raíz del proyecto y ejecuta el siguiente comando para ejecutar las pruebas:

    ```bash
    npm test
    ```

**[Siguiente Tarea](../../task3/workshop/task3.md)**
