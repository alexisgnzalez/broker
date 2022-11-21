const https = require('https');
const fs = require('fs');
var StompServer = require('stomp-broker-js');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var server = https.createServer(options);
var stompServer = new StompServer({
  server: server,
  serverName: "AlexiServer",
  path: "/connections",
  debug: function() {
    console.log("debuguiando socket: ", arguments);
  }
});

server.listen(61614, "0.0.0.0");

stompServer.subscribe("/**", function(msg, headers) {
  var topic = headers.destination;
  console.log(topic, "->{" + (typeof msg) + "}", msg, headers);
});

stompServer.on('connected', function(id, credentials) {
  console.log("on connected event: ", id, credentials);
});

stompServer.on('subscribe', function() {
  console.log("on subscription stuff", arguments);
});

stompServer.on('send', function() {
  console.log("on send stuff: ", arguments);
});

