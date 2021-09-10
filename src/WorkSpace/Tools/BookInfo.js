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
const TagItem = styled.span`
  border-radius: 0.25em;
  font-size: 0.85em;
  margin: 0.25em;
  padding: 0 0.25em;
  border: solid 1px grey;
  background-color: rgb(100, 100, 100, 0.25);
`;
const Input = styled.input`
  background-color: inherit;
  font-size: ${props => props.fontsize};
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
  const [Tags, setTags] = useState(Editable.BookInfo.Tags);
  const [Synopsis, setSynopsis] = useState(Editable.BookInfo.Synopsis);

  function UpdateBook() {
    Editable.BookInfo.Title = title;
    Editable.BookInfo.Genre = Genre;
    props.setBook(Editable);
    localStorage.book = JSON.stringify(Editable);
    console.log(props.book);
  }

  return (
    <ToolItem {...props}>
      <p>Title:</p>{' '}
      <Input
        placeholder="Book Title"
        type="text"
        fontsize="32px"
        value={title}
        {...props}
        onChange={e => setTitle(e.target.value)}
        onBlur={() => UpdateBook()}
        onKeyDown={e => {
          if (e.key == 'Enter') {
            e.target.blur();
          }
        }}
      />
      <br />
      {Authors.length > 1
        ? 'Authors:' +
          Authors.map((name, index) => {
            return <a key={index}>{name} + ','</a>;
          })
        : 'Author: ' + Authors}
      <br />
      Genre:{' '}
      <Input
        placeholder="Genre"
        type="text"
        fontsize="16px"
        value={Genre}
        {...props}
        onChange={e => setGenre(e.target.value)}
        onBlur={() => UpdateBook()}
        onKeyDown={e => {
          if (e.key == 'Enter') {
            e.target.blur();
          }
        }}
      />
      <br />
      Audience: {Audience}
      <br />
      Tags: <br />
      {Tags
        ? Tags.map((tag, index) => {
            return <TagItem key={index}>{tag}</TagItem>;
          })
        : ''}
      <a className="bi bi-plus-circle" />
      <br />
      Synopsis: <br />
      {Synopsis}
      <br />
    </ToolItem>
  );
}
