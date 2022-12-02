import { Button } from 'antd'
import React from 'react'


export const AddCard = ({showAddOption,label}) => {
  return (
    <Button className="add-card-btn" onClick={() => showAddOption(true)}>
    <span>+</span>{label}
  </Button>
  )
}

AddCard.defaultProps = {
    label:"ADD CARD"
    
  };