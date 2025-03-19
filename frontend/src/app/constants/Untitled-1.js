
"use client";
import React, { useState, useRef, useEffect} from 'react';
import { MoreHorizontal, Eye, Pencil, Clock } from 'lucide-react';
import { getSeverityColor, getStatusColor, formatDate, calculateDuration, sortIncidentsByScore } from './constantFunctions';

// Mock Data
import { mockIncidents } from './mockIncidents';

const InsiderThreatDashboard = () => {

  const sortedIncidents = sortIncidentsByScore(mockIncidents)
  const [incidents] = useState(sortedIncidents);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);




  const handleMenuToggle = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };




  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-full">
        <header className="py-3">
          <div className="flex justify-between items-center">
            <div className = "p-4">
              <h1 className="text-3xl font-semibold text-gray-800"><span className = "font-light text-6xl">{incidents.length}</span> Incidents </h1>
            </div>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">New Incident</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">Export</button>
            </div>
          </div>
        </header>

        <div className="p-3 flex flex-col gap-5">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 px-8 bg-gray-800 text-white flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold">{incident.ticket.serialNumber}</h2>
                  <div className={`px-3 py-1 rounded-full text-md text-white ${getSeverityColor(incident.severity)}`}>
                    {incident.severity} ({incident.score})
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-md text-white ${getStatusColor(incident.ticket.status)}`}>
                    {incident.ticket.status}
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => handleMenuToggle(incident.id)} 
                      className="p-2 rounded-full hover:bg-gray-700"
                    >
                      <MoreHorizontal size={22} />
                    </button>
                    
                    {activeMenu === incident.id && (
                      <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button className="flex items-center px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left font-semibold">
                            <Pencil size={16} className="mr-2" />
                            Edit Incident
                          </button>
                          <button className="flex items-center px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left font-semibold">
                            <Eye size={16} className="mr-2" />
                            View Summary
                          </button>
                          <button className="flex items-center px-4 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left font-semibold">
                            <Clock size={16} className="mr-2" />
                            View Timeline
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Host</h3>
                  <div className="text-sm space-y-1 flex flex-col gap-2">
                    <div className = "flex flex-row justify-between items-center">
                      <p> Host Name</p>
                      <div className="font-medium">{incident.host.hostname}</div>
                    </div>
                    <div className = "flex flex-row justify-between items-center">
                      <p> Operating System </p>
                      <div className="font-medium">{incident.host.operatingSystem}</div>
                    </div>
                    <div className = "flex flex-row justify-between items-center">
                      <p> Local IP Address </p>
                      <div className="font-medium">{incident.host.localIp}</div>
                    </div>
                    <div className = "flex flex-row justify-between items-center">
                      <p> External IP Address </p>
                      <div className="font-medium">{incident.host.externalIp}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className = "flex flex-row justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Detections</h3>
                    <h3 className="text-2xl font-light text-gray-600 mb-2"> {incident.detections.length}</h3>
                  </div>
            
                  <div className="space-y-2">
                    {incident.detections
                      .sort((a: { count: number }, b: { count: number }) => b.count - a.count)
                      .slice(0, 2)
                      .map((detection: { technique: string; tactic: string; count: number }, index: number) => (
                        <div key={index} className="bg-white p-2 rounded border border-gray-200 text-sm">
                          <span className="font-medium">{detection.technique}</span> via {detection.tactic}
                          <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-gray-200 text-gray-800 text-xs">
                            {detection.count}
                          </span>
                        </div>
                      ))}
                  </div>
                  {incident.detections.length > 2 && (
                    <div className="mt-2 text-right text-sm text-blue-600 cursor-pointer hover:underline p-2">
                      View {incident.detections.length - 2} more...
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Timeline</h3>
                  <div className="text-sm space-y-1 flex flex-col gap-2">
                    <div className = "flex flex-row justify-between items-center">
                      <p> Start</p>
                      <div className="font-medium">{formatDate(incident.timeline.startDateTime)}</div>
                    </div>
                    <div className = "flex flex-row justify-between items-center">
                      <p> End </p>
                      <div className="font-medium">{formatDate(incident.timeline.endDateTime)}</div>
                    </div>
                    <div className = "flex flex-row justify-between items-center">
                      <p> Duration </p>
                      <div className="font-medium">{calculateDuration(incident.timeline.startDateTime, incident.timeline.endDateTime)}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Ticket</h3>
                  <div className="text-sm space-y-1 flex flex-col gap-2">
                    <div className = "flex flex-row justify-between items-center">
                      <p> Incident No</p>
                      <div className="font-medium">{incident.id}</div>
                    </div>
                    <div className = "flex flex-row justify-between items-center">
                      <p> Status </p>
                      <span className={`ml-2 inline-block px-2 py-1 rounded text-xs text-white ${getStatusColor(incident.ticket.status)}`}>
                        {incident.ticket.status}
                      </span>
                    </div>
                    <div className = "flex flex-row justify-between items-center">
                      <p> Assigned To </p>
                      <div className="font-medium">{incident.ticket.assignedTo}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center p-5">
          <div className="text-gray-600">Showing {incidents.length} incidents</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700">Previous</button>
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsiderThreatDashboard;