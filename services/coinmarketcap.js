import fetch from 'isomorphic-fetch'

const main = async () => {
  const res = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
  const json = await res.json()
  return json
}

export default main;
