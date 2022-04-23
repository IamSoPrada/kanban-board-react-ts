import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { useDispatch, useSelector } from "react-redux";
import { isHidden } from "./utils/isHidden";
import { useDragItem } from "./utils/useDragItem";
import { ColumnContainer, ColumnTitle } from "./styles";
import { addNewTask, moveList, draggedItemSelector } from "./store/listsSlice";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";
import type { Task } from "./store/listsSlice";

type ColumnProps = {
  id: string;
  columnName: string;
  tasks?: Task[];
  children?: React.ReactNode;
  isPreview?: boolean;
};

export function Column({
  columnName,
  tasks,
  id,
  isPreview,
  children,
}: ColumnProps) {
  const draggedItem = useSelector(draggedItemSelector);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: throttle(200, () => {
      if (!draggedItem) return;
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) return;
        const payload = {
          draggedId: draggedItem.id,
          hoverId: id,
        };
        dispatch(moveList(payload));
      }
    }),
  });
  const { drag } = useDragItem({ type: "COLUMN", id, columnName });
  const dispatch = useDispatch();

  const handleAddNewTask = (task: Task) => {
    dispatch(addNewTask(task));
  };
  drag(drop(ref));
  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id)}
    >
      <ColumnTitle>{columnName}</ColumnTitle>
      {tasks && tasks.map(({ text, id }) => <Card key={id} text={text} />)}
      <AddNewItem
        toggleButtonText="+Добавить задачу"
        listId={id}
        onAddNewTask={handleAddNewTask}
        dark
      />
    </ColumnContainer>
  );
}
