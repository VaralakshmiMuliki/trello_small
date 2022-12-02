import React, { useState } from "react";
import { Button, Card } from "antd";
import { X } from "react-feather";
import "./cards.scss";
import { Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { AddCard } from "../AddCard/addCard";
// import { useRef, useEffect } from "react";
// import OutsideClickHandler from "react-outside-click-handler";

export const CardsContainer = ({ listItem, label }) => {
  const [addOption, showAddOption] = useState(false);
  const [inputValue, setInputValue] = useState();

  function submission(e) {
    e.preventDefault();
    let newCard = { id: uuidv4(), content: `${inputValue}` };
    //  newCard =! undefined ? listItem.task.push(newCard)
    if (inputValue !== undefined) {
      listItem.task.push(newCard);
    }
    showAddOption(false);
  }
  // const { listTitle, setListTitle } = useState(listItem.name);
  // const currentField = useRef(null);
  // const [edit, editSet] = useState(false);
  // useEffect(() => {
  //   if (edit) {
  //     currentField.current.select();
  //     currentField.current.style.height =
  //       currentField.current.scrollHeight + "px";
  //   }
  // }, [edit]);
   
  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" || e === "outside") {
  //     if (listTitle === "") {
  //       setListTitle(listItem.name);
      
  //     }
  //     else{
  //       // listItem.name = listTitle
  //       console.log(listTitle)
  //       // setListTitle(listTitle);
  //     }
  //     editSet(false);
      

  //   }
  // };
 
  // drag and drop

  return (
    <div>
      <li className="list-bg">
        {/* <OutsideClickHandler onOutsideClick={() => handleKeyPress("outside")}>
          <div id="mi">
            {edit ? (
              <textarea
                id="mi-textarea"
                className="project-title"
                type="text"
                value={listTitle}
                defaultValue={listItem.name}
                onChange = {(event) => setListTitle(event.target.value)}
                // onKeyPress={handleKeyPress}
                ref={currentField}
                rows="1"
              />
            ) : (
              <div
                className="project-title"
                onClick={() => editSet(true)}
                id="mi-div"
              >
                {listItem.name}
              </div>
            )}
          </div>
        </OutsideClickHandler> */}

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
              <X onClick={() => showAddOption(false)} className="cancelIcon" />
            </div>
          </form>
        ) :
        
        <AddCard showAddOption={showAddOption} label={label}/>
       }
      </li>
    </div>
  );
};

// CardsContainer.defaultProps = {
//   label:"ADD CARD"
  
// };