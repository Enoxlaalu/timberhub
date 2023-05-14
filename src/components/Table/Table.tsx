import React from 'react'
import styles from './styles.module.scss'

interface ITable<T> {
    rows: T[]
    columns: Array<{
        id: string
        name: string
        description?: string
        path?: string
        cell: (data: T) => React.ReactNode
        width?: number
    }>
}

const Table = <T extends { id: number }>({ rows, columns }: ITable<T>) => {
    const renderColumns = () => {
        return columns.map(({ id, name, description, width }) => {
            return (
                <th
                    key={id}
                    style={width ? { width: `${width}%` } : {}}
                    className={styles.headerCell}
                >
                    {name} <span>{description ? `(${description})` : ''}</span>
                </th>
            )
        })
    }

    const renderRows = () => {
        return rows.map((row) => {
            return (
                <tr key={row.id}>
                    {columns.map(({ id, cell }) => {
                        const renderCell = () =>
                            typeof cell === 'function' ? cell(row) : cell

                        return (
                            <td key={id} className={styles.rowCell}>
                                {renderCell()}
                            </td>
                        )
                    })}
                </tr>
            )
        })
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>{renderColumns()}</tr>
                </thead>
                <tbody>{renderRows()}</tbody>
            </table>
        </div>
    )
}

export default Table
