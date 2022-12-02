import React from "react";

import {ListContainer} from '../components/ListContainer/listContainer'
export default {
    title:'List Container',
    component:ListContainer
}

export const ListComponent = (args) => <ListContainer {...args}/>

export const List = ListComponent.bind({});
List.args = {
    label:'ADD CARD'
}