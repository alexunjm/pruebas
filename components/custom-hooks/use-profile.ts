import { ProfileData } from "@/pages/api/profile";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function useProfile(): {
	profile: ProfileData | undefined;
	error: any;
	isLoading: any;
} {
	const { data, error, isLoading } = useSWR<ProfileData>(
		"/api/profile",
		fetcher
	);

	return {
		profile: data,
		error,
		isLoading,
	};
}

export default useProfile;
