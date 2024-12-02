import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchSessions();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/sessions');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const handleRequest = async (requestId, status) => {
    try {
      await fetch(`/api/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      fetchRequests();
    } catch (error) {
      console.error('Failed to update request:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-8 border-4 border-black shadow-brutal bg-white">
        <h2 className="text-3xl font-bold mb-6">Learning Requests</h2>
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="p-6 border-4 border-black shadow-brutal bg-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{request.studentName}</h3>
                  <p className="text-lg">{request.topic}</p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => handleRequest(request.id, 'accepted')}
                    className="px-4 py-2 bg-green-500 border-4 border-black text-white font-bold
                             hover:translate-x-1 hover:-translate-y-1 transition-transform"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequest(request.id, 'rejected')}
                    className="px-4 py-2 bg-red-500 border-4 border-black text-white font-bold
                             hover:translate-x-1 hover:-translate-y-1 transition-transform"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 border-4 border-black shadow-brutal bg-white">
        <h2 className="text-3xl font-bold mb-6">Upcoming Sessions</h2>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-6 border-4 border-black shadow-brutal bg-gray-100"
            >
              <h3 className="text-xl font-bold mb-2">
                {session.studentName} - {session.topic}
              </h3>
              <p className="text-lg mb-2">
                Time: {new Date(session.scheduledTime).toLocaleString()}
              </p>
              <button
                onClick={() => window.location.href = `/video-call/${session.id}`}
                className="px-4 py-2 bg-blue-500 border-4 border-black text-white font-bold
                         hover:translate-x-1 hover:-translate-y-1 transition-transform"
              >
                Join Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;