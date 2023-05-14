import React, { FunctionComponent, SVGAttributes, SyntheticEvent } from "react"
import styles from "./styles.module.scss"

interface IIcon {
    id?: string
    className?: string
    icon: FunctionComponent<SVGAttributes<SVGElement>>
    onClick?: (e: SyntheticEvent) => void
}

const Icon: React.FC<IIcon> = ({ id, className, icon, onClick }) => {
    if (!icon) return null

    const Component = icon

    return (
        <Component
            data-name={id}
            className={`${styles.icon} ${className}`}
            onClick={onClick}
        />
    )
}

export default Icon
