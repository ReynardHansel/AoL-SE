"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

type DndContextContainerProps = {
  children: React.ReactNode;
  onDragEnd?(event: DragEndEvent): void;
};

export default function DndContextContainer({
  children,
  onDragEnd,
}: DndContextContainerProps) {
  return <DndContext onDragEnd={onDragEnd}>{children}</DndContext>;
}
