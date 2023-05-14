import styles from './page.module.scss'
import Layout from '@/components/Layout/Layout'
import Input from '@/components/Input/Input'
import { mukta_mahee } from '@/app/fonts'
import ProductsTable from '@/app/ProductsTable/ProductsTable'
import CreateProductButton from '@/app/CreateProductButton/CreateProductButton'
import { Suspense } from 'react'
import SearchInput from '@/app/SearchInput/SearchInput'

interface IAPP {
    searchParams: {[key: string]: string}
}

const App: React.FC<IAPP> = ({ searchParams }) => {
    return (
        <Layout>
            <main className={styles.page}>
                <header
                    className={`${styles.pageHeader} ${mukta_mahee.className}`}
                >
                    <h1 className={`${styles.title}`}>All Products</h1>
                    <CreateProductButton />
                </header>
                <SearchInput className={styles.productsSearch} />
                <Suspense fallback={'Loading....'}>
                    {/* @ts-expect-error Server Component */}
                    <ProductsTable searchParams={searchParams} />
                </Suspense>
            </main>
        </Layout>
    )
}

export default App
