import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usePopper } from 'react-popper';
const randomHex = require('crypto-random-hex');

export function Toolbar(props) {
  function addTool(e) {
    var newState = {
      ...props.Tabs
    };
    const newId = 'tab-' + randomHex(3);
    newState.tabs = Object.assign(newState.tabs, {
      [newId]: { id: newId, type: e }
    });
    newState.columns[
      Object.keys(newState.columns)[newState.columnOrder.length - 1]
    ].tabIds.push(newId);
    newState.columns[
      Object.keys(newState.columns)[newState.columnOrder.length - 1]
    ].selected = newId;
    props.setTabs(newState);
    localStorage.tabs = JSON.stringify(newState);
  }

  return (
    <Bar {...props}>
      <Section>
        <Button
          {...props}
          onClick={() => addTool('BookInfo')}
          className="bi bi-bookmark"
        />
        <Button
          {...props}
          onClick={() => addTool('Editor')}
          className="bi bi-vector-pen"
        />
        <Button
          {...props}
          onClick={() => addTool('World')}
          className="bi bi-tree"
        />
        <Button
          {...props}
          onClick={() => addTool('Characters')}
          className="bi bi-people"
        />
        <Button
          {...props}
          onClick={() => addTool('Outline')}
          className="bi bi-snow3"
        />
        {/*<Button
          {...props}
          onClick={() => addTool('editor')}
          className="bi bi-arrow-repeat"
        />*/}
        <Button
          {...props}
          onClick={() => addTool('Print')}
          className="bi bi-printer"
        />
      </Section>
      <Section>
        <Button
          {...props}
          onClick={() => props.toggleDarkmode()}
          className={props.darkmode ? 'bi bi-brightness-high' : 'bi bi-moon'}
        />
        <Button
          {...props}
          onClick={() => addTool('Settings')}
          className="bi bi-gear"
        />
        <Button
          {...props}
          onClick={() => addTool('Help')}
          className="bi bi-question-diamond"
        />
        <Button2
          {...props}
          //logout
          className="bi bi-box-arrow-right"
        />
      </Section>
    </Bar>
  );
}

//CSS for TabBar...

const Bar = styled.div`
  background-color: ${props =>
    props.darkmode ? 'rgb(35, 35, 35)' : '#6d5940'};
  color: black;
  padding: 0.15em 0.15em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  max-width: 2em;
  //border-top: ${props =>
    props.darkmode ? 'solid 1.5px rgb(60, 60, 60)' : 'solid 1.5px inherit'};
  border-right: ${props =>
    props.darkmode ? 'solid 1.5px rgb(60, 60, 60)' : 'solid 1.5px inherit'};
  flex-grow: 1;
`;
const Button = styled.button`
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  background-color: inherit;
  border-radius: 0.6em;
  border: none;
  outline: none;
  font-size: 1.35em;
  width: 1.45em;
  height: 1.45em;
  padding-top: 0.2em;
  cursor: pointer;
  margin: 0.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0px 7px 0 rgba(0, 0, 0, 0.5);
  }
`;

const Button2 = styled.button`
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  background-color: inherit;
  border-radius: 0.6em;
  border: none;
  outline: none;
  font-size: 1.35em;
  width: 1.45em;
  height: 1.45em;
  padding-top: 0.1em;
  padding-right: 0.1em;
  cursor: pointer;
  margin: 0.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0px 7px 0 rgba(0, 0, 0, 0.5);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;
