module.exports = {
  source: '/m/news/index.html',
  output: 'index.tpl',
  document: {
    prepend: `{literal}\n`,
    append: `\n{/literal}`
  }
}