import {ColumnContainer, ColumnTitle} from "./styles"
import { useDispatch } from 'react-redux'
import {addNewTask} from "./store/listsSlice"
import {Card} from "./Card"
import {AddNewItem} from "./AddNewItem"

type Task = {
	id:string
	listId: string,
	text: string
}

type ColumnProps = {
	id?: string,
	columnName: string;
	tasks: Task[],
	children?: React.ReactNode;
}



export const Column = ({columnName, tasks, id}: ColumnProps) => {
	const dispatch = useDispatch()

	const handleAddNewTask = (task:Task) => {
		dispatch(addNewTask(task))
	}
	return (
		<ColumnContainer>
			<ColumnTitle>{columnName}</ColumnTitle>
			{tasks && tasks.map(({text, id})=> <Card key={id} text={text} />)}			
			<AddNewItem toggleButtonText="+Добавить задачу" onAdd={handleAddNewTask} dark/>
		</ColumnContainer>
	)
}