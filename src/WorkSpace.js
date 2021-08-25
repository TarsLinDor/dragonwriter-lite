import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const { Toolbar } = require('./WorkSpace/Toolbar.js');
const { TabBar } = require('./WorkSpace/TabBar.js');
const Workspace = styled.div`
  background-color: ${props =>
    props.darkmode ? 'rgb(30, 30, 30)' : '#40526d'};
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

export function WorkSpace(props) {
  return (
    <Workspace {...props}>
      <Toolbar {...props} />
      <TabBar {...props} />
    </Workspace>
  );
}
