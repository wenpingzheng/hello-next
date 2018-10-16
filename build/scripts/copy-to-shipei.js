const fs = require('fs')
const path = require('path')
const copyMap = require('../copy.map.json')
const copyMapLen = Object.keys(copyMap).length

// 配置检查
if(!copyMap || copyMapLen === 0) {
  console.error('copy.map.json is blank')
  return
}

// 项目目录
const projectRoot = path.join(__dirname, '../../')

// 任务列表
let tasks = []

// 预处理配置
var preprocessCount = 0
for (const source in copyMap) {
  if (copyMap.hasOwnProperty(source)) {
    const target = copyMap[source]
    const sourceAbsolute = path.join(projectRoot, source)
    const targetAbsolute = path.join(projectRoot, '..', target)
    fs.access(sourceAbsolute, fs.constants.F_OK | fs.constants.R_OK, (err) => {
      const sourceExist = !err
      fs.access(targetAbsolute, fs.constants.F_OK | fs.constants.R_OK, (err) => {
        const targetExist = !err
        tasks.push({
          source, sourceExist, sourceAbsolute,
          target, targetExist, targetAbsolute
        })
        preprocessCount += 1
        if (preprocessCount === copyMapLen) {
          doTasks()
        }
      })
    })
  }
}


// 执行任务
function doTasks () {
  tasks.forEach((task) => {
    // 源不存在
    if (!task.sourceExist) {
      console.log(`[ignore]\t source file ${task.source} not found`)
      return true
    }
    // 源及目标文件都存在，进行复制
    if (task.targetExist) {
      fs.createReadStream(task.sourceAbsolute).pipe(fs.createWriteStream(task.targetAbsolute))
      console.log(`[override]\t ${task.source}\t>\t${task.target}`)
    // 目标文件不存在
    } else {
      // 检查目标目录是否存在
      const targetDir = path.dirname(task.targetAbsolute)
      fs.access(targetDir, fs.constants.F_OK, (err) => {
        // 目标目录不存在，提示手动创建
        if (err) {
          console.log(`[error] ${targetDir} directory not found, please create manually`)
        // 目标目录存在，进行复制
        } else {
          fs.createReadStream(task.sourceAbsolute).pipe(fs.createWriteStream(task.targetAbsolute))
          console.log(`[new]\t ${task.source}\t>\t${task.target}`)
        }
      })
    }
  })
}
