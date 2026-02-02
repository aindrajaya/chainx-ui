"use client"

import Link from "next/link"
import StatusSection from "../../components/dashboard/StatusSection"
import UsageStatistics from "../../components/dashboard/UsageStatistics"
import AlertsSection from "../../components/dashboard/AlertsSection"
import SecurityAlertsComponent from "../../components/dashboard/SecurityAlertsSection"

export default function DashboardPage(){
    return(
        <div
            className="bg-gray-50 min-h-screen"
            style={{ paddingTop: 'var(--header-height, 64px)' }}
        >
            <main className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Dashboard</h1>
                    <Link 
                        href="/dashboard/api-keys"
                        className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
                    >
                        Manage API Keys
                    </Link>
                </div>
                <StatusSection />
                <UsageStatistics />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <AlertsSection />
                    <SecurityAlertsComponent />
                </div>
            </main>
        </div>
    )
}
