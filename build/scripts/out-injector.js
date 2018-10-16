const fs = require('fs')
const path = require('path')
const readdirp = require('readdirp')

const configDir = path.join(__dirname, '../out-inject-config')
const outDir = path.join(__dirname, '../../out')

console.log(`=== OUT HTML INJECT ===`)

// 处理配置文件
function handleConfig (config) {
  const source = path.join(outDir, config.source) // 文件路径
  const sourceDir = path.dirname(source) // 文件所在目录
  const sourceExtname = path.extname(source) // 扩展名
  const sourceBasename = path.basename(source, sourceExtname) // 文件名(不含扩展名)
  const outputFileName = (config.output || '[name].injected.html').replace(/\[name\]/g, sourceBasename) // output 文件名
  const outputAbsPath = path.join(sourceDir, outputFileName) // 输出文件的绝对路径
  // 检查源文件是否存在
  const exist = fs.existsSync(source)
  if (!exist) {
    console.error(`source file ${config.source} is not exist!`)
    return
  }
  var count = 0
  // 读取文件
  var html = fs.readFileSync(source, 'utf-8')

  // 处理 re 配置
  for (let node in re) {
    if (config[node]) {
      for (let position in re[node]) {
        if (config[node][position]) {
          let regexp = re[node][position].regexp
          let fn = re[node][position].fn(config[node][position])
          html = html.replace(regexp, fn)
          count += 1
        }
      }
    }
  }

  // 处理标题
  if (config.titleTag) {
    html = html.replace(/<title[^>]*>.*<\/title>/, config.titleTag)
    count += 1
  }

  // 处理 meta[name]
  if (config.metaTag) {
    for (let name in config.metaTag) {
      html = html.replace(new RegExp(`<meta name="${name}"[^>]+>`, 'gm'), config.metaTag[name])
      count += 1
    }
  }
  // 处理 custom
  if (config.custom && config.custom.length > 0) {
    config.custom.forEach(([regexp, fn]) => {
      html = html.replace(regexp, fn)
      count += 1
    })
  }
  // 写文件
  fs.writeFileSync(outputAbsPath, html, {encoding: 'utf-8'})
  // 输出结果
  console.log(`${config.source} => ${outputFileName} (${count} replaces) [OK]`)
}

// 遍历配置目录
readdirp({ root: configDir, fileFilter: '*.config.js' })
  .on('data', function (entry) {
    console.log('entry:' + entry.fullPath, entry.path)
    const config = require(entry.fullPath)
    if (config && config.source) {
      console.log(`using config <${entry.path}>`)
      handleConfig(config)
    } else {
      console.error(`config file ${entry.path} is not valid!`)
    }
  })

/** document / head / body 的处理规则 */
var re = {}
re.document = {}
re.head = {}
re.body = {}

re.document.prepend = {
  regexp: new RegExp('^'),
  fn: (str) => {
    return function () {
      return str
    }
  }
}
re.document.append = {
  regexp: new RegExp('$'),
  fn: (str) => {
    return function () {
      return str
    }
  }
}
re.head.prepend = {
  regexp: new RegExp('(<head>)'),
  fn: (str) => {
    return function (match, p1) {
      return p1 + str
    }
  }
}
re.head.append = {
  regexp: new RegExp('(</head>)'),
  fn: (str) => {
    return function (match, p1) {
      return str + p1
    }
  }
}
re.body.prepend = {
  regexp: new RegExp('(<body>)'),
  fn: (str) => {
    return function (match, p1) {
      return p1 + str
    }
  }
}
re.body.append = {
  regexp: new RegExp('(</body>)'),
  fn: (str) => {
    return function (match, p1) {
      return str + p1
    }
  }
}