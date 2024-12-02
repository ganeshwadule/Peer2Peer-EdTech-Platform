import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MasterProfile = () => {
  const { id } = useParams();
  const [master, setMaster] = useState(null);
  const [requestStatus, setRequestStatus] = useState('');

  useEffect(() => {
    fetchMasterProfile();
  }, [id]);

  const fetchMasterProfile = async () => {
    try {
      const response = await fetch(`/api/masters/${id}`);
      const data = await response.json();
      setMaster(data);
    } catch (error) {
      console.error('Failed to fetch master profile:', error);
    }
  };

  const sendRequest = async () => {
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          masterId: id,
          message: 'I would like to learn from you',
        }),
      });
      
      if (response.ok) {
        setRequestStatus('Request sent successfully!');
      }
    } catch (error) {
      console.error('Failed to send request:', error);
      setRequestStatus('Failed to send request');
    }
  };

  if (!master) return <div>Loading...</div>;

  return (
    <div className="p-8 border-4 border-black shadow-brutal bg-white">
      <div className="flex items-start space-x-8">
        <img
          src={master.avatar}
          alt={master.name}
          className="w-48 h-48 border-4 border-black"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{master.name}</h1>
          <p className="text-2xl mb-4">{master.expertise}</p>
          <div className="mb-4">
            <span className="text-xl">Rating: </span>
            <span className="text-xl font-bold">{master.rating}/5</span>
          </div>
          <button
            onClick={sendRequest}
            className="px-6 py-3 bg-green-500 border-4 border-black text-white text-xl font-bold
                     hover:translate-x-1 hover:-translate-y-1 transition-transform"
          >
            Request Learning Session
          </button>
          {requestStatus && (
            <p className="mt-4 text-xl font-bold">{requestStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
};