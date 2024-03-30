import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'zustand';

const store = createStore({
  activeDice: false,
  diceValue: 1,
  setActiveDice: (active) => {
    store.setState({ activeDice: active });
    if (active) {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      store.setState({ diceValue: randomValue });
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
``