# Mega-Torrent
![build-badge](https://travis-ci.org/Lunik/Mega-Torrent.svg)

# Installation
  `$ npm install mega-torrent`

  `var Mega_Torrent = require('mega-torrent')`  

# Usage exemple
#### myapp.js:
```
var Mega_Torrent = require('../src/index.js')
var mega_t = new Mega_Torrent({
  email: "myemail@gmail.com",
  password: "******"
})

var url = "magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4"
mega_t.download(url)

setInterval(function(){
  var client = mega_t.getClients()[url]
  var mega = mega_t.getMegas()[url]
  if(client){
    console.log("Download progress: ", Math.round(client.getProgress() * 100), "%")
  }
  if(mega){
    console.log("Upload progress: ", Math.round(mega.getProgress() * 100), "%")
  }
}, 500)

```
# API
## Main Module
### var mega_t = new Mega_Torrent([options])
  Create new torrent downloader.

#### Supporter options:
  email - User login email (Require)<br>  password - User password (Require)

### mega_t.download(Torrent)
  Start downloading a torrent.

#### Torrent can be:
  • magnet uri (string)<br>  • torrent file (buffer)<br>  • info hash (hex string or buffer)<br>  • parsed torrent (from parse-torrent)<br>  • http/https url to a torrent file (string)<br>  • filesystem path to a torrent file (string)    

### mega_t.getStatus()
  Return the current status of the Mega_Torrent instance.

#### Code:
  • 0 - Doing nothing<br>  • 1 - Downloading the Torrent<br>  • 2 - Uploading the Torrent

### mega_t.getMegas()
  Return running uploading instances. (aka megas)

### mega_t.getClients()
  Return running downloading instances. (aka clients)

## Megas
  Instance of current uploading file to MEGA.

### megas.getStream()
  Return [Node stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) instance.

### megas.getProgress()
  Return the current upload percentage. (between 0 and 1)

### megas.getFile()
  Return [Node fs stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) instance.

## Clients
  Instance of downloading torrent client.

### clients.stop()
  Stop and destroy the current downloading torrent.

### clients.getProgress()
  Return the current download percentage. (between 0 and 1)

### clients.getTorrent()
  Return [WebTorrent torrent](https://webtorrent.io/docs#torrent) instance.
