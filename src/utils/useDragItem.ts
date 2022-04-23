import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../store/listsSlice";

export const useDragItem = (item: DragItem) => {
  const dispatch = useDispatch();
  const [, drag] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });
  return { drag };
};
