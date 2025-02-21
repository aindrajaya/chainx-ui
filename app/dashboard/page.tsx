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
            className="bg-gray-50"
            style={{ marginTop: 'var(--header-height, 64px)' }}
        >
            {/* <Header /> */}
            {/* <main className="flex-grow p-6"> */}
                {showAPIlist ? (
                    <div>
                        <button
                            onClick={() => setShowAPIList(false)}
                            className="mb-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition-colors"
                        >
                            Back to Dashboard
                        </button>
                        <ApiList />
                    </div>
                ):(
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            <button 
                                onClick={() => setShowAPIList(true)}
                                className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition-colors"
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
            {/* </main> */}
            {/* <Footer /> */}
        </div>
    )
}