import React, { useState } from "react";
import { AddItemButton } from "./styles";
import { NewItemForm } from "./NewItemForm";
import type { Task, List } from "./store/listsSlice";

type AddNewItemProps = {
  listId: string;
  onAddNewTask?: (item: Task) => void;
  onAddNewList?: (item: List) => void;
  toggleButtonText: string;
  dark?: boolean;
};

export function AddNewItem(props: AddNewItemProps) {
  const [showForm, setShowForm] = useState(false);
  const { onAddNewTask, onAddNewList, toggleButtonText, dark, listId } = props;

  if (showForm) {
    return (
      <NewItemForm
        listId={listId}
        onAddNewTask={onAddNewTask && onAddNewTask}
        onAddNewList={onAddNewList && onAddNewList}
        setShowForm={setShowForm}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
}
