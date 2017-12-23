import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import coindar from '../services/coindar'
import { getCharts, getListOfTickers } from '../services/coinmarketcap';
import transformData from '../utils/transformData'

export default class Index extends Component {
  state = {
    coindarData: null,
    cmcData: null,
    listOfTickers: null,
    currentTicker: ['bitcoin', 0, 'BTC'],
  }

  _resetGraphData() {
    this.setState({ cmcData: null, coindarData: null })
  }

  _getData = async (data) => {

    const coinSymbol = data[2]
    const coinName = data[0]

    const coindarData = await coindar(coinSymbol)
    const chartResponse = await getCharts(coinName)
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
    this._getData(this.state.currentTicker)
  }

  render() {
    const { coindarData, cmcData, listOfTickers }  = this.state
    return (
      <div>
        <h1>Test API Page</h1>

        {listOfTickers ?
          <select
            value={this.state.currentTicker}
            onChange={(e) => {
              this.setState({
                currentTicker: e.target.value.split(','),
              })
              this._resetGraphData()
              this._getData(e.target.value.split(','))
            }}
          >
            {listOfTickers.map((ticker, i) => (
              <option
                value={`${ticker.id},${i},${ticker.symbol}`}
                key={ticker.id}
              >
                {ticker.name} ({ticker.symbol})
              </option>
            ))}
          </select> : <div>Loading Ticker List..</div>
        }
        {cmcData && coindarData ?
          <Line data={cmcData} /> : <div>Loading Graph..</div>
        }

        <div>
          {
            coindarData && coindarData.map((d, i) => {
              return (
                <div key={`d-${i}`}>
                  <div>
                    <h4>{d.caption} ({d.coin_name})
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