import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
var fs = require('file-system');
import '@atlaskit/css-reset';
const { useToggle } = require('./UI-Functions/Toggle-UI.js');
const { WorkSpace } = require('./WorkSpace.js');
const { MainMenu } = require('./MainMenu.js');
const { NavBar } = require('./Navbar.js');
/*
const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Editor' },
    'task-2': { id: 'task-2', content: 'Outline' },
    'task-3': { id: 'task-3', content: 'Characters' },
    'task-4': { id: 'task-4', content: 'World' },
    'task-5': { id: 'task-5', content: 'Book' },
    'task-6': { id: 'task-6', content: 'Settings' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: ['task-5', 'task-6']
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2']
};
*/

const initialData = {
  tabs: {
    'tab-1': { id: 'tab-1', content: 'Editor' },
    'tab-2': { id: 'tab-2', content: 'Book' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      tabIds: ['tab-1', 'tab-2']
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1']
};

const AppSpace = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
`;

function App() {
  const AppName = 'DragonWriter';
  const [view, toggleView] = useToggle(false);
  const [darkmode, toggleDarkmode] = useToggle(true);
  const [book, setBook] = useState(
    localStorage.book ? JSON.parse(localStorage.book) : ''
  );
  const [Tabs, setTabs] = useState(initialData);
  const [saved, toggleSaved] = useToggle(
    JSON.stringify(book) == localStorage.book
  );
  const globals = {
    AppName: AppName,
    book: book,
    setBook: setBook,
    view: view,
    toggleView: toggleView,
    darkmode: darkmode,
    toggleDarkmode: toggleDarkmode,
    saved: saved,
    toggleSaved: toggleSaved
  };
  return (
    <AppSpace>
      <NavBar {...globals} />
      {view ? (
        <MainMenu />
      ) : (
        <WorkSpace {...globals} {...{ Tabs: Tabs, setTabs: setTabs }} />
      )}
    </AppSpace>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
