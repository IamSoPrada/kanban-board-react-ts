import React from "react";
import { useSelector } from "react-redux";
import { useDragLayer } from "react-dnd";
import { DragPreviewWrapper, CustomDragLayerContainer } from "./styles";
import { draggedItemSelector } from "./store/listsSlice";
import { Column } from "./Column";
import { Card } from "./Card";

export function CustomDragLayer() {
  const draggedItem = useSelector(draggedItemSelector);
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column
            id={draggedItem.id}
            columnName={draggedItem.columnName}
            isPreview
          />
        ) : (
          <Card
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
            listId={draggedItem.listId}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
}
