const WebSocket = require('ws');
const plotlib = require('nodeplotlib');
//const webhook = require("webhook-discord")
//const Hook = new webhook.Webhook("https://discordapp.com/api/webhooks/633970167919017985/vkamVqCPNBuxDHPlh1LSscbVuQwqLhmKleYzPdeJ5MzXf7pjglpxbUogho1Bf9U_Rxzk")
var objkeys
var arr = [];
var conn_msg = 
{
  "jsonrpc" : "2.0",
  "id" : 9929,
  "method" : "public/auth",
  "params" : {
    "grant_type" : "client_credentials",
    "client_id" : "62kSpTX9mWSW5",
    "client_secret" : "DPVCM3ZYAHQH5OZEQEYHW5EZ7OGAPUH3",
	"scope":"session:apiconsole"
  }
};

var position_msg = 
    {"jsonrpc": "2.0",
     "method": "public/subscribe",
     "id": 42,
     "params": {
        "channels": ["ticker.BTC-PERPETUAL.raw"]}
    };

var ws = new WebSocket('wss://www.deribit.com/ws/api/v2');
ws.on('message', function incoming(data) {
	objkeys = (Object.keys(JSON.parse(data)))
	if (String(objkeys) == "jsonrpc,method,params") {
		output = JSON.parse(data)
		try {
			console.log(output.params.data.timestamp)
			//arr.push(output.params.data.current_funding)
			//console.log(arr)
		}
		catch(error) {
			console.log("error")
		}
	}

});
ws.onopen = function () {
    ws.send(JSON.stringify(conn_msg));
    ws.send(JSON.stringify(position_msg));

};


