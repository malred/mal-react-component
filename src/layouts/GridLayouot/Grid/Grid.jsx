let rowClassArr = [
    'grid-rows-1',
    'grid-rows-2',
    'grid-rows-3',
    'grid-rows-4',
    'grid-rows-5',
    'grid-rows-6',
]
let colsClassArr = [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8',
    'grid-cols-9',
    'grid-cols-10',
    'grid-cols-11',
    'grid-cols-12',
]
let gapClassArr = {
    "1": 'gap-1',
    "2": 'gap-2',
    "4": 'gap-2',
    "6": 'gap-6',
    "8": 'gap-8',
    "12": 'gap-12',
    "16": 'gap-16',
    "20": 'gap-20',
    "24": 'gap-24',
    "28": 'gap-28',
}
let gapXClassArr = {
    "1": 'gap-x-1',
    "2": 'gap-x-2',
    "4": 'gap-x-4',
    "6": 'gap-x-6',
    "8": 'gap-x-8',
    "12": 'gap-x-12',
    "16": 'gap-x-16',
    "20": 'gap-x-20',
    "24": 'gap-x-24',
    "28": 'gap-x-28',
}
let gapYClassArr = {
    "1": 'gap-y-1',
    "2": 'gap-y-2',
    "4": 'gap-y-4',
    "6": 'gap-y-6',
    "8": 'gap-y-8',
    "12": 'gap-y-12',
    "16": 'gap-y-16',
    "20": 'gap-y-20',
    "24": 'gap-y-24',
    "28": 'gap-y-28',
}

function rowClass(rows) {
    if (rows) {
        parseInt(rows)
        return rowClassArr[rows - 1]
    }
    return ''
}

function colClass(cols) {
    if (cols) {
        parseInt(cols)
        return colsClassArr[cols - 1]
    }
    return ''
}

function gapClass(gap) {
    return gapClassArr[gap]
}

function gapXClass(gapX) {
    if (gapX) {
        return gapXClassArr[gapX]
    }
    return ''
}

function gapYClass(gapY) {
    if (gapY) {
        return gapYClassArr[gapY]
    }
    return ''
}

function finalGapClass(gap) {
    // gap优先级大于分别指定x,y
    if (gap) {
        return gapClass(gap)
    }
    return ''
}

export const Grid = (props) => {
    const {className, children, rows, cols, gap, gapX, gapY, ...rest} = props


    return (<div
            className={"grid " +
                colClass(cols) + " " +
                rowClass(rows) + " " +
                finalGapClass(gap) + " " +
                gapXClass(gapX) + " " +
                gapYClass(gapY) + " " + className}
            {...rest}
        >
            {children}
        </div>
    )
}