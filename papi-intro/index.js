"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web_1 = require("polkadot-api/ws-provider/web");
var polkadot_api_1 = require("polkadot-api");
var RPC_ENDPOINT = "wss://rpc.polkadot.io";
function makeClient(endpoint) {
    console.log("Connecting to endpoint: ".concat(endpoint));
    var provider = (0, web_1.getWsProvider)(endpoint);
    var client = (0, polkadot_api_1.createClient)(provider);
    return client;
}
makeClient(RPC_ENDPOINT);
