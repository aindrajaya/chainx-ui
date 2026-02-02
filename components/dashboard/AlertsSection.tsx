import { AlertTriangle, CheckCircle, Bell, XCircle, Info } from 'lucide-react'

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Usage Limit Warning',
    message: "API key 'prod_key_1' is approaching its daily limit",
    time: '2h ago',
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: 'success',
    title: 'System Update',
    message: 'Successfully deployed new security patches',
    time: '5h ago',
    icon: CheckCircle,
  },
  {
    id: 3,
    type: 'error',
    title: 'Failed Requests Detected',
    message: 'Multiple 500 errors detected in production environment',
    time: '6h ago',
    icon: XCircle,
  },
  {
    id: 4,
    type: 'info',
    title: 'New Feature Available',
    message: 'Rate limiting now supports custom rules',
    time: '1d ago',
    icon: Info,
  },
]

export default function AlertsSection() {
  return (
    <section className="bg-white rounded-xl shadow-sm">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
          </div>
          <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            4 New
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {alerts.map((alert) => {
          const typeStyles = {
            warning: 'bg-yellow-50 text-yellow-800',
            success: 'bg-green-50 text-green-800',
            error: 'bg-red-50 text-red-800',
            info: 'bg-blue-50 text-blue-800',
          }[alert.type]

          return (
            <div
              key={alert.id}
              className={`flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 ${typeStyles} transition-colors duration-200 hover:bg-opacity-75`}
            >
              <alert.icon className="h-5 w-5 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="font-medium">{alert.title}</h4>
                  <span className="text-xs opacity-75">{alert.time}</span>
                </div>
                <p className="mt-1 text-sm opacity-90">{alert.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
