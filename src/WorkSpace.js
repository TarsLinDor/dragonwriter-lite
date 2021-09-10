import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const { Toolbar } = require('./WorkSpace/Toolbar.js');
const { TabBar } = require('./WorkSpace/TabBar.js');
const BookInfo = require('./WorkSpace/Tools/BookInfo.js');

export function WorkSpace(props) {
  const col = props.Tabs.columnOrder.length;
  return (
    <Workspace {...props}>
      <Toolbar {...props} />
      <Area {...props}>
        <TabBar {...props} />
        <ToolContianer>
          {col > 0 ? <Tool {...props} Type="column-1" /> : ''}
          {col > 1 ? <Tool {...props} Type="column-2" /> : ''}
        </ToolContianer>
      </Area>
    </Workspace>
  );
}

function Tool(props) {
  const selected = props.Tabs.columns[props.Type].selected;
  const type = props.Tabs.tabs[selected].type;
  switch (type) {
    case 'Editor':
      return <ToolItem {...props}>Editor</ToolItem>;
    case 'BookInfo':
      return <BookInfo {...props} />;
    default:
      return <ToolItem {...props}>Default</ToolItem>;
  }
}

const ToolItem = styled.div`
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  border-right: ${props =>
    props.darkmode
      ? 'solid 1px rgb(60, 60, 60)'
      : 'solid 1px rgb(20, 20, 20,.15)'};
`;

const ToolContianer = styled.div`
  font-family: Alegreya; //NOTE: this should be changeable in settings.
  font-size: 16px; //NOTE: this should be changeable in settings.
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
`;
const Workspace = styled.div`
  background-color: ${props =>
    props.darkmode ? 'rgb(30, 30, 30)' : 'whitesmoke'}; //#40526d
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  //border-right: ${props =>
    props.darkmode ? 'solid 1px rgb(60, 60, 60)' : ''};
  border-bottom: ${props =>
    props.darkmode ? 'solid 1px rgb(60, 60, 60)' : ''};
`;
const Area = styled.div`
  background-color: ${props =>
    props.darkmode ? 'rgb(30, 30, 30)' : 'whitesmoke'}; //#40526d
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
