import {useState} from 'react'
import { nanoid } from 'nanoid'
import {useFocus} from "./utils/useFocus"
import { NewItemButton, NewItemFormContainer, NewItemInput } from './styles'
import type {Task, List} from "./store/listsSlice"


type NewItemFormProps = {
	listId: string,
	onAddNewTask?: (item: Task) => void;
	onAddNewList?: (item: List) => void;
	setShowForm: (showForm: boolean) => void;
}

export const NewItemForm = ({onAddNewTask, onAddNewList, setShowForm, listId} : NewItemFormProps) => {
	const [text, setText] = useState("")
	const inputRef = useFocus()

	const handleTaskObject = () => {
			const task = {
				id: nanoid(),
				text,
				listId
			}
			onAddNewTask && onAddNewTask(task)
			setShowForm(false)
	}
	const handleListObject = () => {
			const list = {
				id: nanoid(),
				columnName: text,
				tasks: []
			}
			onAddNewList && onAddNewList(list)
			setShowForm(false)
	}

	const handleAddTaskOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key === "Enter") {
			onAddNewTask ? handleTaskObject() : handleListObject()
		}
	}

	const handleAddOnClick = () => {
		onAddNewTask ? handleTaskObject() : handleListObject()
	}

	return (
		<NewItemFormContainer>
			<NewItemInput onKeyPress={handleAddTaskOnEnter} ref={inputRef} value={text} onChange={(e)=> setText(e.target.value)} />
			<NewItemButton onClick={handleAddOnClick}>
				Добавить
			</NewItemButton>
		</NewItemFormContainer>
	)
}