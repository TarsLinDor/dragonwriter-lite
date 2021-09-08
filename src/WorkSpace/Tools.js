import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookInfo from './Tools/BookInfo.js';

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

export function Tool(props) {
  switch (props.Type) {
    case 'Editor':
      <ToolItem {...props}>Editor test</ToolItem>;
    case 'BookInfo':
      return <BookInfo {...props}>{props.type}</BookInfo>;
    default:
      return <ToolItem {...props}>Default</ToolItem>;
  }
}
