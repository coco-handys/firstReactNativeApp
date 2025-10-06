import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo
} from 'react';

export type TodoItem = {
  key: string;
  text: string;
}

export type TodoContextType = {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  deleteTodo: (key:string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({children}) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = useCallback((text:string) => {
    if(text.trim().length === 0){
      return;
    }
    setTodos(currentTodo => [
      ...currentTodo,
      {
        key: Math.random().toString(),
        text
      }
    ])
  }, []);

  const deleteTodo = useCallback((key:string) => {
    setTodos(currentTodo => currentTodo.filter(todo => todo.key !== key));
  } ,[]);

  const contextValue = useMemo(() => ({
    todos,
    addTodo,
    deleteTodo,
  }),[todos, addTodo, deleteTodo]);

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