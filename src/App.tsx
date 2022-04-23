import React from "react";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { CustomDragLayer } from "./CustomDragLayer";
import { listsSelector, addNewList } from "./store/listsSlice";
import type { List } from "./store/listsSlice";

import { AppContainer } from "./styles";
import { Column } from "./Column";
import { AddNewItem } from "./AddNewItem";

export function App() {
  const lists = useSelector(listsSelector);

  const dispatch = useDispatch();

  const handleAddNewList = (list: List) => {
    dispatch(addNewList(list));
  };
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists &&
        lists.map(({ columnName, tasks, id }) => (
          <Column key={id} id={id} columnName={columnName} tasks={tasks} />
        ))}
      <AddNewItem
        listId={nanoid()}
        onAddNewList={handleAddNewList}
        toggleButtonText="+Добавить колонку"
      />
    </AppContainer>
  );
}
