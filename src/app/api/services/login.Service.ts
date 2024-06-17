export default async function loginService(userEmail: string, userPassword: string) {
    const URL_API = process.env.NEXT_PUBLIC_URL_API;

    if (!URL_API) {
        throw new Error('URL_API environment variable is not set');
    }

    let headersList = {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    };

    let bodyContent = JSON.stringify({
        "email": userEmail,
        "password": userPassword
    });

    try {
        let response = await fetch(`${URL_API}/user/login`, {
            method: 'POST',
            headers: headersList,
            body: bodyContent
        });

        if (!response.ok) {
            throw new Error(`HTTP erro! status: ${response.status}`)
        }

        let data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('An error ocurrend during the login process: ', error);
        throw error;
    }

}