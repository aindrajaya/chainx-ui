"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { Calendar, ArrowUp, ArrowDown } from 'lucide-react'


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function UsageStatistics() {
  const [period, setPeriod] = useState("week")
  const { theme } = useTheme()

  const options = {
    chart: {
      id: "api-usage",
      toolbar: {
        show: false,
      },
      foreColor: theme === "dark" ? "#e5e7eb" : "#374151",
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    colors: ["#168563"],
    theme: {
      mode: theme === "dark" ? "dark" : ("light" as "light" | "dark" | undefined),
    },
  }

  const series = [
    {
      name: "API Calls",
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ]

  return (
    <section className="bg-white rounded-xl shadow-sm">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">API Usage</h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {['Day', 'Week', 'Month'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p.toLowerCase())}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  period === p.toLowerCase()
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {[
            { label: 'Total Requests', value: '1.2M', change: '+12.3%', up: true },
            { label: 'Avg. Latency', value: '235ms', change: '-18.5%', up: false },
            { label: 'Error Rate', value: '0.12%', change: '-5.2%', up: false },
          ].map((stat, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className={`ml-2 flex items-center text-sm ${
                  stat.up ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[280px]">
          <Chart options={options} series={series} type="line" height={400} />
        </div>
      </div>
    </section>
  )
}
