import { useHistory, Link } from "react-router-dom";
import Menu from '@uiw/react-menu';

import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const categories = [
  {
    id: 'My Account',
    children: [
      {
        id: 'Dashboard',
        active: true,
      }, ,
      { id: 'My Documents' },
    ],
  },
  {
    id: 'Organize',
    children: [
      { id: 'Templates' },
      { id: 'AI Images' },
      { id: 'AI Chat' },
      { id: 'Speech To Text' },
      { id: 'Text to Speech' },
      { id: 'AI Code' },
    ],
  },
  {
    id: 'Account',
    children: [
      { id: 'Affiliate' },
      { id: 'Membership' },
      { id: 'Transactions' },
      { id: 'Account Setting' },
      { id: 'Logout' },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(0, 0, 0, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(0, 0, 0, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const CustomLeftSidebar = () => {
  const history = useHistory()
  function handleDocumentClick() {
    history.push("/document");
  }
  return (
    <div className="bg-gray-200" style={{ width: "250px", height: "105%" }}>
      <Drawer variant="permanent">
        <List>
          {categories.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: '#ffffff', width:'250px'}}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: '#111111' }}>{id}</ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, active }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton selected={active} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText sx={{ color: '#111111' }}>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}

              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </List>
      </Drawer></div>

  )
}

export default CustomLeftSidebar;