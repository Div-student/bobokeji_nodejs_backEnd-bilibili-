const { createClient } = require('redis');

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

const getRedisValue = async (key)=>{
  await client.connect();
  let value = await client.get(key);
  await client.disconnect();
  return value
}
exports.getRedisValue = getRedisValue

const setRedisValues = async (keyValues) => {
  await client.connect();
  keyValues.forEach(async item => {
    await client.set(Object.keys(item)[0], Object.values(item)[0]);
  })
  await client.disconnect();
}
exports.setRedisValues = setRedisValues

const setRedisValue = async (key, value) => {
  await client.connect();
  await client.set(key, value);
  await client.disconnect();
}
exports.setRedisValue = setRedisValue

