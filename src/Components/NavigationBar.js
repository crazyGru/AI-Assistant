import React, { Component, Fragment, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';


const pages = ['All', 'Blogs', 'Ads', "Social"];

export const NavigationBar = ({ navigationHandler }) => {

  const [activateIndex, setActivateIndex] = useState(0);

  useEffect(() => {

  }, []);

  const handleItemClick = (idx) => {
    setActivateIndex(idx);
    if (typeof navigationHandler !== "undefined")
      navigationHandler(idx);
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', marginBottom: "50px", borderRadius:'50px' }} >
        <Container >
          <Toolbar disableGutters>
            {pages.map((item, idx) => {
              const isActive = activateIndex === idx;
              return (
                <Button
                  key={idx}
                  className={`nav-btn ${isActive ? 'active' : ''}`}
                  sx={{ mx: 1, color: isActive ?'white':'#66676b', display: 'block', borderRadius: '50px', height: '100%', fontWeight: isActive ? 'bold' : 'normal', backgroundColor: isActive ? '#7410A2' : 'transparent' }}
                  onClick={() => handleItemClick(idx)}
                >
                  {item}
                </Button>
              );
              })}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}