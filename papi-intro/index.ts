import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient } from "polkadot-api";

const RPC_ENDPOINT = "wss://rpc.polkadot.io";
function makeClient(endpoint: string): PolkadotClient {
  console.log(`Connecting to endpoint: ${endpoint}`);
  const provider = getWsProvider(endpoint);
  const client = createClient(provider);
  return client;
}

makeClient(RPC_ENDPOINT);
