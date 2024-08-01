export const Button = (props) => {
    const {children, className, type, plain, lg, md, sm, round, ...rest} = props

    let btnClass = ''
    // 是否圆形按钮
    if (round) {
        btnClass += ' rounded-3xl '
    } else {
        btnClass += ' rounded-md '
    }
    // 朴素按钮 和 按钮类型 不能同时
    // 传入plain，朴素模式
    if (!plain) {
        switch (type) {
            case 'danger':
                btnClass += ' bg-red-500 hover:bg-red-400 border-solid border border-[gray] text-white'
                break
            case 'warning':
                btnClass += ' bg-amber-500 hover:bg-amber-400 text-white'
                break
            case 'success':
                btnClass += ' bg-green-500 hover:bg-green-400 text-white'
                break
            case 'info':
                btnClass += ' bg-gray-500 hover:bg-gray-400 text-white'
                break
            case 'primary':
                btnClass += ' bg-sky-400 hover:bg-sky-300 text-white'
                break
            default:
                btnClass += ' border-solid border border-[gray] hover:bg-sky-100'
                break
        }
    } else {
        switch (type) {
            case 'danger':
                btnClass += ' bg-red-200 hover:bg-red-500 ' +
                    'border-solid border border-[red] ' +
                    'text-[red] hover:text-white'
                break
            case 'warning':
                btnClass += ' bg-amber-200 hover:bg-amber-500 ' +
                    'border-solid border border-[orange] ' +
                    'text-[orange] hover:text-white'
                break
            case 'success':
                btnClass += ' bg-green-200 hover:bg-green-500 ' +
                    'border-solid border border-[green] ' +
                    'text-[green] hover:text-white'
                break
            case 'info':
                btnClass += ' bg-gray-200 hover:bg-gray-500 ' +
                    'border-solid border border-[gray] ' +
                    'text-[gray] hover:text-white'
                break
            case 'primary':
                btnClass += ' bg-sky-200 hover:bg-sky-400 ' +
                    'border-solid border border-[skyblue] ' +
                    'text-[blue] hover:text-white'
                break
            default:
                btnClass += ' border-solid border border-[gray] hover:bg-sky-100'
                break
        }
    }
    // 按钮大小
    if (lg) {
        btnClass += " text-lg px-7 py-3 font-bold "
    } else if (md) {
        btnClass += " text-md px-5 py-2 font-medium "
    } else if (sm) {
        btnClass += " text-sm px-3 py-1 font-light "
    } else {
        btnClass += " text-md px-5 py-2 font-medium "
    }
    // 阴影 浮起
    // btnClass += " hover:shadow-lg hover:animate-bounce "
    btnClass += " hover:shadow-lg hover:scale-110 transition duration-150 ease-in-out "

    return (
        <button className={`${btnClass + className}`} {...rest}>
            {children}
        </button>
    )
}
export default Button
