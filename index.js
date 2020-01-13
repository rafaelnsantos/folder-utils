function exportFolder (dirname, suffix = '', { inject = undefined, mode = 'js' }) {
  const folder = {}
  suffix += `.${mode}`
  require('fs')
    .readdirSync(dirname)
    .forEach(file => {
      if (file.includes('index') || !file.includes(suffix)) return
      const name = file.replace(suffix, '')
      file = dirname + '/' + file
      folder[name] = inject ? require(file).default(inject) : require(file).default
    })
  return folder
}

function exportFolderRoot (dirname, suffix = '', { inject = undefined, mode = 'js' }) {
  let folder = {}
  suffix += `.${mode}`
  require('fs')
    .readdirSync(dirname)
    .forEach(file => {
      if (file.includes('index') || !file.includes(suffix)) return
      const name = file.replace(suffix, '')
      file = dirname + '/' + file
      folder = { ...folder, ...inject ? require(file).default(inject) : require(file).default }
    })
  return folder
}

function requireFolder (dirname, suffix = '', { inject = undefined, mode = 'js' }) {
  suffix += `.${mode}`
  require('fs')
    .readdirSync(dirname)
    .forEach(file => {
      if (file.includes('index') || !file.includes(suffix)) return
      file = dirname + '/' + file
      inject ? require(file).default(inject) : require(file).default
    })
}

module.exports = { exportFolder, requireFolder, exportFolderRoot }
