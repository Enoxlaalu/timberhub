export default function debounce(
    func: (value: string) => void,
    timeout = 500
): (value: string) => void {
    let timer: ReturnType<typeof setTimeout>

    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(value)
        }, timeout)
    }
}
