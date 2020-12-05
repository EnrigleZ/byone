import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.css'
import MyLayout from './layout'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyLayout>
          <Switch>
          </Switch>
        </MyLayout>
      </BrowserRouter>
    </div>
  );
}

export default App
