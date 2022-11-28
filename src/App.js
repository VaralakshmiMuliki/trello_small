import './App.css';
import './App.scss';
import {ListContainer} from '../src/components/ListContainer/listContainer'
import {DndProvider} from 'react-dnd'
import {Backend} from 'react-dnd-html5-backend'
function App() {
  return (
  <>
  <DndProvider backend={Backend}>
  <ListContainer/>
  </DndProvider>
   
  
  </>
  );
}

export default App;
