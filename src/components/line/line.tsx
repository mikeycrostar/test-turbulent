import { useRef } from "react";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";

import { LineProps, LineType } from "../../interfaces/line";
import { DragItem } from "../../interfaces/Item"

import "./line.css"

export const Line = ({id, text, index, moveLine}: LineProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: LineType.LINE,
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveLine(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })
    const [{isDragging}, drag] = useDrag({
        item: {type: LineType.LINE, id, index},
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    const opacity = isDragging ? 0 : 1

    drag(drop(ref))
    return (<div className='line' ref={ref} key={id} style={{opacity}}>
        {text}
    </div>)
}
