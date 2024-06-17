export default async function usersService(token: string) {
	const URL_API = process.env.NEXT_PUBLIC_URL_API;

	if (!URL_API) {
		throw new Error('URL_API environment variable is not set');
	}

	let headersList = {
		"Accept": "*/*",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`,
	}

	try {
		let response = await fetch(`${URL_API}/users`, {
			method: "GET",
			headers: headersList
		});

		let data = await response.json();
		// console.log(data);
		return data;
	} catch (error) {
		console.error('An error occurred during listing useres', error);
	}
}