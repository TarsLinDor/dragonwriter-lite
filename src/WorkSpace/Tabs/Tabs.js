import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 0px;
  //border-radius: 2px;
  width: 100%;
  height: 2em;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    position: fixed;
    botton: -3px;
    width: 0px;
    height: 0px;
    z-index: 0;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background-color: inherit;
    display: none;
    overflow: hidden;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: inherit;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: gray;
    height: 3px;
  }
  ::-webkit-scrollbar-corner {
    background: inherit;
  }
`;
const TabList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver
      ? props.darkmode
        ? 'rgb(250, 250, 250, .25)'
        : 'rgb(250, 250, 250, .25)'
      : props.darkmode
      ? 'rgb(250, 250, 250, .1)'
      : 'rgb(250, 250, 250, .1)'}; //#40526d
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-content: center;
`;

export default function Column(props) {
  const [selected, setSelected] = useState(0);
  return (
    <Container>
      <Droppable droppableId={props.column.id} direction="horizontal">
        {(provided, snapshot) => (
          <TabList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            {...props}
          >
            {props.tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                {...props}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
            {provided.placeholder}
          </TabList>
        )}
      </Droppable>
    </Container>
  );
}

const Tab = styled.div`
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  height: 2em;
  min-width: 6em;
  max-width: 12em;
  margin-right: ${props => (props.darkmode ? '1px' : '0px')};
  border-right: ${props => (props.darkmode ? '1px' : '0px')};
  background-color: ${props =>
    props.darkmode
      ? props.isDragging || props.notSelected
        ? 'rgb(30,30,30)'
        : 'rgb(45, 45, 45)'
      : props.isDragging || props.notSelected
      ? 'whitesmoke'
      : 'lightgrey'};
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const Handle = styled.div`
  padding: 0em 0.25em 0em 0.25em;
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  border: 0;
  padding: 0em 0em 0em 0.25em;
  font-size: 1.1em;
  background-color: inherit;
  display: flex;
  align-items: center;
  outline: none;
  &:hover {
    color: ${props => (props.darkmode ? 'grey' : 'rgb(200, 200, 200)')};
  }
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
`;
const Text = styled.div`
  display: flex;
  align-items: center;
`;

function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Tab
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          darkmode={props.darkmode}
          notSelected={props.index == props.selected}
          onClick={() => props.setSelected(props.index)}
        >
          {
            <Handle
              {...provided.dragHandleProps}
              className={setIcon(props.task.content)}
            />
          }
          <Text>{props.task.content}</Text>
          <Button className="bi bi-x" darkmode={props.darkmode} />
        </Tab>
      )}
    </Draggable>
  );
}

function setIcon(type) {
  // Sets Which icon is visible in the tab.
  switch (type) {
    case 'Book':
      return 'bi bi-bookmark';
    case 'Editor':
      return 'bi bi-vector-pen';
    case 'Characters':
      return 'bi bi-people';
    case 'World':
      return 'bi bi-tree';
    case 'Outline':
      return 'bi bi-snow3';
    case 'Feedback':
      return 'bi bi-arrow-repeat';
    case 'Help':
      return 'bi bi-question-diamond';
    case 'Print':
      return 'bi bi-printer';
    case 'Settings':
      return 'bi bi-gear';
    default:
      return 'bi bi-vector-pen';
  }
}
