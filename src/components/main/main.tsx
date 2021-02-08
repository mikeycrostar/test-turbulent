import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { SplitParagraph } from "../splitParagraph/splitParagraph";
import { MainProps } from "../../interfaces/main";

function Main({text}: MainProps) {
    return text && text.length ? (
        <DndProvider backend={HTML5Backend}>
            <SplitParagraph text={text}/>
        </DndProvider>
    ) : <div>Invalid params or empty string</div>
}

export default Main;
