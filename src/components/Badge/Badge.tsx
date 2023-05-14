import React from "react"
import styles from "./styles.module.scss"

interface IBadge {
    text: string
    index?: number
}

const Badge: React.FC<IBadge> = ({ text, index }) => {
    return (
        <div className={styles.badge}>
            {index && <span className={styles.index}>{index}</span>}
            {text}
        </div>
    )
}

export default Badge
