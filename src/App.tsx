import React from 'react'
import GlobalLayout from './layout/default'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import './assets/styles/common.scss'

const store = createStore(rootReducer)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <GlobalLayout />
      </div>
    </Provider>
  )
}

export default App
