import { inter } from "@/app/fonts"
import "src/globals.css"

export const metadata = {
    title: "Timberhub",
    description: "Created by Alex Cherkasov",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
