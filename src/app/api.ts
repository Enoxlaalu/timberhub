import { IProduct } from '@/app/types'

export const getProducts = async (searchParams) => {
    const search = searchParams.search ? `&q=${searchParams.search}` : ''
    const res = await fetch(
        `http://localhost:3030/rows?_sort=id&_order=desc${search}`,
        {
            cache: 'no-store',
        }
    )

    return res.json()
}

export const addProduct = async (product: IProduct) => {
    const body = {
        ...product,
        created: Date.now(),
        dimensions: product.dimensions.filter((d) => Object.keys(d).length),
    }

    await fetch('http://localhost:3030/rows', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}
