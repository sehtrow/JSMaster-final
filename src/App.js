import React, { useState } from 'react';
import './App.css';
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { AppBar, Tab } from '@material-ui/core';

import Personajes from './pages/Personajes';
import Favoritos from './pages/Favoritos';
import Inicio from './pages/Inicio';

function App() {

  const [indice, setIndice] = useState('1')
  const onChangeTab = (_, val) => setIndice(val)


  return (
    <div>
      <TabContext value={indice}>
        <AppBar position="static" className="appbar-item">
          <TabList onChange={onChangeTab}>
            <Tab label="Inicio" value="1" />
            <Tab label="Personajes" value="2" />
            <Tab label="Favoritos" value="3" />
          </TabList>
        </AppBar>
        <TabPanel value="1">
          <Inicio />
        </TabPanel>
        <TabPanel value="2">
          <Personajes />
        </TabPanel>
        <TabPanel value="3">
          <Favoritos />
        </TabPanel>
      </TabContext>

    </div>
  );
}

export default App;
