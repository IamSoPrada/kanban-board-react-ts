import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { DragItem, ColumnDragItem } from "../DragItem";
import { setDraggedItem } from "../store/listsSlice";

export const useDragItem = (item: DragItem) => {
  const dispatch = useDispatch();
  const [, drag] = useDrag({
    type: item.type,
    id: item.id,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });
  return { drag };
};
