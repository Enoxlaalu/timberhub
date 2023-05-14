import { mukta_mahee } from "@/app/fonts"
import { cloneElement } from "react"

export const addMuktaMaheeFont = (el: JSX.Element) => {
    const font = mukta_mahee.className

    return cloneElement(
        el,
        { ...el.props, className: `${el.props.className} ${font}` },
        el.props.children
    )
}
