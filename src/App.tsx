import { useState } from 'react'
import { nanoid } from 'nanoid'
import {useSelector} from "react-redux"
import {listsSelector} from "./store/listsSlice"

import {
 AppContainer,
 } from "./styles"
import {Column} from "./Column"
import {AddNewItem} from "./AddNewItem"

export function App() {
  const [count, setCount] = useState(0)
  const lists = useSelector(listsSelector)
  return (
    <AppContainer>
      {lists && lists.map(({columnName, tasks, id}) => <Column key={id} id={id} columnName={columnName} tasks={tasks}/>)}
      <AddNewItem onAdd={console.log} toggleButtonText="+Добавить колонку" />
    </AppContainer>
  )
}


