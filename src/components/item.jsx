import React from 'react'
import { useState, useRef } from 'react'
import { useDrag,useDrop } from "react-dnd";
import {ITEM_TYPE} from './types'
export const Item = ({item,index,moveItem,status}) => {
    const ref = useRef(null);
    const [,drop] = useDrop({
      accept:ITEM_TYPE,
      hover(item,monitor){
          if(!ref.current){
              return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          if(dragIndex === hoverIndex){
              return;
          }
          
          const hoveredReact = ref.current.getBoundlientReact();
          const hoverMiddleY = (hoveredReact.bottom- hoveredReact.top)/2;
          const mouseposition = monitor.getClientOffset();
          const hoverClientY = mouseposition.y - hoveredReact.top;
          if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY){
              return
          }
          if(dragIndex > hoverIndex && hoverClientY < hoverMiddleY){
              return
          }
          moveItem(dragIndex,hoverIndex);
          item.index = hoverIndex
  
      }
  });
   const [{isdragging} ,  drag] =  useDrag({
      item:{type:ITEM_TYPE, ...item, index},
      collect:monitor =>({
          isdragging:monitor.isDragging()
      })
   });
  
   const [show , setShow] = useState(false);
   const onOpen = () => setShow(true);
   const onClose = () => setShow(false)
   drag(drop(ref));
  
 return (
    <>
    <div
    ref = {ref}
    style ={{opacity:isdragging ? 0:1}}
    onClick = {onOpen}
    >

    </div>
    </>
 );
};
