import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToolItem = styled.div`
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  padding: 1em;
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  border-right: ${props =>
    props.darkmode
      ? 'solid 1px rgb(60, 60, 60)'
      : 'solid 1px rgb(20, 20, 20,.15)'};
`;

export default function BookInfo(props) {
  const edit = props.book.BookInfo;
  return (
    <ToolItem {...props}>
      Title: {edit.Title}
      <br />
      Author: {edit.Authors}
      <br />
      Genre: {edit.Genre}
      <br />
    </ToolItem>
  );
}
