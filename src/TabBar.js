import React, { useState } from 'react';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

export function TabBar(props) {
  var state = props.Tabs;
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

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTabIds = Array.from(start.tabIds);
      newTabIds.splice(source.index, 1);
      newTabIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        tabIds: newTabIds
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
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
      ...state,
      columns: {
        ...state.columns,
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
      <Container darkmode={props.darkmode}>
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const tabs = column.tabIds.map(tabId => state.tabs[tabId]);
          return (
            <Column
              {...props}
              key={column.id}
              columnIndex={index}
              column={column}
              tabs={tabs}
              darkmode={props.darkmode}
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
      <Droppable droppableId={props.column.id} direction="horizontal">
        {(provided, snapshot) => (
          <TabList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            {...props}
          >
            {props.tabs.map((tab, index) => (
              <Tab key={tab.id} tab={tab} index={index} {...props} />
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
    newState.columns[props.column.id].selected = id;
    props.setTabs(newState);
  }

  function removeTab(id) {
    var newState = {
      ...props.Tabs
    };
    newState.columns[props.column.id].tabIds = newState.columns[
      props.column.id
    ].tabIds.filter(item => item !== id);
    console.log(newState.columns[props.column.id].tabIds.length);
    if (newState.columns[props.column.id].tabIds.length < 1) {
      if (props.column.id =='Column-2'){
        newState.columnOrder.pop();
      }
    }
    delete newState.tabs[id];

    console.log(newState);
    props.setTabs(newState);
    localStorage.tabs = JSON.stringify(newState);
  }
  return (
    <Draggable draggableId={props.tab.id} index={props.index}>
      {(provided, snapshot) => (
        <TabItem
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          darkmode={props.darkmode}
          selected={
            props.tab.id ==
            props.Tabs.columns[
              Object.keys(props.Tabs.columns)[props.columnIndex]
            ].selected
          }
          onClick={() => setSelected(props.tab.id)}
        >
          {
            <Handle
              {...provided.dragHandleProps}
              className={setIcon(props.tab.type)}
            />
          }
          <Text>
            {props.tab.location ? props.tab.location : props.tab.type}
          </Text>
          <Button
            className="bi bi-x"
            darkmode={props.darkmode}
            onClick={() => removeTab(props.tab.id)}
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
