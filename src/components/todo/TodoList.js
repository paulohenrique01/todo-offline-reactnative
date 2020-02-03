import React, { useState, useEffect } from "react";
import { AsyncStorage, StyleSheet, View, Text, TextInput, Button, SafeAreaView, FlatList } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uuidv4 from "uuid/v4";
import NetInfo from "@react-native-community/netinfo";

import { Creators as TodoActions } from "../../store/ducks/todos";
import todoService from "../../services/todoService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  input: {
    height: 40,
    borderColor: '#666',
    borderWidth: 1
  },
  button: {
    marginTop: 8
  },
  containerList: {
    flex: 1,
    marginTop: 8,
  },
  item: {
    backgroundColor: '#DCDCDC',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },


});
function TodoList(props) {

  const [text, setText] = useState("");
  const { todos, addTodoRequest, toggleTodo, removeTodo } = props;
  const [online, setOnline] = useState([]);

  const [data, setData] = useState([]);
  useEffect(() => {
    //AsyncStorage.clear();
    getAllTodos();
    NetInfo.addEventListener(state => {
      setOnline(state.isConnected);
    });

    // To unsubscribe to these update, just use:
    //unsubscribe();
  }, []);

  async function getAllTodos() {
    try {
      const { data } = await todoService.getAllTodo();
      setData(data)

    } catch (e) {
      console.log('Erro=>>>> ', JSON.stringify(e))
    }
  }

  function handleSubmit() {

    let todo = { text, hash: uuidv4() }
    console.log(todo)

    addTodoRequest(todo);
    setText("");
  }

  function Item({ todo }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{todo.text} - {todo.id ? 'enviado' : 'não enviado'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>{online ? 'online' : 'offline'}</Text>
        <TextInput style={styles.input} value={text} onChangeText={text => setText(text)} />
        <Button title="Enviar" style={styles.button} onPress={() => handleSubmit()} />
      </View>
     
      <SafeAreaView style={styles.containerList}>
        <FlatList
          data={todos}
          keyExtractor={(todo, index) => index.toString()}
          renderItem={({ item }) => <Item todo={item} />}
        />
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(TodoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

