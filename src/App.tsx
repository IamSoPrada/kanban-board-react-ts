import { useState } from 'react'
import {
 AppContainer,
 } from "./styles"
import {Column} from "./Column"
import {AddNewItem} from "./AddNewItem"

export function App() {
  const [count, setCount] = useState(0)

  return (
    <AppContainer>
      <Column text="Todo" />
      <AddNewItem onAdd={console.log} toggleButtonText="+Добавить колонку" />
    </AppContainer>
  )
}


