import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const { Toolbar } = require('./WorkSpace/Toolbar.js');
const { TabBar } = require('./WorkSpace/TabBar.js');
const { Tool } = require('./WorkSpace/Tools.js');

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

export function WorkSpace(props) {
  return (
    <Workspace {...props}>
      <Toolbar {...props} />
      <Area {...props}>
        <TabBar {...props} />
        <ToolArea {...props} />
      </Area>
    </Workspace>
  );
}
const ToolContianer = styled.div`
  font-family: Alegreya; //NOTE: this should be changeable in settings.
  font-size: 16px; //NOTE: this should be changeable in settings.
  display: flex;
  flex-direction: row;
  //background-color: red;
  flex-grow: 1;
  width: 100%;
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
`;

function ToolArea(props) {
  const Tool1 = props.Tabs.columnOrder.length > 0;
  const type1 = props.Tabs.tabs[props.Tabs.columns['column-1'].selected].type;
  const loc1 =
    props.Tabs.tabs[props.Tabs.columns['column-1'].selected].location;
  const Tool2 = props.Tabs.columnOrder.length > 1;
  const type2 = props.Tabs.tabs[props.Tabs.columns['column-2'].selected].type;
  const loc2 =
    props.Tabs.tabs[props.Tabs.columns['column-2'].selected].location;
  return (
    <ToolContianer>
      {Tool1 ? <Tool {...props} Type={type1} location={loc1} /> : ''}
      {Tool2 ? <Tool {...props} Type={'Editor'} location={loc2} /> : ''}
    </ToolContianer>
  );
}
