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
      <Text style={styles.title}>완료된 할 일 목록 ✅</Text>
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
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listTextCompleted: {
    fontSize: 16,
    color: '#9ca3af',
    textDecorationLine: 'line-through'
  },
  screen: {
    padding: 20,
    flex: 1,
    paddingTop: 48,
    backgroundColor: '#f0f4f8'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 20,
    fontSize: 16
  },
})