import {useState} from 'react'
import { nanoid } from 'nanoid'
import {useFocus} from "./utils/useFocus"

import { NewItemButton, NewItemFormContainer, NewItemInput } from './styles'

type Task = {
	id:string
	listId?: string,
	text: string
}

type NewItemFormProps = {
	listId?: string,
	onAdd(task:Task): void
}

export const NewItemForm = ({onAdd, listId} : NewItemFormProps) => {
	const [text, setText] = useState("")
	const inputRef = useFocus()

	const handleAddTaskOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key === "Enter") {
			const task = {
				id: nanoid(),
				text,
				listId
			}

			onAdd(task)
		}
	}

	return (
		<NewItemFormContainer>
			<NewItemInput onKeyPress={handleAddTaskOnEnter} ref={inputRef} value={text} onChange={(e)=> setText(e.target.value)} />
			<NewItemButton onClick={()=> onAdd(text)}>
				Добавить
			</NewItemButton>
		</NewItemFormContainer>
	)
}