import { getWsProvider } from "polkadot-api/ws-provider/web";
import {
  createClient,
  type PolkadotClient,
  type SS58String,
} from "polkadot-api";
import { dot, people } from "@polkadot-api/descriptors";

const RPC_ENDPOINT = "wss://rpc.polkadot.io";
const PEOPLE_RPC_ENDPOINT = "wss://polkadot-people-rpc.polkadot.io";
function makeClient(endpoint: string): PolkadotClient {
  console.log("--------------------------------------");
  console.log("Creating Polkadot client...");
  console.log(`Connecting to endpoint: ${endpoint}`);
  console.log("--------------------------------------");

  const provider = getWsProvider(endpoint);
  const client = createClient(provider);
  return client;
}

async function printChainInfo(client: PolkadotClient) {
  let chain = await client.getChainSpecData();
  let finalizedBlock = await client.getFinalizedBlock();
  console.log("--------------------------------------");
  console.log(
    `Connected to ${chain.name} at block ${finalizedBlock.number}.\n`
  );
  console.log("--------------------------------------");
}
async function getBalance(
  polkadotClient: PolkadotClient,
  address: SS58String
): Promise<BigInt> {
  const dotApi = polkadotClient.getTypedApi(dot);
  const accountInfo = await dotApi.query.System.Account.getValue(address);
  const { free, reserved } = accountInfo.data;
  return free + reserved;
}

async function getDisplayName(
  peopleClient: PolkadotClient,
  address: SS58String
) {
  const peopleApi = peopleClient.getTypedApi(people);
  const accountInfo = await peopleApi.query.Identity.IdentityOf.getValue(
    address
  );
  const displayName = accountInfo?.info.display.value?.asText() || "Unknown";
  return displayName;
}

async function main() {
  const walletAddress = "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr";
  const polkadotClient = makeClient(RPC_ENDPOINT);
  const peopleClient = makeClient(PEOPLE_RPC_ENDPOINT);
  await printChainInfo(peopleClient);
  const balance = await getBalance(polkadotClient, walletAddress);
  console.log("--------------------------------------");
  console.log("Client created successfully.");
  console.log("--------------------------------------");
  const displayName = await getDisplayName(peopleClient, walletAddress);
  console.log(`Balance of ${displayName} (${walletAddress}) is ${balance}.`);
  console.log("--------------------------------------");
  printChainInfo(polkadotClient);
}

main().catch((error) => {
  console.error("Error in main function:", error);
});
