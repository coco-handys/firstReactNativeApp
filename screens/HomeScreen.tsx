import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet
} from 'react-native';

import { useTodos } from '../contexts/TodoContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import TodoItemComponent from '../components/TodoItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}:Props) {

  const {todos, addTodo, deleteTodo, updateTodo} = useTodos();
  const [inputText, setInputText] = useState('');

  const inputRef = useRef<TextInput>(null);

  const handleAddTodo = useCallback(() => {
     if(inputText.trim().length === 0){
       Alert.alert('경고', '할 일 내용을 입력해주세요.');
       return;
     }
     addTodo(inputText);
     setInputText('');

     inputRef.current?.focus();

   },[inputText, addTodo])

    return(
      <View style={styles.screen}>
          <Text style={styles.title}>
              나만의 할 일 리스트 📝
          </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Completed')}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>Go to Settings</Text>
        </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder={'새로운 할 일을 입력하세요'}
              onChangeText={setInputText}
              value={inputText}
              onSubmitEditing={handleAddTodo}
              returnKeyType={'done'}
              blurOnSubmit={false}
            />
            <Button
              title={'추가'}
              onPress={handleAddTodo}
              color={'#3b82f6'}
            />
          </View>
          <FlatList
            data={todos}
            renderItem={({item}) => <TodoItemComponent item={item} />}
            keyExtractor={item => item.key}
          />
      </View>
    )
}

const styles = StyleSheet.create({
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
  navButton: {
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center'
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 5
  },
  listItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listText: {
    fontSize: 18
  },
  deleteIndicator: {
    fontSize: 18,
    color: 'red'
  }
});
