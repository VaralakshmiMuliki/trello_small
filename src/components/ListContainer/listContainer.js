import React, { useState } from "react";
import "./listContainer.scss";
import { Button } from "antd";
import { dummyListData } from "../../fixtures/dummyListData";
import { CardsContainer } from "../CardsContainer/cardsContainer";
import { X } from "react-feather";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';

// import Column from "antd/es/table/Column";

export const ListContainer = ({label}) => {
  const [columns, setcolumns] = useState(dummyListData);

  const [addBoard, setAddBoard] = useState(false);
  const [boardTitle, setBoardTitle] = useState();
  function addList() {
  
    console.log("function called");

    if(boardTitle !== undefined) {
      dummyListData[uuidv4()] = { name: boardTitle, task: [] };
    }

    setAddBoard(false);
    
  }
  const onDragEnd = (result, columns, setColumns) => {
    console.log("columns", columns);
    console.log("result", result);

    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];

      const destColumn = columns[destination.droppableId];

      const sourceItems = [...sourceColumn.task];
      const destItems = [...destColumn.task];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          task: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          task: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.task];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          task: copiedItems,
        },
      });
    }
  };
  return (
    <div className="list-container-bg">
      <h1 className="project-heading">Project Management</h1>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setcolumns)}
      >
        <div className="list-items">
          {Object.entries(columns).map(([columnId, column], index) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? "" : "",
                      padding: 4,
                      width: 250,
                      minHeight: 100,
                    }}
                  >
                    <ul className="list-item">
                      <CardsContainer label={label} listItem={column} key={columnId} />
                    </ul>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          ))}
          
        {addBoard ? (
          <form >
            <div className="add-list-container">
            <input
              type="text"
              placeholder="Enter a Title for this Board"
              className="add-card-input"
              onChange={(event) => setBoardTitle(event.target.value)}
              autoFocus
            />
            <div className="add-card-container">
              <Button className="add-inner-card" onClick={() => addList()}>
                Add List
              </Button>
              <X onClick={() => setAddBoard(false)} className='cancel-icon'/>
            </div>
            </div>
          </form>
        ) : (
          <Button className="add-list-button" onClick={() => setAddBoard(true)}>
            <span>+</span>Add List Container
          </Button>
        )}
        </div>

      </DragDropContext>
    </div>
  );
};


ListContainer.propTypes = {

  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
 
}

// ListContainer.defaultProps = {
//   label:"ADD CARD"
  
// };