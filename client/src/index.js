import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import configureStore from './store/configureStore';
import { saveState, loadState } from './store/localStorage';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';



const preloadedState = loadState()
const store = configureStore(preloadedState)

store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
