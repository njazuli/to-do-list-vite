import { createContext, useState, useEffect } from 'react';
import { generateRandomId } from '../utils/index';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [newTask, setNewTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState([0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [priority, setPriority] = useState('');
  const [error, setError] = useState('');
  const [openExtraDiv, setOpenExtraDiv] = useState(false);

  useEffect(() => {
    // get existing todoList
    const todoList = JSON.parse(localStorage.getItem('todoList'));

    if (todoList) {
      setTodos(todoList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todos));

    console.log('testing todos', JSON.stringify(todos, null, 2));
  }, [todos]);

  // create todo list once user push the button
  const createTodo = () => {
    // Validation
    if (!newTask.trim() || !priority || !selectedDate) {
      setError('Required field'); // Set error message for empty task
      return;
    }

    setError(''); // Clear error if all fields are filled

    if (newTask.trim()) {
      const newObj = {
        id: generateRandomId(),
        todo: newTask,
        completed: false,
        priority,
        dueDate: selectedDate.format('YYYY-MM-DD')
      };

      const updatedTodos = [...todos, newObj];
      setTodos(updatedTodos);

      localStorage.setItem('todoList', JSON.stringify(updatedTodos));

      setNewTask('');
      setPriority('');
      setSelectedDate(null);
      setOpenExtraDiv(false);
    }
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // Toggle the 'completed' status for the clicked item
    const updatedTodos = todos.map(todo => {
      if (todo.id === value.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setChecked(newChecked);
    setTodos(updatedTodos);
    localStorage.setItem('todoList', JSON.stringify(updatedTodos));
  };

  const handleRemoveTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleChange = event => {
    setPriority(event.target.value);
    console.log('testing priority', event.target.value);
  };

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <TodoContext.Provider
      value={{
        newTask,
        setNewTask,
        todos,
        setTodos,
        checked,
        setChecked,
        selectedDate,
        setSelectedDate,
        priority,
        setPriority,
        error,
        setError,
        openExtraDiv,
        setOpenExtraDiv,
        createTodo,
        handleToggle,
        handleRemoveTodo,
        handleChange,
        handleDateChange
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
