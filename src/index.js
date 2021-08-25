import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
var fs = require('file-system');
import '@atlaskit/css-reset';
const { useToggle } = require('./UI-Functions/Toggle-UI.js');
const { WorkSpace } = require('./WorkSpace.js');
const { MainMenu } = require('./MainMenu.js');
const { NavBar } = require('./Navbar.js');

const initialData = {
  tabs: {
    'tab-1': { id: 'tab-1', content: 'BookInfo' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      tabIds: ['tab-1']
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
    localStorage.book
      ? JSON.parse(localStorage.book)
      : require('./newBook.json')
  );
  const [Tabs, setTabs] = useState(
    localStorage.tabs ? JSON.parse(localStorage.tabs) : initialData
  );
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
