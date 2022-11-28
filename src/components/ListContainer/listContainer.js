import React, { useState } from "react";
import "./listContainer.scss";
import { Button, List } from "antd";
import { dummyListData } from "../../fixtures/dummyListData";
import { CardsContainer } from "../CardsContainer/cardsContainer";
import { X } from "react-feather";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import Column from "antd/es/table/Column";

export const ListContainer = () => {
  const [columns, setcolumns] = useState(dummyListData);

  const [addBoard, setAddBoard] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  function addList(event) {
    event.preventdefault();
    dummyListData.title.push(boardTitle);
    console.log(dummyListData);
  }
  const onDragEnd = (result, columns, setColumns) => {
    console.log(columns)
    

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
        <div>
          <List
            itemLayout="horizontal"
            dataSource={dummyListData}
            renderItem={(listItem, index) => (
              <Droppable droppableId={listItem.listId} key={listItem.listId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      <List.Item className="list-item">
                        <CardsContainer
                          listItem={listItem}
                          key={listItem.listId}
                        />
                      </List.Item>
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            )}
          />
          {addBoard ? (
            <form onSubmit={addList}>
              <input
                type="text"
                placeholder="Enter a Title for this Board"
                className="add-card-input"
                onChange={(event) => setBoardTitle(event.target.value)}
                autoFocus
              />
              <div className="add-card-container">
                <Button htmlType="submit" className="add-inner-card">
                  Add Card
                </Button>
                <X onClick={() => setAddBoard(false)} />
              </div>
            </form>
          ) : (
            <Button className="add-card-btn" onClick={() => setAddBoard(true)}>
              <span>+</span>Add Board
            </Button>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};
