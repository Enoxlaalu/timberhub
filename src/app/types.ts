import { FunctionComponent, SVGAttributes } from 'react'

export interface IDimensions {
    thickness: number
    width: number
    length: number
}

export interface IProduct {
    id: number
    created: number
    usage: string
    species: string
    drying_method: string
    grade: string
    treatment: null
    dimensions: IDimensions[]
}

export interface IProductSection {
    id: string
    name: string
    icon: FunctionComponent<SVGAttributes<SVGElement>>
    data: Array<{
        id: string
        label: string
        required?: boolean
        onlyNumbers?: boolean
        options?: string[]
        description?: string
    }>
}
