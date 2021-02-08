import React, { useCallback, useState } from "react";
import update from 'immutability-helper';
import { debounce } from "lodash"

import { Line } from "../line/line";
import { arrangeLine, splitText } from '../../utils/tools';
import { postData } from "../../services/api";
import { LineInterface, LineProps } from "../../interfaces/line";

import "./splitParagraph.css"

const SplitParagraph = (props: { text: string; }) => {
    const string: string[] = splitText(props.text)
    const [lines, setLines] = useState(arrangeLine(string, 90))
    const [loading, setLoading] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceReact = useCallback(
        debounce(async data => {
            setLoading(true)
            await postData({order: data.map((dataLine: LineInterface) => dataLine.text)})
            setLoading(false)
        }, 2000), [])

    const moveLine = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragLine = lines[dragIndex]
        const updateLine = update(lines, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragLine]
            ]
        })
        setLines(
            updateLine
        )
        debounceReact(updateLine)
    }, [lines])

    const rendered = ({id, text, moveLine, index}: LineProps) => {
        return (<Line key={id} id={id} text={text} index={index} moveLine={moveLine}/>)
    }

    return !loading ? (<div>
        {
            lines.map((lineInfo: any, index: number) => {
                return rendered({id: lineInfo.id, text: lineInfo.text, index, moveLine})
            })
        }
    </div>) : (<>
        Veuillez patienter
        <div className='dot'/>
        <div className='dot'/>
        <div className='dot'/>
    </>)
}

export { SplitParagraph };
