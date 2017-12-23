import fetch from 'isomorphic-fetch'

export const getListOfTickers = async () => {
  const res = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=100')
  const json = await res.json()
  return json
}

export const getCharts = async (id) => {
  const res = await fetch(`https://graphs.coinmarketcap.com/currencies/${id}/`)
  const price_usd = (await res.json()).price_usd
  return price_usd
}
