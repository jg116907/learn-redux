import React from 'react';
import ReactDOM from 'react-dom';

// createStore와 rootReducer 불러오기
import { createStore } from 'redux';
import rootReducer from './store/modules';
//Provider
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// redux 개발자 도구 적용
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

// store를 만든 뒤 현재 값 확인
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();

