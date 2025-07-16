import { getWsProvider } from "polkadot-api/ws-provider/web";
import {
  createClient,
  type PolkadotClient,
  type SS58String,
} from "polkadot-api";
import { dot, people, collectives } from "@polkadot-api/descriptors";

const RPC_ENDPOINT = "wss://rpc.polkadot.io";
const PEOPLE_RPC_ENDPOINT = "wss://polkadot-people-rpc.polkadot.io";
const COLLECTIVES_RPC_ENDPOINT = "wss://polkadot-collectives-rpc.polkadot.io";
const WALLET_ADDRESS = "15DCZocYEM2ThYCAj22QE4QENRvUNVrDtoLBVbCm5x4EQncr";

interface FellowshipMember {
  address: SS58String;
  rank: number;
}
function makeClient(endpoint: string): PolkadotClient {
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

async function getFellowshipMembers(
  collectivesClient: PolkadotClient
): Promise<FellowshipMember[]> {
  const collectivesApi = collectivesClient.getTypedApi(collectives);
  const rawMembers =
    await collectivesApi.query.FellowshipCollective.Members.getEntries();
  const data = rawMembers.map((m) => {
    return { address: m.keyArgs[0], rank: m.value };
  });
  return data;
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
  const polkadotClient = makeClient(RPC_ENDPOINT);
  const peopleClient = makeClient(PEOPLE_RPC_ENDPOINT);
  await printChainInfo(peopleClient);
  await printChainInfo(polkadotClient);
  const collectivesClient = makeClient(COLLECTIVES_RPC_ENDPOINT);
  await printChainInfo(collectivesClient);

  const members = await getFellowshipMembers(collectivesClient);

  console.log("Generating table...");
  const table = [];
  for (const { address, rank } of members) {
    const balance = await getBalance(polkadotClient, address);
    const displayName = await getDisplayName(peopleClient, address);
    table.push({ rank, displayName, address, balance });
    // console.log(`Balance of ${displayName} (${WALLET_ADDRESS}) is ${balance}.`);
  }
  table.sort((a, b) => b.rank - a.rank);
  console.table(table);

  console.log(`Done!`);
  process.exit(0);
}

main().catch((error) => {
  console.error("Error in main function:", error);
});
