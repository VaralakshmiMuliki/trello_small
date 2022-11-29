import React, { useState } from "react";
import { Button, Card } from "antd";
import { X } from "react-feather";
import "./cards.scss";
import { Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
// import { dummyListData } from "../../fixtures/dummyListData";

export const CardsContainer = ({ listItem }) => {
  const [addOption, showAddOption] = useState(false);
  const [inputValue, setInputValue] = useState();

  function submission(e) {
    e.preventDefault();
    let newCard = { id: uuidv4(), content: `${inputValue}` };
    //  newCard =! undefined ? listItem.task.push(newCard)
    if(inputValue !== undefined){
      listItem.task.push(newCard)
    }
    showAddOption(false);
  }


  // drag and drop

  return (
    <div>
      <li className="list-bg">
        <h1 className="project-title">{listItem.name}</h1>

        {listItem.task.map((item, i) => (
          <Draggable key={item.id} draggableId={item.id} index={i}>
            {(provided, snapshot) => {
              return (
                <Card
                  className="inserted-card"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: "none",
                    padding: 16,
                    margin: "0 0 8px 0",
                    minHeight: "50px",
                    backgroundColor: snapshot.isDragging
                      ? "#ffffff"
                      : "#ffffff",
                    color: "#2B3A55",
                    ...provided.draggableProps.style,
                  }}
                >
                  <p draggable={true}>{item.content}</p>
                </Card>
              );
            }}
          </Draggable>
        ))}
        {addOption ? (
          <form onSubmit={submission}>
            <input
              type="text"
              placeholder="Enter a Title for this card"
              className="add-card-input"
              onChange={(event) => setInputValue(event.target.value)}
              autoFocus
            />
            <div className="add-card-container">
              <Button htmlType="submit" className="add-inner-card">
                Add Card
              </Button>
              <X onClick={() => showAddOption(false)} className='cancelIcon'/>
            </div>
          </form>
        ) : (
          <Button className="add-card-btn" onClick={() => showAddOption(true)}>
            <span>+</span>Add Card
          </Button>
        )}
      </li>
    </div>
  );
};
