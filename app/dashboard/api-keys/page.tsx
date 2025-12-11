"use client"

import Link from "next/link"
import ApiList from "../../../components/dashboard/APIList"

export default function ApiKeysPage() {
  return (
    <div
      className="bg-gray-50 min-h-screen"
      style={{ paddingTop: "var(--header-height, 64px)" }}
    >
      <main className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <p className="text-sm text-gray-500">Dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Manage API Keys</h1>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
          >
            Back to Dashboard
          </Link>
        </div>
        <ApiList />
      </main>
    </div>
  );
}
