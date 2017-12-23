const https = require('https')

exports.cmcCharts = function cmcCharts(req, res) {
  const { id } = req.query
  https.get(`https://graphs.coinmarketcap.com/currencies/${id}/`, (res) => {
    res.on('data', (chunk => {
      res.json(chunk)
    }))
  })
}