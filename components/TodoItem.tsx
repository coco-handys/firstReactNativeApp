import { useCallback, useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import {useTodos} from '../contexts/TodoContext';
import { CustomButton } from './layout/Button';

const TodoItem = ({item}) => {
 const { deleteTodo, updateTodo, toggleComplete } = useTodos();
 const [isEditing, setIsEditing] = useState(false);
 const [editText, setEditText] = useState(item.text);

 const handleUpdate = useCallback(() => {
   if(editText.trim().length === 0){
     Alert.alert('Error', '할 일 내용을 입력해주세요.', [
       {text:'취소'},
       {text: '삭제', onPress: () => deleteTodo(item.key)}
     ]);
     return;
   }
   updateTodo(item.key, editText);
   setIsEditing(false);
 }, [item.key, editText, updateTodo, deleteTodo]);

 if(isEditing){
   return(
     <View style={styles.listItemEditing}>
       <TextInput
         style={styles.editInput}
         onChangeText={setEditText}
         value={editText}
         autoFocus
         onSubmitEditing={handleUpdate}
       />
       <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
         <Text style={styles.saveButtonText}>💾 저장</Text>
       </TouchableOpacity>
     </View>
   )
 }

 return (
   <TouchableOpacity
     onLongPress={() => setIsEditing(true)}
     onPress={() => toggleComplete(item.key)}
   >
     <View style={[styles.listItem, item.isCompleted && styles.listItemCompleted]}>
       <Text style={[styles.listText, item.isCompleted && styles.listTextCompleted]}>{item.text}</Text>
       <CustomButton 
         text={'Delete'}
         onPress={() => deleteTodo(item.key)}
         textStyle={styles.deleteButtonText}
       />
     </View>
   </TouchableOpacity>
 )
}

export default TodoItem;

const styles = StyleSheet.create({
   listItemEditing: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
   },
   deleteButtonText:{
      fontSize: 12,
      color: '#d45353ff',
      fontWeight: 'bold',
   },
    editInput: {
      flex: 1,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 8,
      marginRight: 10,
    },
    saveButton: {
      backgroundColor: '#3b82f6',
      padding: 10,
      borderRadius: 5,
    },
    saveButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: '#eceef4ff',
      borderWidth: 1,
      padding: 16,
      marginBottom: 10,
      borderRadius: 6,
    },
    listText: {
      fontSize: 16,
      fontWeight: 600,
      color: '#404044ff',
       },
    deleteIndicator: {
      fontSize: 18,
    },
    listItemCompleted: {
      backgroundColor: '#f3f4f5ff',
      borderWidth: 0,
    },
    listTextCompleted: {
      textDecorationLine: 'line-through',
      color: '#a3a9b2ff',
      fontWeight: 'normal',
    },
})