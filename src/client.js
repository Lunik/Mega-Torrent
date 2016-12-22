var WebTorrent = require('webtorrent')

function Client () {
  this.client = new WebTorrent()
  this.link = ''
  this.torrent = null
}

Client.prototype.download = function (torrentLink, callback) {
  var self = this
  setTimeout(function () {
    self.link = torrentLink
    self.client.add(torrentLink, {path: './downloads'}, function (torrent) {
      self.torrent = torrent
      torrent.on('done', function () {
        callback(torrent)
      })
    })
  }, 1)
}

Client.prototype.stop = function () {
  if (this.torrent) {
    this.torrent.destroy()
  } else {
    return null
  }
}

Client.prototype.getTorrent = function () {
  return this.torrent
}

Client.prototype.getProgress = function () {
  if (this.torrent) {
    return this.torrent.progress
  } else {
    return null
  }
}
module.exports = Client
