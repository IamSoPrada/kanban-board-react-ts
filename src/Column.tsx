import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { useDispatch, useSelector } from "react-redux";
import { isHidden } from "./utils/isHidden";
import { useDragItem } from "./utils/useDragItem";
import { ColumnContainer, ColumnTitle } from "./styles";
import {
  addNewTask,
  moveList,
  moveTask,
  draggedItemSelector,
  setDraggedItem,
} from "./store/listsSlice";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";
import type { Task } from "./store/listsSlice";

type ColumnProps = {
  id: string;
  columnName: string;
  isPreview?: boolean;
  tasks?: Task[];
};

export function Column({ columnName, id, isPreview, tasks }: ColumnProps) {
  const draggedItem = useSelector(draggedItemSelector);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover: throttle(200, () => {
      if (!draggedItem) return;
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) return;
        const payload = {
          draggedId: draggedItem.id,
          hoveredId: id,
        };
        dispatch(moveList(payload));
      } else {
        if (draggedItem.listId === id) return;
        if (tasks.length) return;
        const payload = {
          draggedId: draggedItem.id,
          hoveredId: null,
          sourceListId: draggedItem.listId,
          targetListId: id,
        };
        console.log(draggedItem);
        dispatch(moveTask(payload));
        dispatch(setDraggedItem({ ...draggedItem, listId: id }));
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
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{columnName}</ColumnTitle>
      {tasks &&
        tasks.map((task) => (
          <Card
            key={task.id}
            text={task.text}
            listId={task.listId}
            id={task.id}
          />
        ))}
      <AddNewItem
        toggleButtonText="+Добавить задачу"
        listId={id}
        onAddNewTask={handleAddNewTask}
        dark
      />
    </ColumnContainer>
  );
}
