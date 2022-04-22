import {ColumnContainer, ColumnTitle} from "./styles"
import { useDispatch } from 'react-redux'
import {addNewTask} from "./store/listsSlice"
import {Card} from "./Card"
import {AddNewItem} from "./AddNewItem"
import type {Task, List} from "./store/listsSlice"


type ColumnProps = {
	id: string,
	columnName: string;
	tasks?: Task[],
	children?: React.ReactNode;
}


export const Column = ({columnName, tasks, id}: ColumnProps) => {
	const dispatch = useDispatch()

	const handleAddNewTask = (task: Task) => {
		dispatch(addNewTask(task))
	}
	
	return (
		<ColumnContainer>
			<ColumnTitle>{columnName}</ColumnTitle>
			{tasks && tasks.map(({text, id, listId})=> <Card key={id} text={text} listId={listId} />)}			
			<AddNewItem toggleButtonText="+Добавить задачу" listId={id} onAddNewTask={handleAddNewTask} dark/>
		</ColumnContainer>
	)
}