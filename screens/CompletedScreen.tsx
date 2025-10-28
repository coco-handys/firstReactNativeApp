import {
  View,
  Text,
  FlatList,
  StyleSheet, TouchableOpacity
} from 'react-native';
import { useTodos } from '../contexts/TodoContext';


const CompletedItem = ({item}) => {
  const {todos, toggleComplete, deleteTodo} = useTodos();

  return(
    <TouchableOpacity
      onPress={() => toggleComplete(item.key)}
      onLongPress={() => deleteTodo(item.key)}
    >
    <View style={styles.listItem}>
      <Text style={styles.listTextCompleted}>{item.text}</Text>
    </View>
    </TouchableOpacity>
  )
}


export default function CompletedScreen() {
  const {todos, toggleComplete, deleteTodo} = useTodos();
  const completedTodos = todos.filter(todo => todo.isCompleted);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Complete List</Text>
      {
        completedTodos.length === 0 ? (
          <Text style={styles.emptyText}>완료된 할 일이 없습니다.</Text>
        ) : (
          <FlatList
            data={completedTodos}
            renderItem={({item}) => <CompletedItem item={item} />}
            keyExtractor={item => item.key}
          />
        )}
    </View>
  )}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 12,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listTextCompleted: {
    fontSize: 16,
    textDecorationLine: 'line-through'
  },
  screen: {
    padding: 32,
    flex: 1,
    paddingTop: 32,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
     fontSize: 16,
     marginVertical: 24,
    color: '#9ca3af',
  },
})