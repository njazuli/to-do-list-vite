import { useState, useEffect } from 'react';
import { getRemainingDays, generateRandomId } from '../../utils';
import './App.css';
// mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import KeyboardDoubleArrowUpTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowUpTwoTone';
import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

function App() {
  const [newTask, setNewTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState([0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [priority, setPriority] = useState('');
  const [error, setError] = useState('');
  const [openExtraDiv, setOpenExtraDiv] = useState(false);

  const handleChange = event => {
    setPriority(event.target.value);
    console.log('testing priority', event.target.value);
  };

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
  };

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

  return (
    <div className="container p-3 max-w-[360px] sm:max-w-[640px] lg:px-6 lg:py-12 mx-auto h-auto bg-white flex items-center flex-col md:border md:gray-600 md:rounded-lg sm:shadow-xl">
      <div>
        <img src="/assets/logo.png" width="120" alt="logo" />
      </div>
      <p className="text-black text-2xl mb-2 mt-3">To-do List App 📋</p>

      {/* input*/}
      <div className="w-full h-auto p-2 lg:p-6 flex items-center ">
        <div className="w-full flex items-center">
          <Box sx={{ width: '100%', maxWidth: '100%' }} onClick={() => setOpenExtraDiv(true)}>
            <TextField
              fullWidth
              label="Add new todo"
              id="fullWidth"
              sx={{
                font: 'Open Sans'
              }}
              value={newTask}
              onChange={e => {
                setNewTask(e.target.value);
              }}
              error={!!error && !newTask}
              helperText={error && !newTask ? error : ''}
            />
          </Box>
          <div className="ml-3">
            <AddCircleIcon color="primary" onClick={() => createTodo()} className="cursor-pointer" />
          </div>
        </div>
      </div>
      {openExtraDiv && (
        <div className="w-full h-auto p-2 lg:px-6 lg:py-1 flex justify-between items-start">
          {/* select */}
          <div className="w-3/6 mr-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="Priority"
                onChange={handleChange}
              >
                <MenuItem value={'high'}>High</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'low'}>Low</MenuItem>
              </Select>
              {error && !priority && (
                <Typography
                  color="error"
                  sx={{
                    fontSize: 12,
                    padding: '4px 0 0 4px'
                  }}
                >
                  {error}
                </Typography>
              )}
            </FormControl>
          </div>
          <div className="w-3/6">
            {/* due date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due date"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={!!error && !selectedDate} // Add error state
                    helperText={error && !selectedDate ? error : ''}
                  />
                )}
                className="w-full"
              />
              {error && !selectedDate && (
                <Typography
                  color="error"
                  sx={{
                    fontSize: 12,
                    padding: '4px 0 0 4px'
                  }}
                >
                  {error}
                </Typography>
              )}
            </LocalizationProvider>
          </div>
        </div>
      )}

      {/* list */}
      <div className="w-full h-auto ">
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {todos.map((value, idx) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={() => handleRemoveTodo(idx)}>
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  sx={{
                    marginLeft: {
                      xs: '-16px',
                      md: '0'
                    }
                  }}
                  dense
                >
                  <ListItemIcon
                    sx={{
                      marginRight: '0',
                      minWidth: '50px'
                    }}
                  >
                    <Checkbox
                      checked={value.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>

                  {value.priority === 'low' && <KeyboardArrowDownTwoToneIcon style={{ color: 'blue' }} />}
                  {value.priority === 'medium' && <KeyboardDoubleArrowUpTwoToneIcon style={{ color: 'orange' }} />}
                  {value.priority === 'high' && <PriorityHighTwoToneIcon style={{ color: 'red' }} />}

                  <ListItemText
                    id={labelId}
                    primary={`${value.todo} - Due date: ${getRemainingDays(value.dueDate)}`}
                    sx={{
                      marginLeft: '4px',
                      fontFamily: 'Open Sans',
                      fontSize: 16,
                      textDecorationLine: value.completed ? 'line-through' : 'unset'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default App;
