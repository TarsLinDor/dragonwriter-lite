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
        <ToolArea {...props}>Test</ToolArea>
      </Area>
    </Workspace>
  );
}
const ToolContianer = styled.div`
  display: flex;
  flex-direction: row;
  //background-color: red;
  flex-grow: 1;
  width: 100%;
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
`;
const Tool = styled.div`
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  border-right: ${props =>
    props.darkmode
      ? 'solid 1px rgb(60, 60, 60)'
      : 'solid 1px rgb(20, 20, 20,.15)'};
`;
function ToolArea(props) {
  const selectedTab = props.Tabs.columns['column-1'].selected;
  const Tools =
    props.Tabs.columnOrder.length - 1 ? (
      <ToolContianer>
        <Tool
          {...props}
          type={
            props.Tabs.tabs[props.Tabs.columns['column-1'].selected].content
          }
        />
        <Tool
          {...props}
          type={
            props.Tabs.tabs[props.Tabs.columns['column-2'].selected].content
          }
        />
      </ToolContianer>
    ) : (
      <ToolContianer>
        <Tool
          {...props}
          type={
            props.Tabs.tabs[props.Tabs.columns['column-1'].selected].content
          }
        />
      </ToolContianer>
    );
  return Tools;
}
