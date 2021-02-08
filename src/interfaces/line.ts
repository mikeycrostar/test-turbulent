export interface LineProps {
    id: any
    text: string
    index: number
    moveLine: (dragIndex: number, hoverIndex: number) => void
}


export const LineType = {
    LINE: 'line'
}

export interface LineInterface {
    text: string,
    id: number
}
