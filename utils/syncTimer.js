const schedule = require("node-schedule")
const moment = require("moment")
const { insertJDlist } = require("../controller/JDpromotion/syncJdOrderList")
const { queryData, updateData, insertData } = require("../dataBase/index.js")

const timerFn = async() => {
  // 从同步时间表sync_flag里查询上次更新的时间
  let sql = `select * from sync_flag where sync_type='JDsync'`
  let queryRes = await queryData(sql)
  
  let currentTime = new Date().getTime()
  let startTime = ''
  let endTime = ''
  if(queryRes.length === 0){ // 需要判断一下第一次表中无数据的情况
    startTime = moment(currentTime - 5*60*1000).format('yyyy-MM-DD HH:mm:ss') // 当前时间前5分钟
    endTime = moment(currentTime).format('yyyy-MM-DD HH:mm:ss') // 当前时间
  }else{
    let lastSyncTime = queryRes[0].lastsync_time
    startTime = moment(lastSyncTime).format('yyyy-MM-DD HH:mm:ss') // 上次更新时间
    endTime = moment(lastSyncTime + 5*60*1000).format('yyyy-MM-DD HH:mm:ss') // 距离上次更新时间后5分钟
  }

  console.log('startTime==>', startTime,endTime)
  let timerRes = await Promise.all([insertJDlist(startTime, endTime)])
  
  // 同步完成后更新时间表sync_flag
  let tableRes = ''
  if(queryRes.length === 0){ // 需要判断一下第一次表中无数据的情况,插入一条记录。否则更新表中的记录
    let insertValues = [
      {
        lastsync_time: currentTime,
        sync_type: "JDsync"
      }
    ]
    tableRes = await insertData('sync_flag', ['lastsync_time', 'sync_type'], insertValues)
  }else{
    tableRes = await updateData('sync_flag', ['lastsync_time'], [currentTime], `sync_type='JDsync'`)
  }
  console.log('timerRes==>', timerRes)
}

schedule.scheduleJob('*/30 * * * * *', timerFn)