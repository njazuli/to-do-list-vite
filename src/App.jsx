import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import sampleData from '../src/static/sample.json';

// list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

function App() {
  const data = sampleData;
  console.log('testing data', data);

  // list
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="container p-3 max-w-[360px] sm:max-w-[640px] lg:px-6 lg:py-12 mx-auto h-auto bg-white flex justify-center items-center flex-col border gray-600 rounded-lg">
      <p className="text-black text-2xl mb-3">Testing on vite</p>

      {/* input*/}
      <div className="w-full h-auto p-2 lg:p-6 flex items-center ">
        <div className="w-full flex items-center">
          <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <TextField fullWidth label="Add new todo" id="fullWidth" />
          </Box>
          <div className="ml-3">
            <AddCircleIcon color="primary" />
          </div>
        </div>
      </div>

      {/* list */}
      <div className="w-full h-auto ">
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {data.map(value => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`${value.todo}`}
                    sx={{ textDecorationLine: checked.indexOf(value) !== -1 ? 'line-through' : 'unset' }}
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
