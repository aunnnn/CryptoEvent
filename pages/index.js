import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import coindar from '../services/coindar'
import { getCharts, getListOfTickers } from '../services/coinmarketcap';
import transformData from '../utils/transformData'
import TickerDetails from '../components/TickerDetails'


export default class Index extends Component {
  state = {
    coindarData: null,
    cmcData: null,
    listOfTickers: null,
    currentTickerIndex: 0
  }

  _resetGraphData() {
    this.setState({ cmcData: null, coindarData: null })
  }

  _getData = async () => {
    const listOfTickers = await getListOfTickers()
    this.setState({ listOfTickers })

    const coindarData = await coindar('btc')
    const chartResponse = await getCharts(listOfTickers[this.state.currentTickerIndex].id)

    const transformed = transformData.prices(chartResponse)
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
        }
      ]
    }
    this.setState({ coindarData, cmcData })
  }

  componentDidMount() {
    this._getData()
  }

  render() {
    const { coindarData, cmcData, listOfTickers, currentTickerIndex }  = this.state
    return (
      <div>
        <h1>Test API Page</h1>
        {listOfTickers ?
          <select
            value={currentTickerIndex}
            onChange={(e) => {
              this.setState({
                currentTickerIndex: parseInt(e.target.value),
              })
              this._resetGraphData()
              this._getData()
            }}
            style={{ marginBottom: 10 }}
          >
            {listOfTickers.map((ticker, i) => (
              <option
                value={i}
                key={ticker.id}
              >
                {ticker.name}
              </option>
            ))}
          </select> : <div>Loading Ticker List..</div>
        }
        {listOfTickers && 
          <TickerDetails
            ticker={listOfTickers[currentTickerIndex]}
          />
        }
        {cmcData && coindarData ?
          <Line data={cmcData} /> : <div>Loading Graph..</div>
        }
      </div>
    )
  }
}