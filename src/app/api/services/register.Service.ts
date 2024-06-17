export default async function registerService(userName: string, userEmail: string, userPassword: string) {
    const URL_API = process.env.NEXT_PUBLIC_URL_API;

    if (!URL_API) {
        throw new Error('URL_API environment variable is not set');
    }

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
        "name": userName,
        "email": userEmail,
        "password": userPassword
    });

    try {
        let response = await fetch(`${URL_API}/user/create`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('An error ocurrend during the register process: ', error);
    }
}