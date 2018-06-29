import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; 

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <BurgerBuilder />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
