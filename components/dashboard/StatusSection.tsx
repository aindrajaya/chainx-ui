import { Activity, Hash, Key, CheckCircle } from 'lucide-react'

export default function StatusSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          title: 'System Status',
          icon: Activity,
          status: 'Operational',
          statusColor: 'green',
          details: [
            { label: 'Uptime', value: '99.99%' },
            { label: 'Response Time', value: '89ms' },
          ],
        },
        {
          title: "Today's Requests",
          icon: Hash,
          mainValue: '24,521',
          change: '+12%',
          details: [
            { label: 'Successful', value: '23,982' },
            { label: 'Failed', value: '539' },
          ],
        },
        {
          title: 'API Keys',
          icon: Key,
          mainValue: '7',
          subValue: 'of 10 allowed',
          details: [
            { label: 'Active', value: '5' },
            { label: 'Inactive', value: '2' },
          ],
        },
      ].map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <card.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">{card.title}</h3>
            </div>
            {card.status && (
              <div className={`flex items-center space-x-1.5 text-${card.statusColor}-600`}>
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{card.status}</span>
              </div>
            )}
          </div>

          {card.mainValue && (
            <div className="mb-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{card.mainValue}</span>
                {card.change && (
                  <span className="ml-2 text-sm text-green-600">{card.change}</span>
                )}
                {card.subValue && (
                  <span className="ml-2 text-sm text-gray-500">{card.subValue}</span>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {card.details.map((detail, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">{detail.label}</p>
                <p className="mt-1 font-semibold text-gray-900">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
