import { createClient } from 'redis';

const client = createClient({
    username: process.env.REDIS_USER, 
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 6379,
        tls: false,
    }
});

client.on('error', (err) => console.log('Redis Client Error', err));

export default client;
