import { LineInterface } from "../interfaces/line";

const splitText = (text: string): string[] => {
    if (!text.length) return []
    return text.split(' ')
}

const arrangeLine = (splitText: string[], characterLimit: number = 80): LineInterface[] => {
    const line: LineInterface[] = []
    let indexLine: number = 0

    splitText.forEach((words: string, i: number, currentArray: string[]) => {
        if (!line[indexLine]) line[indexLine] = {text: '', id: indexLine}

        if (words.length < characterLimit) line[indexLine].text += `${words} `

        if ((currentArray[i + 1] &&
            line[indexLine].text.length + currentArray[i + 1].length > characterLimit)
            || currentArray.length === i + 1) {

            line[indexLine].text = line[indexLine].text.trim()
            indexLine++;
        }
    })
    return line
}

export {
    arrangeLine,
    splitText
}
