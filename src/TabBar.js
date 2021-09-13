import React, { useState } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

export function TabBar(props) {
  function switch_view() {
    var newState = {
      ...props.Tabs
    };

    if (newState.columnOrder.length > 1) {
      newState.columns[
        Object.keys(newState.columns)[0]
      ].tabIds = newState.columns[
        Object.keys(newState.columns)[0]
      ].tabIds.concat(
        newState.columns[Object.keys(newState.columns)[1]].tabIds
      );
      newState.columnOrder.pop();
    } else {
      newState.columns = Object.assign(newState.columns, {
        'column-2': {
          id: 'column-2',
          selected: newState.columns[Object.keys(newState.columns)[0]].selected,
          tabIds: [newState.columns[Object.keys(newState.columns)[0]].selected]
        }
      });
      const selectedIndex = newState.columns[
        Object.keys(newState.columns)[0]
      ].tabIds.indexOf(
        newState.columns[Object.keys(newState.columns)[0]].selected
      );
      newState.columns[Object.keys(newState.columns)[0]].tabIds.splice(
        selectedIndex,
        1
      );
      newState.columns[Object.keys(newState.columns)[0]].selected =
        newState.columns[Object.keys(newState.columns)[0]].tabIds[0];
      newState.columnOrder.push('column-2');
    }
    localStorage.tabs = JSON.stringify(newState);
    props.setTabs(newState);
  }
  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = props.Tabs.columns[source.droppableId];
    const finish = props.Tabs.columns[destination.droppableId];

    if (start === finish) {
      const newTabIds = Array.from(start.tabIds);
      newTabIds.splice(source.index, 1);
      newTabIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        tabIds: newTabIds
      };

      const newState = {
        ...props.Tabs,
        columns: {
          ...props.Tabs.columns,
          [newColumn.id]: newColumn
        }
      };
      console.log(newState);
      localStorage.tabs = JSON.stringify(newState);
      props.setTabs(newState);
      return;
    }

    // Moving from one list to another
    const startTabIds = Array.from(start.tabIds);
    startTabIds.splice(source.index, 1);
    const newStart = {
      ...start,
      tabIds: startTabIds
    };

    const finishTabIds = Array.from(finish.tabIds);
    finishTabIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      tabIds: finishTabIds
    };

    const newState = {
      ...props.Tabs,
      columns: {
        ...props.Tabs.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    //console.log(draggableId);

    localStorage.tabs = JSON.stringify(newState);
    props.setTabs(newState);
    return;
  }

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <Container {...props}>
        {props.Tabs.columnOrder.map((columnId, index) => {
          return (
            <Column
              {...props}
              key={columnId}
              columnIndex={index}
              columnId={columnId}
            />
          );
        })}
        <Split
          onClick={() => switch_view()}
          className={
            props.Tabs.columnOrder.length > 1
              ? 'bi bi-square'
              : 'bi bi-layout-split'
          }
          darkmode={props.darkmode}
        />
      </Container>
    </DragDropContext>
  );
}
function Column(props) {
  return (
    <Col>
      <Droppable droppableId={props.columnId} direction="horizontal">
        {(provided, snapshot) => (
          <TabList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            {...props}
          >
            {props.Tabs.columns[props.columnId].tabIds.map((tab, index) => (
              <Tab key={tab} tabId={tab} index={index} {...props} />
            ))}
            {provided.placeholder}
          </TabList>
        )}
      </Droppable>
    </Col>
  );
}

function Tab(props) {
  function setIcon(type) {
    switch (type) {
      case 'BookInfo':
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
  function setSelected(id) {
    var newState = {
      ...props.Tabs
    };
    newState.columns[props.columnId].selected = id;
    props.setTabs(newState);
  }

  function removeTab(id) {
    var newState = {
      ...props.Tabs
    };

    newState.columns[props.columnId].tabIds = newState.columns[
      props.columnId
    ].tabIds.filter(item => item !== id); //removes tab id from column specifer.

    if (newState.columns[props.columnId].tabIds.length < 1) {
      if (props.column.id == 'Column-2') {
        newState.columnOrder.pop();
      }
    }
    delete newState.tabs[id];
    //remove and replace selected item:
    if (
      !newState.columns[props.columnId].tabIds.includes(
        newState.columns[props.columnId].selected
      )
    ) {
      newState.columns[props.columnId].selected =
        newState.columns[props.columnId].tabIds[0];
    }

    console.log(newState);
    props.setTabs(newState);
    localStorage.tabs = JSON.stringify(newState);
  }
  return (
    <Draggable draggableId={props.tabId} index={props.index}>
      {(provided, snapshot) => (
        <TabItem
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          darkmode={props.darkmode}
          selected={props.tabId == props.Tabs.columns[props.columnId].selected}
          onClick={() => setSelected(props.tabId)}
        >
          {
            <Handle
              {...provided.dragHandleProps}
              className={setIcon(props.Tabs.tabs[props.tabId].type)}
            />
          }
          <Text>
            {props.Tabs.tabs[props.tabId].location
              ? props.Tabs.tabs[props.tabId].location
              : props.Tabs.tabs[props.tabId].type}
          </Text>
          <Button
            className="bi bi-x"
            darkmode={props.darkmode}
            onClick={() => removeTab(props.tabId)}
          />
        </TabItem>
      )}
    </Draggable>
  );
}

/*~~~~ CSS DEFINES ~~~~ */

const Container = styled.div`
  display: flex;
  flex-direction: row;
  //flex-grow: 1;
  max-height: 2em;
  background-color: ${props => (props.darkmode ? 'inherit' : '#40526d')};
`;
const Split = styled.i`
  position: absolute;
  display: flex;
  right: 0;
  align-items: center;
  height: 1em;
  padding: 0.5em;
  z-index: 2;
  background-color: ${props => (props.darkmode ? 'rgb(50, 50, 50)' : '')};
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  &:hover {
    color: rgb(200, 200, 200);
  }'
`;
const TabItem = styled.div`
  color: ${props => (props.darkmode ? 'rgb(140, 140, 140)' : 'black')};
  height: 2em;
  min-width: 6em;
  max-width: 12em;
  margin-right: ${props => (props.darkmode ? '1px' : '0px')};
  border-right: ${props => (props.darkmode ? '1px' : '0px')};
  background-color: ${props =>
    props.darkmode
      ? props.isDragging || props.selected
        ? 'rgb(30,30,30)'
        : 'rgb(45, 45, 45)'
      : props.isDragging || props.selected
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
  margin: 0.15em;
`;
const Col = styled.div`
  margin: 0px;
  //border-radius: 2px;
  width: 100%;
  height: 2em;
  display: flex;
  flex-direction: row;
  flex-grow: 0.5;
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
