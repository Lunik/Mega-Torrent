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
