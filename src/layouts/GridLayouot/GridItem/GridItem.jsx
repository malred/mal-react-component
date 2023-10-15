// 只提供1-12(和列数提供的一样)
const colSpanClassArr = [
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'col-span-6',
    'col-span-7',
    'col-span-8',
    'col-span-9',
    'col-span-10',
    'col-span-11',
    'col-span-12',
]
const rowSpanClassArr = [
    'row-span-1',
    'row-span-2',
    'row-span-3',
    'row-span-4',
    'row-span-5',
    'row-span-6',
]

function colSpanClass(col_span, col_full) {
    if (col_span) {
        return colSpanClassArr[col_span - 1];
    }
    if (col_full) {
        return 'col-span-full'
    }
    return ''
}

function rowSpanClass(row_span, row_full) {
    if (row_span) {
        return rowSpanClassArr[row_span - 1];
    }
    if (row_full) {
        return 'row-span-full'
    }
    return ''
}

export const GridItem = (props) => {
    const {className, children, col_full, col_span, row_full, row_span, ...rest} = props
    return (
        <div
            {...rest}
            className={
                className + " " +
                colSpanClass(col_span, col_full) + " " +
                rowSpanClass(row_span, row_full)}>
            {children}
        </div>
    )
}