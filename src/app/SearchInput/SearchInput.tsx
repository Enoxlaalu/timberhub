'use client'

import Input from '@/components/Input/Input'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

interface ISearchInput {
    className?: string
}

const SearchInput: React.FC<ISearchInput> = ({ className }) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const onChange = useCallback(
        (value: string) => {
            if (value) {
                const params = new URLSearchParams(searchParams)
                params.set('search', value)
                router.replace(`${pathname}?${params.toString()}`)
            } else {
                router.replace(pathname)
            }
        },
        [searchParams]
    )

    return (
        <Input
            id="productsSearch"
            placeholder="Search"
            withIcon
            className={className}
            onChange={onChange}
            value={searchParams.get('search') as string}
        />
    )
}

export default SearchInput
