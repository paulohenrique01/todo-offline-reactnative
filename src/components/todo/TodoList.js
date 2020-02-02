import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import  uuidv4  from "uuid/v4";

import { Creators as TodoActions } from "../../store/ducks/todos";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },


});
function TodoList(props) {
 
  const [text, setText] = useState("");

  const { todos, addTodoRequest, toggleTodo, removeTodo } = props;

  function handleSubmit() {
    
    let todo = {text,hash: uuidv4()}
    console.log(todo)

    addTodoRequest(todo);
    setText("");
  }
  return (
    <View>
      <View>  
        <TextInput  value={text} onChangeText={text => setText(text)} />
        <Button title="Enviar"  onPress={() => handleSubmit()}/>
      </View>
      <View style={styles.container}>
        <FlatList
          data={todos}
          renderItem={(todo) => <Text style={styles.item}>{todo.text}</Text>}
        />     
       </View>
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

