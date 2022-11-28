import React, { useState } from 'react'
import './listContainer.scss'
import { Button, List } from "antd";
import { dummyListData } from '../../fixtures/dummyListData'
import { CardsContainer } from '../CardsContainer/cardsContainer';
import { X } from "react-feather";



export const ListContainer = () => {
  const [addBoard,setAddBoard] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
function addList (event) {
  event.preventdefault();
  dummyListData.title.push(boardTitle);
  console.log(dummyListData)
}
  return (
    <div className='list-container-bg'>
        <h1 className='project-heading'>Project Management</h1>
        <div>
        <List
         itemLayout="horizontal"
         dataSource={dummyListData}
         renderItem={(cardItem, i) => (
            <List.Item className='list-item' >
              <CardsContainer cardItem={cardItem} key ={dummyListData.id}/>
            </List.Item>

          )}


        />
        {
          addBoard ? (
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
          ): <Button className="add-card-btn" onClick={() => setAddBoard(true)}>
            <span>+</span>Add Board
          </Button>
        }
      </div>
    </div>
  )
}
