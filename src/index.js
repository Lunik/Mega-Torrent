var Client = require('./client.js')
var Mega = require('./mega.js')

function MegaTorrent (data) {
  this.email = data.email
  this.password = data.password
  this.status = 0
  this.megas = []
  this.clients = []
}

MegaTorrent.prototype.download = function (url) {
  var self = this
  setTimeout(function () {
    var c = new Client()
    self.clients[url] = c
    c.download(url, function (torrent) {
      delete self.clients[url]
      torrent.files.forEach(function (file) {
        var m = new Mega({email: self.email, password: self.password})
        self.megas[url] = m
        m.upload(file.name, function () {
          self.status = 0
          delete self.megas[url]
        })
        self.status = 2
      })
    })
    self.status = 1
  }, 1)
}

MegaTorrent.prototype.getStatus = function () {
  return this.status
}

MegaTorrent.prototype.getClients = function () {
  return this.clients
}

MegaTorrent.prototype.getMegas = function () {
  return this.megas
}
module.exports = MegaTorrent
