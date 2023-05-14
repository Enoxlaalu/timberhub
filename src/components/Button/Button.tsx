import React, { FunctionComponent, SVGAttributes } from "react"
import styles from "./styles.module.scss"
import { addMuktaMaheeFont } from "@/helpers/fonts"
import Icon from "@/components/Icon/Icon"

interface IButton {
    text: string
    onClick?: () => void
    disabled?: boolean
    startIcon?: FunctionComponent<SVGAttributes<SVGElement>>
    type?: "primary" | "secondary" | "close"
}

const Button: React.FC<IButton> = ({
    text,
    onClick,
    disabled,
    startIcon,
    type = "primary",
}) => {
    return addMuktaMaheeFont(
        <button
            className={`${styles.button} ${styles[type]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {startIcon && <Icon icon={startIcon} />}
            <span>{text}</span>
        </button>
    )
}

export default Button
