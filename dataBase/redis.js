const { createClient } = require('redis');

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

const getRedisValue = async (key)=>{
  if(!client.isOpen){
    await client.connect();
  }
  let value = await client.get(key);
  return value
}
exports.getRedisValue = getRedisValue

const setRedisMap = async (key, field, value) => {
  if(!client.isOpen){
    await client.connect();
  }
  await client.hSet(key,field,value);
}
exports.setRedisMap = setRedisMap

const getRedisMap = async (key, fild) => {
  if(!client.isOpen){
    await client.connect();
  }
  let value = await client.hGet(key, fild);
  return value
}
exports.getRedisMap = getRedisMap

const setRedisValue = async (key, value) => {
  if(!client.isOpen){
    await client.connect();
  }
  await client.set(key, value);
}
exports.setRedisValue = setRedisValue

// setRedisMap("bobo11","bobo11","123")

// getRedisValue("bobo")

// getRedisMap("bobo11", "bobo11")

