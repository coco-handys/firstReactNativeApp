import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  StyleSheet
} from 'react-native';

import { CustomButton } from '@components/layout/Button';

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
          <Text style={styles.subTitle}>
            <Text style={{fontWeight: 600}}>Tidy</Text> 깔끔하게 정리하는 하루
          </Text>
          <Text style={styles.title}>
              TO DO LIST
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder={"What's your plan?"}
              onChangeText={setInputText}
              value={inputText}
              onSubmitEditing={handleAddTodo}
              returnKeyType={'done'}
              blurOnSubmit={false}
            />
            <CustomButton
              text={'추가'}
              onPress={handleAddTodo}
              buttonStyle={styles.plusButton}
              textStyle={styles.plusButtonText}
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
    paddingTop: 32,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 28,
    fontWeight: 900,
     marginBottom: 32,
  },
   subTitle: {
    fontSize: 12,
    color: '#657698ff',
    marginBottom: 4,
  },
  plusButton:{
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#8d9fb4ff',
    borderRadius: 6,
  },
  plusButtonText:{
    fontSize:12,
    color: 'white',
     fontWeight: 'bold'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  input: {
    borderBottomColor: '#e9e9e9ff',
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
