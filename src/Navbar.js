import React, { useState } from 'react';
import styled from 'styled-components';
const download = require('downloadjs');

function SaveBook_internally(book, setBook) {
  setBook(book);
  localStorage.book = JSON.stringify(book);
}

function SaveBook_locally(book, setBook) {
  setBook(book);
  localStorage.book = JSON.stringify(book);
  download(JSON.stringify(book), book.BookInfo.Title + '.json', 'json');
}

function createNewBook(Title, setBook) {
  const newBook = require('./newBook.json');
  newBook.BookInfo.Title = Title;
  setBook(newBook);
  download(JSON.stringify(newBook), Title + '.json', 'json');
  localStorage.book = JSON.stringify(newBook);
}

function handleFileSelect(event, setBook) {
  var book;
  var files = event.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; (f = files[i]); i++) {
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        try {
          book = JSON.parse(e.target.result);
          setBook(book);
          localStorage.book = JSON.stringify(book);
          console.log(book.BookInfo.Title + '\nLoaded Successfully!');
        } catch (ex) {
          alert('Failed To load File' + ex);
        }
      };
    })(f);
    reader.readAsText(f);
  }
}

export function NavBar(props) {
  return (
    <Nav darkmode={props.darkmode}>
      <Left>
        <Title onClick={() => props.toggleView()}>
          {props.AppName}
          {props.Pro ? <Pro>Pro</Pro> : ''}
        </Title>
        {!props.view ? (
          <Folder className="bi bi-folder" darkmode={props.darkmode}>
            <Input
              type="file"
              id="files"
              name="files[]"
              accept="json/*"
              onChange={evt => handleFileSelect(evt, props.setBook)}
            />
          </Folder>
        ) : (
          ''
        )}
        {props.book ? (
          <Book>{!props.view ? props.book.BookInfo.Title : 'Main Menu'}</Book>
        ) : (
          <Book>{!props.view ? 'No Book Selected' : 'Main Menu'}</Book>
        )}
        {!props.view ? (
          <Folder
            className={props.saved ? 'bi bi-check2' : 'bi bi-arrow-repeat'}
            darkmode={props.darkmode}
            onClick={() => props.toggleSaved()}
          />
        ) : (
          ''
        )}
      </Left>
      <Left>
        {!props.view ? (
          <Folder
            className="bi bi-folder-plus"
            darkmode={props.darkmode}
            onClick={() => createNewBook('My Book', props.setBook)}
          >
            &nbsp; New Book
          </Folder>
        ) : (
          ''
        )}

        {<MenuBar onClick={() => props.toggleView()} className="bi bi-list" />}
      </Left>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  background-color: ${props =>
    props.darkmode ? 'rgb(35, 35, 35)' : '#333844'};
  height: 2em;
  justify-content: space-between;
  border-bottom: ${props =>
    props.darkmode ? 'solid 1px rgb(51, 51, 51)' : ''};
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  margin: 0em 0.25em;
  padding: 0em;
  font-size: 1.25em;
  font-weight: bold;
  color: green;
`;
const Book = styled.a`
  display: flex;
  margin: 0 0.5em;
  align-items: center;
  padding-top: 0.25em;
  font-size: 1em;
  color: rgb(140, 140, 140);
  &:hover {
    color: lightgrey;
  }
`;
const MenuBar = styled.a`
  font-size: 1.5em;
  weight: bolder;
  align-items: center;
  padding: 0.25em;
  color: green;
  &:hover {
    color: white;
  }
`;
const Folder = styled.label`
  font-size: 1em;
  padding-top: 0.25em;
  color: rgb(140, 140, 140);
  &:hover {
    color: lightgrey;
  }
`;
const Save = styled.div`
  font-size: 1em;
  padding-top: 0em;
  padding-right: 0.5em;
  color: rgb(140, 140, 140);
  &:hover {
    color: lightgrey;
  }
`;
const Pro = styled.div`
  padding-bottom: 10px;
  position: relative;
  display: inline;
  font-size: 0.45em;
  color: green;
`;
const Input = styled.input`
  display: none;
`;
