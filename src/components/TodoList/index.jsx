import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { getRemainingDays } from '../../utils';

// mui
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

const TodoList = () => {
  const { todos, handleToggle, handleRemoveTodo } = useContext(TodoContext);

  return (
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
                    fontWeight: 'bolder',
                    textDecorationLine: value.completed ? 'line-through' : 'unset'
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodoList;
