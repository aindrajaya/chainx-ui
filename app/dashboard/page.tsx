"use client"

import { useState } from "react"
import Header from "../../components/Header"
import StatusSection from "../../components/dashboard/StatusSection"
import UsageStatistics from "../../components/dashboard/UsageStatistics"
import AlertsSection from "../../components/dashboard/AlertsSection"
import ApiList from "../../components/dashboard/APIList"
import Footer from "../../components/Footer"
import SecurityAlertsComponent from "../../components/dashboard/SecurityAlertsSection"

export default function DashboardPage(){
    const [showAPIlist, setShowAPIList] = useState(false);

    return(
        <div
            className="bg-gray-50 min-h-screen"
            style={{ paddingTop: 'var(--header-height, 64px)' }}
        >
            <main className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                {showAPIlist ? (
                    <div>
                        <button
                            onClick={() => setShowAPIList(false)}
                            className="mb-4 w-full sm:w-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base"
                        >
                            Back to Dashboard
                        </button>
                        <ApiList />
                    </div>
                ):(
                    <>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Dashboard</h1>
                            <button 
                                onClick={() => setShowAPIList(true)}
                                className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
                            >
                                Manage API Keys
                            </button>
                        </div>
                        <StatusSection />
                        <UsageStatistics />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <AlertsSection />
                            <SecurityAlertsComponent />
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}
