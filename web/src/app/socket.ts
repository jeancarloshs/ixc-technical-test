import { io } from 'socket.io-client';

// const URL: any = process.env.NEXT_PUBLIC_URL_API;
const URL = "http://127.0.0.1:3001/"
// console.log('URL', URL)

// export const socket = io(URL, {
//     autoConnect: false
// });

export const socket = () => io(URL,
    {
        autoConnect: true
    }
);