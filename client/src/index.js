import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

//redux
import { Provider } from 'react-redux'
import { createStore, combineReducers,compose,applyMiddleware } from 'redux'

//引入reducers
import { orderReducer } from './reducers/order/order_Reducers'

//引入中介軟體
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  orderReducer,
  
})
//使用中介軟體時，建立store的方法，需要額外建立一個composeEnhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
