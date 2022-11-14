import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
    appId: process.env.PUSHER_ID as string,
    key: process.env.PUSHER_KEY as string,
    secret: process.env.PUSHER_SECRET as string,
    cluster: process.env.PUSHER_CLUSTER as string,
    useTLS: true,
})

export const clientPusher = new ClientPusher('f08728c3bd424afb7ddd', {
    cluster: 'ap1',
    forceTLS: true,
})