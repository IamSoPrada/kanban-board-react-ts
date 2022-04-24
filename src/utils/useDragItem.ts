import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../store/listsSlice";

export const useDragItem = (item: DragItem) => {
  const dispatch = useDispatch();
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
