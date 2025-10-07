import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo, useEffect
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const TODO_STORAGE_KEY = '@MyApp:todos';

export type TodoItem = {
  key: string;
  text: string;
  isCompleted: boolean;
}

export type TodoContextType = {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  deleteTodo: (key:string) => void;
  updateTodo: (key:string, newText:string) => void;
  toggleComplete: (key:string) => void;
  isLoaded: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({children}) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try{
        const storedTods = await AsyncStorage.getItem(TODO_STORAGE_KEY);
        if(storedTods !== null){
          setTodos(JSON.parse(storedTods));
        }
      } catch (e){
        console.error('Failed to load Todos:', e);
      } finally {
        setIsLoaded(true);
      }
    }
    loadTodos();
  }, []);

  useEffect(() => {
    if(!isLoaded){
      return;
    }

    const saveTodos = async () => {
      try{
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem(TODO_STORAGE_KEY, jsonValue);
      } catch(e){
        console.error('Failed to save Todos:', e);
      }
    }
    saveTodos();
  }, [todos, isLoaded]);

  const toggleComplete = useCallback((key:string) => {
    setTodos(currentTodos => currentTodos.map(todo => todo.key === key ? {...todo, isCompleted: !todo.isCompleted}: todo))
  }, []);

  const addTodo = useCallback((text:string) => {
    if(text.trim().length === 0){
      return;
    }
    setTodos(currentTodo => [
      ...currentTodo,
      {
        key: Math.random().toString(),
        text,
        isCompleted: false
      }
    ])
  }, []);

  const updateTodo = useCallback((key:string, newText:string) => {
    if(newText.trim().length === 0) {
      return;
    }
    setTodos(currentTodo => currentTodo.map(todo => todo.key === key ? {...todo, text: newText} : todo));
  }, []);

  const deleteTodo = useCallback((key:string) => {
    setTodos(currentTodo => currentTodo.filter(todo => todo.key !== key));
  } ,[]);

  const contextValue = useMemo(() => ({
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleComplete,
    isLoaded
  }),[todos, addTodo, deleteTodo, updateTodo,toggleComplete, isLoaded]);

  return (
    <TodoContext.Provider value={contextValue}>
    {children}
    </TodoContext.Provider>
  )
}

export const useTodos = () => {
  const context = useContext(TodoContext);
  if(context === undefined){
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}