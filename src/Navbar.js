import React, { useState } from 'react';
import styled from 'styled-components';
const download = require('downloadjs');
const { useToggle } = require('./UI-Functions/Toggle-UI.js');

export function NavBar(props) {
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

  function createNewBook(e) {
    const newBook = require('./newBook.json');
    newBook.BookInfo.CreatedAt = Date.now();
    props.setBook(newBook);
    //download(JSON.stringify(newBook), Title + '.json', 'json');
    localStorage.book = JSON.stringify(newBook);
    console.log(newBook);
  }
  return (
    <Nav darkmode={props.darkmode}>
      <Left>
        <Title onClick={() => props.toggleView()}>
          {props.AppName}
          {props.Pro ? <Pro>Pro</Pro> : ''}
        </Title>
        {!props.view ? (
          <Folder
            className="bi bi-folder"
            darkmode={props.darkmode}
            tooltip={'Upload Book '}
          >
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
          <Save
            className={props.saved ? 'bi bi-check2' : 'bi bi-arrow-repeat'}
            darkmode={props.darkmode}
            onClick={() => props.toggleSaved()}
            tooltip={props.saved ? ' Up to date' : ' Save'}
          />
        ) : (
          ''
        )}
      </Left>

      <Right>
        {!props.view ? (
          <Folder
            className="bi bi-folder-plus"
            darkmode={props.darkmode}
            onClick={e => createNewBook(e)}
            tooltip={' New Project'}
          >
            &nbsp;New Project
          </Folder>
        ) : (
          ''
        )}

        {/*
          <MenuBar
            onClick={() => props.toggleView()}
            className="bi bi-three-dots"
          />*/}
      </Right>
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
const Right = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5em;
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
  //font-weight: bold;
  margin: 0 0.5em;
  align-items: center;
  padding-top: 0.2em;
  font-size: 1.05em;
  color: rgb(140, 140, 140);
  &:hover {
    color: lightgrey;
  }
`;
const MenuBar = styled.a`
  font-size: 1.5em;
  weight: bolder;
  align-items: center;
  padding: 0 0.25em;
  color: green;
  &:hover {
    color: white;
  }
`;
const Folder = styled.div`
  font-size: 1em;
  padding-top: 0.25em;
  margin-left: 0em;
  color: rgb(140, 140, 140);
  transition: content 2s linear 1s;
  &:hover {
    color: blue;
  }
`;
const Save = styled.div`
  font-size: 1.1em;
  font-weight: lighter;
  padding-top: 0.2em;
  padding-right: 0.5em;
  margin-right: 1em;
  color: rgb(140, 140, 140);
  transition: content 2s;
  &:hover {
    color: lightgrey;
  }
  &:hover:after {
    padding: .1em;
    content: ' ${props => props.tooltip}';
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
