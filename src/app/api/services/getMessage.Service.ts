export default async function getMessageService(token: any, user1ID: any, user2ID: string) {
	const URL_API = process.env.NEXT_PUBLIC_URL_API;

	if (!URL_API) {
		throw new Error('URL_API environment variable is not set');
	}

	let headersList = {
		"Accept": "*/*",
		"Authorization": `Bearer ${token}`,
	}

	try {
		let response = await fetch(`${URL_API}/get/messages/${user1ID}/${user2ID}`, {
			method: "GET",
			headers: headersList
		});

		let data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error("An error occurred while getting messages", error);
	}
}