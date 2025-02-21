import type React from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Sidebar from "../../components/sidebar"
import { ThemeProvider } from "../../components/theme-provider"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
                    
                <Footer />
            </div>
        </div>
            
        // </ThemeProvider>
    )
}