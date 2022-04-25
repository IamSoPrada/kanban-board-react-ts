export type ColumnDragItem = {
  id: string;
  columnName: string;
  type: "COLUMN";
};

export type CardDragItem = {
  id: string;
  listId: string;
  text: string;
  type: "CARD";
};

export type DragItem = ColumnDragItem | CardDragItem;
