import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';

// mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import KeyboardDoubleArrowUpTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowUpTwoTone';
import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';

const TodoInput = () => {
  const {
    newTask,
    setNewTask,
    createTodo,
    error,
    priority,
    selectedDate,
    openExtraDiv,
    handleChange,
    setOpenExtraDiv,
    handleDateChange
  } = useContext(TodoContext);

  return (
    <>
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
                <MenuItem value={'high'}>
                  <PriorityHighTwoToneIcon style={{ color: 'red' }} />
                  &nbsp;&nbsp;High
                </MenuItem>
                <MenuItem value={'medium'}>
                  <KeyboardDoubleArrowUpTwoToneIcon style={{ color: 'orange' }} />
                  &nbsp;&nbsp;Medium
                </MenuItem>
                <MenuItem value={'low'}>
                  <KeyboardArrowDownTwoToneIcon style={{ color: 'blue' }} />
                  &nbsp;&nbsp;Low
                </MenuItem>
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
    </>
  );
};

export default TodoInput;
