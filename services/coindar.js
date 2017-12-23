import fetch from 'isomorphic-fetch';
import moment from 'moment';


const main = async (name='btc') => {
  const res = await fetch(`https://gifebeta.com/crypto/coindar?name=${name}`)
  const json = await res.json()  
  const events = json.result.map(d => {
    return {
      caption: d.caption,
      start_date: moment(d.start_date.split(' ')[0], 'YYYY-MM-DD'),
      coin_symbol: d.coin_symbol,
      coin_name: d.coin_name,
    }
  })
  return events.sort((left, right) => {
    return left.start_date.diff(right.start_date)
  })
}


export default main
