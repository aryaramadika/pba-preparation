import { getWsProvider } from "polkadot-api/ws-provider/web";
import { createClient, type PolkadotClient } from "polkadot-api";

const RPC_ENDPOINT = "wss://rpc.polkadot.io";
function makeClient(endpoint: string): PolkadotClient {
  console.log(`Connecting to endpoint: ${endpoint}`);
  const provider = getWsProvider(endpoint);
  const client = createClient(provider);
  return client;
}

async function printChainInfo(client: PolkadotClient) {
  let chain = await client.getChainSpecData();
  let finalizedBlock = await client.getFinalizedBlock();
  console.log(
    `Connected to ${chain.name} at block ${finalizedBlock.number}.\n`
  );
}

async function main() {
  const polkadotClient = makeClient(RPC_ENDPOINT);
  console.log("Client created successfully.");
  console.log("Client details:", { polkadotClient });
  printChainInfo(polkadotClient);
}

main().catch((error) => {
  console.error("Error in main function:", error);
});
