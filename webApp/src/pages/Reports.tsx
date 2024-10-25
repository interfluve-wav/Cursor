import React from 'react';
import { Download, Filter, FileText } from 'lucide-react';

const reports = [
  {
    id: 'R-2024-001',
    name: 'Monthly Quality Analysis Summary',
    type: 'Summary Report',
    date: '2024-03-01',
    status: 'Final',
    size: '2.4 MB',
  },
  {
    id: 'R-2024-002',
    name: 'Environmental Impact Assessment',
    type: 'Technical Report',
    date: '2024-03-15',
    status: 'Draft',
    size: '4.1 MB',
  },
  {
    id: 'R-2024-003',
    name: 'Client Test Results - Q1',
    type: 'Client Report',
    date: '2024-03-20',
    status: 'Under Review',
    size: '1.8 MB',
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900">Total Reports</h3>
          <p className="text-3xl font-bold text-blue-700 mt-2">247</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-green-900">Completed This Month</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">32</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-900">Pending Review</h3>
          <p className="text-3xl font-bold text-yellow-700 mt-2">8</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-4 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-2 rounded-lg border border-gray-200">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{report.type}</span>
                      <span className="text-xs text-gray-500">{report.date}</span>
                      <span className="text-xs text-gray-500">{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      report.status === 'Final'
                        ? 'bg-green-100 text-green-700'
                        : report.status === 'Draft'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {report.status}
                  </span>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}