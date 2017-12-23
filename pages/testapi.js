import React, { Component } from 'react';
import coindar from '../services/coindar';

class TestAPI extends Component {

  componentDidMount() {
    coindar();
  }
  
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default TestAPI;