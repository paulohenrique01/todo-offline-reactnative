import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import TodoList from './components/todo/TodoList';
import configureStore from './store';

const { persistor, store } = configureStore();

export default function Main() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TodoList />
      </PersistGate>
    </Provider>
  );
}





