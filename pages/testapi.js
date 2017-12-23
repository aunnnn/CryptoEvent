import React, { Component } from 'react';
import coindar from '../services/coindar';
import coinmarketcap from '../services/coinmarketcap';

class TestAPI extends Component {

  state = {
    data: null,
  }

  getData = async () => {
    const cd_data = await coindar('btc')
    const cmc_data = await coinmarketcap()
    this.setState({
      data: cd_data,
    })
  }

  componentDidMount() {
    this.getData()
  }
  
  render() {

    const data = this.state.data
    if (!data) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h1>Test API Page</h1>
        <div>
          {
            data.map((d, i) => {
              return (
                <div key={`listkey-${i}`}>
                  <h4>{d.caption} ({d.coin_symbol})</h4>
                  <p>{d.start_date.format('DD/MM/YYYY')}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default TestAPI;