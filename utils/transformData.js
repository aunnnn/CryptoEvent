import moment from 'moment'

export default {
  prices(cmcData) {
    const xPoints = cmcData.price_usd.map(item => moment(item[0]).format('DD MMM YYYY'))
    const yPoints = cmcData.price_usd.map(item => item[1])
    return {
      x: xPoints,
      y: yPoints
    }
  }
}