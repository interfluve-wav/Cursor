import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Beaker, ClipboardCheck, AlertCircle, Clock } from 'lucide-react';

const data = [
  { name: 'Mon', tests: 12 },
  { name: 'Tue', tests: 19 },
  { name: 'Wed', tests: 15 },
  { name: 'Thu', tests: 22 },
  { name: 'Fri', tests: 18 },
  { name: 'Sat', tests: 8 },
  { name: 'Sun', tests: 5 },
];

const stats = [
  { name: 'Active Tests', value: '24', icon: Beaker, color: 'bg-blue-500' },
  { name: 'Completed', value: '156', icon: ClipboardCheck, color: 'bg-green-500' },
  { name: 'Pending Review', value: '8', icon: Clock, color: 'bg-yellow-500' },
  { name: 'Issues', value: '3', icon: AlertCircle, color: 'bg-red-500' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          New Test
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Test Volume</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tests" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tests</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Test #{2024001 + i}</p>
                  <p className="text-sm text-gray-500">Water Quality Analysis</p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                  In Progress
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Soil Analysis Report</p>
                  <p className="text-sm text-gray-500">Due in {i} day{i !== 1 ? 's' : ''}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}