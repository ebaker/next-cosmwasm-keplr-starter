import { CosmWasmClient, QueryClient } from "cosmwasm";

// This is your rpc endpoint
const rpcEndpoint = "https://rpc.juno.highlander-nodes.net:26797/";

///getBalance for Juno
async function main() {
  const client = await CosmWasmClient.connect(rpcEndpoint);


  ///coingecko api
  const CoinGecko = require("coingecko-api");
  const CoinGeckoClient = new CoinGecko();
  console.log(client);
  var func = async() => {
    let data = await CoinGeckoClient.ping();
  };

  let data = await CoinGeckoClient.coins.fetchMarketChart('juno');


 const validatorBalance =  await client.getBalance(
    "juno1dru5985k4n5q369rxeqfdsjl8ezutch8y9vuau",
    "ujuno"
  );
  const stakingBalance = await client.getBalance(
    "juno1m4z6c9f0ejr7nd7cpusvpua3yckyueqkd7ksy8",
    "ujuno"
  );
}
main();

///const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
