import { IProduct } from '@/app/types'
import Table from '@/components/Table/Table'
import React from 'react'
import styles from './styles.module.scss'
import Timber from 'public/svg/timber.svg'
import { getProducts } from '@/app/api'
import Badge from '@/components/Badge/Badge'

interface IProductsTable {
    searchParams: { [key: string]: string }
}

const ProductsTable = async ({ searchParams }: IProductsTable) => {
    const rows = await getProducts(searchParams)

    const renderProductCell = (data: IProduct) => {
        const { species, grade, drying_method, id, created } = data

        const renderDate = () => {
            const date = new Date(created)
            const month = date.toLocaleString('default', { month: 'long' })

            const [day, year] = [date.getDate(), date.getFullYear()]

            return (
                <span className={styles.date}>
                    {day} {month} {year}
                </span>
            )
        }

        return (
            <div className={styles.productCell}>
                <Timber />
                <div className={styles.information}>
                    <p className={styles.name}>
                        {species}, {grade}, {drying_method}
                    </p>
                    <span className={styles.productId}>#{id}</span>
                    {created && renderDate()}
                </div>
            </div>
        )
    }

    const renderDimensionsCell = (data: IProduct) => {
        const { dimensions } = data

        let visible = dimensions
        let hidden,
            textForHidden = ''

        if (!dimensions) return null

        if (dimensions.length > 3) {
            visible = dimensions.slice(0, 3)
            hidden = dimensions.slice(3)
            textForHidden = `+${hidden.length} more set${
                hidden.length > 1 ? 's' : ''
            }`
        }

        return (
            <div className={styles.dimensionsCell}>
                {visible.map(({ thickness, width }, index) => {
                    const text = `${thickness}x${width}`

                    return <Badge text={text} index={index + 1} />
                })}
                {hidden && <Badge text={textForHidden} />}
            </div>
        )
    }

    const columns = [
        {
            id: 'product',
            name: 'Product',
            description: 'Species, Grade, Drying',
            cell: renderProductCell,
            width: 45,
        },
        {
            id: 'dimensions',
            name: 'Dimensions',
            description: 'Thickness x Width',
            cell: renderDimensionsCell,
        },
    ]

    return <Table<IProduct> rows={rows} columns={columns} />
}

export default ProductsTable
