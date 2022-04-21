import {useState} from "react"
import { AddItemButton } from './styles'
import {NewItemForm} from './NewItemForm'

type Task = {
	id:string
	listId: string,
	text: string
}

type AddNewItemProps = {
	onAdd: (task: Task) => void;
	toggleButtonText: string;
	dark?:boolean
}

export const AddNewItem = (props: AddNewItemProps) => {
	const [showForm, setShowForm ] = useState(false)
	const {onAdd, toggleButtonText, dark} = props

	if(showForm) {
		return (
			<NewItemForm onAdd={(task)=> {
				onAdd(task) 
				setShowForm(false)
			}}/>
		)
	}

	return (
		<AddItemButton dark={dark} onClick={()=> setShowForm(true)}>
			{toggleButtonText}
		</AddItemButton>
	)
}