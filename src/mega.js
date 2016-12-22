var mega = require('mega')

var fs = require('fs')

function Mega (options) {
  this.storage = mega(options)
  this.progress = 0
  this.stream = null
  this.file = null
}

Mega.prototype.upload = function (file, callback) {
  var self = this
  setTimeout(function () {
    var stats = fs.statSync('./downloads/' + file)
    self.file = stats
    self.file.name = file
    var stream = fs.createReadStream('./downloads/' + file).pipe(
      self.storage.upload(
        file.split('/')[file.split('/').length - 1]
      )
    )
    self.stream = stream
    stream.on('data', (chunk) => {
      self.progress += chunk.length
    })

    stream.on('end', function () {
      fs.unlink('./downloads/' + file)
      callback()
    })
  }, 1)
}

Mega.prototype.getStream = function () {
  return this.stream
}

Mega.prototype.getProgress = function () {
  if (this.progress && this.file) {
    return this.progress / this.file.size
  } else {
    return null
  }
}

Mega.prototype.getFile = function () {
  return this.file
}
module.exports = Mega
