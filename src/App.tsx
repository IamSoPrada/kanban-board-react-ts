import { useState } from 'react'
import {
 AppContainer,
 } from "./styles"
import {Column} from "./Column"

export function App() {
  const [count, setCount] = useState(0)

  return (
    <AppContainer>
      <Column text="Todo" />
    </AppContainer>
  )
}


