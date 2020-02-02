import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { StyleSheet, Text, View } from 'react-native';

import TodoList from './components/todo/TodoList';
import configureStore from './store';

const { persistor, store } = configureStore();

export default function Main() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <TodoList/>
    </PersistGate>
    </Provider>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  



