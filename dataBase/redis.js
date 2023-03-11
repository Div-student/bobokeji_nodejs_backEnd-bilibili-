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

const setRedisMap = async (key,field, value) => {
  await client.connect();
  await client.hSet(key,field,value);
  await client.disconnect();
}
exports.setRedisMap = setRedisMap

const getRedisMap = async (key, fild) => {
  await client.connect();
  let value = await client.hGet(key, fild);
  await client.disconnect();
  return value
}
exports.getRedisMap = getRedisMap

const setRedisValue = async (key, value) => {
  await client.connect();
  await client.set(key, value);
  await client.disconnect();
}
exports.setRedisValue = setRedisValue

