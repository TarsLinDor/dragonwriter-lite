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
  //text-align: center;
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  outline: none;
  border: none;
`;

export default function BookInfo(props) {
  const BookInfo = props.book.BookInfo;
  const [title, setTitle] = useState(BookInfo.Title);
  function updateFields(e) {
    setTitle(e.target.value);
  }
  function UpdateBook(e) {
    var NewBook = {
      ...props.book
    };
    NewBook.BookInfo.Title = e.target.value;
    props.setBook(NewBook);
    localStorage.book = JSON.stringify(NewBook);
    console.log(props.book);
  }

  return (
    <ToolItem {...props}>
      <h1>Title:</h1> <Title
        placeholder="Book Title"
        type="text"
        value={title}
        {...props}
        onChange={e => updateFields(e)}
        onBlur={e => UpdateBook(e)}
        onKeyDown={e => {
          if (e.key == 'Enter') {
            e.target.blur();
          }
        }}
      />
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
