import Redis from 'ioredis';
import process from 'process';

let redis = new Redis(process.env.REDIS_URL!);

export default redis;