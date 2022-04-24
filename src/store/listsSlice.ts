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
  hoveredId: string;
};

export type MoveTask = {
  draggedId: string;
  hoveredId: string | null;
  sourceListId: string;
  targetListId: string;
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
          id: "122",
          listId: "4f90d13a42",
          text: "Изучить стейт-менеджмент библиотеки",
        },
      ],
    },
    {
      id: "4f90d13a43",
      columnName: "В процессе",
      tasks: [
        { id: "1211", listId: "4f90d13a43", text: "Изучение typescript" },
      ],
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
      const { draggedId, hoveredId } = payload;
      const draggedIndex = findItemIndexById(state.lists, draggedId);
      const hoverIndex = findItemIndexById(state.lists, hoveredId);
      state.lists = moveItem(state.lists, draggedIndex, hoverIndex);
    },
    moveTask: (state, { payload }: PayloadAction<MoveTask>) => {
      const { draggedId, hoveredId, sourceListId, targetListId } = payload;
      const sourceListIndex = findItemIndexById(state.lists, sourceListId);
      const targetListIndex = findItemIndexById(state.lists, targetListId);

      const dragIndex = findItemIndexById(
        state.lists[sourceListIndex].tasks,
        draggedId
      );

      const hoverIndex = findItemIndexById(
        state.lists[targetListIndex].tasks,
        hoveredId
      );

      const item = state.lists[sourceListIndex].tasks[dragIndex];
      state.lists[sourceListIndex].tasks.splice(dragIndex, 1);
      state.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);
    },
    setDraggedItem: (state, action: PayloadAction<DragItem | null>) => {
      state.draggedItem = action.payload;
    },
  },
});

export const {
  addNewList,
  moveTask,
  moveList,
  removeList,
  addNewTask,
  setDraggedItem,
} = listsSlice.actions;

export const listsSelector = (state: RootState) => state.listsSlice.lists;
export const getTasksByListId = (lists: List[], listId: string) => {
  return lists.find((list) => list.id === listId)?.tasks;
};

export const draggedItemSelector = (state: RootState) =>
  state.listsSlice.draggedItem;

export default listsSlice.reducer;
