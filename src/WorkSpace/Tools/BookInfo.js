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
  var Editable = {
    ...props.book
  };
  const [title, setTitle] = useState(Editable.BookInfo.Title);
  const [Authors, setAuthors] = useState(Editable.BookInfo.Authors);
  const [Genre, setGenre] = useState(Editable.BookInfo.Genre);
  const [Audience, setAudience] = useState(Editable.BookInfo.Audience);
  function UpdateBook(e) {
    Editable.BookInfo.Title = e.target.value;
    props.setBook(Editable);
    localStorage.book = JSON.stringify(Editable);
    console.log(props.book);
  }

  return (
    <ToolItem {...props}>
      <p>Title:</p>{' '}
      <Title
        placeholder="Book Title"
        type="text"
        value={title}
        {...props}
        onChange={e => setTitle(e.target.value)}
        onBlur={e => UpdateBook(e)}
        onKeyDown={e => {
          console.log(e.key);
          if (e.key == 'Enter') {
            e.target.blur();
          }
        }}
      />
      {Authors.length > 1
        ? 'Authors:' +
          Authors.map(name => {
            return name + ',';
          })
        : 'Author: ' + Authors}
      <br />
      Genre: {Genre}
      <br />
      Audience: {Audience}
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
