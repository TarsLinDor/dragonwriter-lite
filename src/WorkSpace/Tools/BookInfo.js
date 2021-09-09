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
const TagItem = styled.i`
  border-radius: 0.25em;
  margin: 0.25em;
  padding: 0 0.25em;
  border: solid 1px grey;
`;
const Title = styled.input`
  background-color: inherit;
  font-size: 32px;
  font-family: Alegreya;
  text-align: center;
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  outline: none;
  border: none;
  &:after {
    content: ' 🦄';
  }
`;

export default function BookInfo(props) {
  var NewBook = {
    ...props.book
  };
  const BookInfo = NewBook.BookInfo;
  const [title, setTitle] = useState(NewBook.BookInfo.Title);
  function updateFields(e) {
    setTitle(e.target.value);
    NewBook.BookInfo.title = e.target.value;
  }
  function UpdateBook(e) {
    props.setBook(NewBook);
    console.log(NewBook.BookInfo.title);
  }
  return (
    <ToolItem {...props}>
      <Title
        type="text"
        value={title}
        {...props}
        onChange={e => updateFields(e)}
        onBlur={e => UpdateBook(e)}
      />
      <br />
      {BookInfo.Authors > 1
        ? 'Author:' +
          BookInfo.Authors.map(name => {
            return name + ',';
          })
        : 'Authors:' + BookInfo.Authors}
      <br />
      Genre: {BookInfo.Genre}
      <br />
      Audience: {BookInfo.Audience}
      <br />
      Tags:
      {BookInfo.Tags
        ? BookInfo.Tags.map(tag => {
            return <TagItem>{tag}</TagItem>;
          })
        : ''}
      <br />
      Synopsis: {BookInfo.Synopsis}
      <br />
    </ToolItem>
  );
}
