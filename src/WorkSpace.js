import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const { Toolbar } = require('./WorkSpace/Toolbar.js');
const { TabBar } = require('./WorkSpace/TabBar.js');
const Workspace = styled.div`
  background-color: ${props =>
    props.darkmode ? 'rgb(30, 30, 30)' : 'whitesmoke'}; //#40526d
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-right: ${props => (props.darkmode ? 'solid 1px rgb(60, 60, 60)' : '')};
  border-bottom: ${props =>
    props.darkmode ? 'solid 1px rgb(60, 60, 60)' : ''};
`;
const Area = styled.div`
  background-color: ${props =>
    props.darkmode ? 'rgb(30, 30, 30)' : 'whitesmoke'}; //#40526d
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-right: ${props => (props.darkmode ? 'solid 1px rgb(60, 60, 60)' : '')};
  border-bottom: ${props =>
    props.darkmode ? 'solid 1px rgb(60, 60, 60)' : ''};
`;
const Tool = styled.div``;

export function WorkSpace(props) {
  return (
    <Workspace {...props}>
      <Toolbar {...props} />
      <Area {...props}>
        <TabBar {...props} />
        <Tool>Test</Tool>
      </Area>
    </Workspace>
  );
}
