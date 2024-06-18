export default async function postMessageService(token: any, userName: string, userEmail: string, receivedID: any, sendToID: string, message: string) {
	const URL_API = process.env.NEXT_PUBLIC_URL_API;

	if (!URL_API) {
		throw new Error('URL_API environment variable is not set');
	}

	let headersList = {
		"Accept": "*/*",
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}

	let bodyContent = JSON.stringify({
		"name": userName,
		"email": userEmail,
		"receivedID": receivedID,
		"sendToID": sendToID,
		"message": message
	});

	try {
		let response = await fetch(`${URL_API}/sent/message`, {
			method: "POST",
			body: bodyContent,
			headers: headersList
		});

		let data = await response.json();
		console.log('data', data);
		return data;
	} catch (error) {
		console.log("An error occurred while sending the message", error);
	}
}