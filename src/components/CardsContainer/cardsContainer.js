import React, { useState } from "react";
import { Button, Card } from "antd";
import { X } from "react-feather";
import "./cards.scss";

//
// import { List } from "antd";
// import { dummyListData } from '../../fixtures/dummyListData'

export const CardsContainer = ({ cardItem }) => {
  const [addOption, showAddOption] = useState(false);
  const [inpuValue, setInputValue] = useState();
  function submission(e) {
    e.preventDefault();
    cardItem.task.push(inpuValue);

    showAddOption(false);
  }

 

  return (
    <div>
      <div className="list-bg">
        <h1 className="project-title">{cardItem.title}</h1>

        {cardItem.task.map((item, i) => (
          <Card className="inserted-card">
            <p draggable={true}>{item}</p>
          </Card>
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
              <X onClick={() => showAddOption(false)} />
            </div>
          </form>
        ) : (
          <Button className="add-card-btn" onClick={() => showAddOption(true)}>
            <span>+</span>Add Card
          </Button>
        )}
      </div>
    </div>
  );
};
