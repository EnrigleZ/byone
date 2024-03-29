import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux'

import 'antd/dist/antd.css'
import MyLayout from './layout'

import HomePage from './pages/home'
import TestsetPrediction from './pages/test-pred'
import PredictStepPage from './pages/case-pred/pred-step'
import PredictExercisePage from './pages/case-pred/pred-exercise'
import PredictGainPage from './pages/case-pred/pred-gain'
import PredictRoutePage from './pages/case-pred/pred-route'

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <BrowserRouter>
          <MyLayout>
            <Switch>
              <Route path="/test-pred" component={TestsetPrediction} />
              <Route path="/pred-step" component={PredictStepPage} />
              <Route path="/pred-exercise" component={PredictExercisePage} />
              <Route path="/pred-gain" component={PredictGainPage} />
              <Route path="/pred-route" component={PredictRoutePage} />
              {/* <Route path="/recommendation" component={PredictExercisePage} /> */}
              <Route path="/" component={HomePage} />
            </Switch>
          </MyLayout>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App
