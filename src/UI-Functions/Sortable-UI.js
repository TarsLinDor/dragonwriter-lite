import React from 'react';

export function SortableContext(props) {
  return <div style={props.style}>{props.children}</div>;
}

export function Droppable(props) {
  return <div style={props.style}>{props.children}</div>;
}

export function Draggable(props) {
  return <div style={props.style}>{props.children}</div>;
}
