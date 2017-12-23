import moment from 'moment'

export default {
  prices(cmcData) {
    const filtered = cmcData.price_usd.filter(item => {
      return moment(item[0]).format('YYYY') === '2017'
    }) 
    const xPoints = filtered.map(item => moment(item[0]).format('DD MMM YYYY'))
    const yPoints = filtered.map(item => item[1])
    return {
      x: xPoints,
      y: yPoints
    }
  }
}