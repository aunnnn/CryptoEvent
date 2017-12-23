import React from 'react'

export default ({ ticker }) => (
  <div style={{ marginBottom: 20 }}>
    {console.log(ticker)}
    <div>${ticker.price_usd} USD{` `}
      <span style={{ color: ticker.percent_change_24h > 0 ? 'green' : 'red' }}>
        ({ticker.percent_change_24h}%)
      </span>
    </div>
    <div>{ticker.price_btc} BTC</div>
  </div>
)
