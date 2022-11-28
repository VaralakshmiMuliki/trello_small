// import uuid from "uuid/v4";
import { v4 as uuidv4 } from "uuid";

// export const dummyListData = [
//   { id:1, title: "Project Resource", task: ["Weekly Updates",'Tasks Done'] },
//   { id:2,title: "Done", task: ["Monthly Updates"] },
//   { id:3, title: "Pending", task: ["stakeholders"] },
// ];

export const dummyListData = [
  {
    listId : uuidv4(),
    name: "Project Resource",
    task: [
      { id: uuidv4(), content: "Weekly Updates" },
      { id: uuidv4(), content: "Tasks Done" },
    ],
  },
  { 
    listId : uuidv4(),
    name: "Done",
    task: [
      { id: uuidv4(), content: "Monthly Updates" },
      { id: uuidv4(), content: "Tasks Done" },
    ],
  },
  {
    listId : uuidv4(),
    name: "pending",
    task: [
      { id: uuidv4(), content: "StakeHolders" },
      { id: uuidv4(), content: "Tasks Done" },
    ],
  },
];
