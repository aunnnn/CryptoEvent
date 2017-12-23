import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import coindar from '../services/coindar'
import { getCharts, getListOfTickers } from '../services/coinmarketcap';
import btcData from '../download.json'
import transformData from '../utils/transformData'

export default class Index extends Component {
  state = {
    coindarData: null,
    cmcData: null,
    listOfTickers: null,
  }

  _getData = async () => {
    const coindarData = await coindar('btc')
    const chartResponse = await getCharts('bitcoin')
    const listOfTickers = await getListOfTickers()

    const transformed = transformData.prices(chartResponse)

    const coindarDict = {};
    coindarData.forEach(d => {
      coindarDict[d.start_date.format('DD MMM YYYY')] = d
    })

    const highest = Math.max(...transformed.y)*0.75

    let count = 0
    const dataYForEvents = transformed.x.map((d) => {
      const event = coindarDict[d]
      if (!event) { return 0 }
      count++
      return highest
    })    

    // alert('Detect: ' + count + 'out of ' + coindarData.length)

    const cmcData = {
      labels: transformed.x,
      datasets: [
        {
          label: 'My First dataset',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: transformed.y
        },
        {
          label: 'Events',
          fill: false,
          lineTension: 0.05,
          backgroundColor: 'rgba(255,0,0,0.7)',
          borderColor: 'rgba(255,0,0,1)',
          pointBorderColor: 'rgba(255,0,0,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 0.5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dataYForEvents,
        }
      ],      
    }
    this.setState({ coindarData, cmcData, listOfTickers })
  }

  componentDidMount() {
    this._getData()
  }

  render() {
    const { coindarData, cmcData, listOfTickers }  = this.state

    if (!coindarData || !cmcData || !listOfTickers) {
      return <div>Loading..</div>
    }

    return (
      <div>
        <h1>Test API Page</h1>
        <Line data={cmcData} />
        <div>
          {
            coindarData.map((d, i) => {
              return (
                <div key={`d-${i}`}>
                  <div>
                    <h4>{d.caption}
                      <em><span>  - {d.start_date.format('DD MMM YYYY')}</span></em>
                    </h4>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}