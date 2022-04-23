import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findItemById, findItemIndexById, moveItem } from "../utils/arrayUtils";
import type { RootState } from "./index";
import type { DragItem } from "../DragItem";

export type Task = {
  id: string;
  listId: string;
  text: string;
};

export type List = {
  id: string;
  columnName: string;
  tasks: Task[];
};

export type MoveList = {
  draggedId: string;
  hoverId: string;
};

export type Lists = {
  lists: List[];
  draggedItem: DragItem | null;
};

const initialState: Lists = {
  lists: [
    {
      id: "4f90d13a42",
      columnName: "Todo",
      tasks: [
        {
          id: "1",
          listId: "4f90d13a42",
          text: "Изучить стейт-менеджмент библиотеки",
        },
      ],
    },
    {
      id: "4f90d13a43",
      columnName: "В процессе",
      tasks: [{ id: "1", listId: "4f90d13a43", text: "Изучение typescript" }],
    },
  ],
  draggedItem: null,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addNewList: (state, { payload }: PayloadAction<List>) => {
      state.lists.push(payload);
    },
    removeList: (state, { payload }: PayloadAction<List>) => {
      state.lists = state.lists.filter((list) => list.id !== payload.id);
    },
    addNewTask: (state, { payload }: PayloadAction<Task>) => {
      const list = findItemById(state.lists, payload.listId);
      list?.tasks.push(payload);
    },
    moveList: (state, { payload }: PayloadAction<MoveList>) => {
      const { draggedId, hoverId } = payload;
      const draggedIndex = findItemIndexById(state.lists, draggedId);
      const hoverIndex = findItemIndexById(state.lists, hoverId);
      state.lists = moveItem(state.lists, draggedIndex, hoverIndex);
    },
    setDraggedItem: (state, { payload }: PayloadAction<DragItem | null>) => {
      state.draggedItem = payload;
    },
  },
});

export const { addNewList, moveList, removeList, addNewTask, setDraggedItem } =
  listsSlice.actions;

export const listsSelector = (state: RootState) => state.listsSlice.lists;
export const draggedItemSelector = (state: RootState) =>
  state.listsSlice.draggedItem;

export default listsSlice.reducer;
