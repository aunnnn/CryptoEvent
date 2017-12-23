import fetch from 'isomorphic-fetch'

export const getListOfTickers = async () => {
  const res = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=300')
  const json = await res.json()
  return json
}

export const getCharts = async (id='bitcoin') => {
  const res = await fetch(`https://api.platonos.com/cryptoChart/${id}`)
  const json = (await res.json())
  return json
}
