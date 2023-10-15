export const Flex = (props) => {
    const {children, col, row, center, reverse, wrap, ...rest} = props

    function colOrRow() {
        if (col) {
            if (reverse) {
                return 'flex-col flex-col-reverse'
            }
            return 'flex-col'
        }
        if (row) {
            if (reverse) {
                return 'flex-row flex-row-reverse'
            }
            return 'flex-row'
        }
        if (wrap) {
            if (reverse) {
                return 'flex-wrap flex-wrap-reverse'
            }
            return 'flex-wrap'
        }
        return ''
    }

    function center() {
        if (center) {
            return 'justify-center items-center'
        }
        return ''
    }

    return (
        <div className={"flex " +
            colOrRow() + " " + center()
        } {...rest} >
            {children}
        </div>
    )
}