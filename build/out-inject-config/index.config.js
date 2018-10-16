module.exports = {
  source: '/index.html',
  output: '[name].tpl',
  document: {
    prepend: `{literal}\n`,
    append: `\n{/literal}`
  },
  head: {
    append: `
      {/literal}
        <script>
          try{
            window.rcdTopStaticData = {json_encode($topdata)}
          } catch(e) {}
          window._xw_server_timestamp = {$smarty.now}
        </script>
      {literal}
    `
  }
}