import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import type { RootState } from './index'

 type Task = {
	id:string
	listId: string,
	text: string
}

type List = {
	id: string
	columnName: string
	tasks: Task[]
}

type Lists= {
	lists: List[],
}

const initialState : Lists = {
	lists: [
		{
			id: "4f90d13a42",
			columnName:'Todo', 
			tasks: [{id: '1', listId: "4f90d13a42", text: 'Изучить стейт-менеджмент библиотеки'}]
		},
		{
			id: "4f90d13a43",
			columnName:'В процессе', 
			tasks: [{id: '1', listId: "4f90d13a43", text: 'Изучение typescript'}]
		}
	]
}

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers : {
	  addList:(state,  { payload }: PayloadAction<List> ) => {
		state.lists.push(payload)
	  },
	  removeList:(state,  { payload }: PayloadAction<List> ) => {
		state.lists = state.lists.filter(list => list.id !== payload.id)
	  },
	  addNewTask:(state,  { payload }: PayloadAction<Task> ) => {
		const list = state.lists.find(list => list.id === payload.listId)
		list?.tasks.push(payload)
	  }
  }
})

export const {addList, removeList, addNewTask} = listsSlice.actions

export const listsSelector = (state: RootState) => state.listsSlice.lists

export default listsSlice.reducer