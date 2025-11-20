import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Stats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/links/${code}`)
      .then(res => setLink(res.data));
  }, []);

  if (!link) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen bg-[#232327]">
     <div className="p-6 max-w-xxl mx-auto text-white ">
        <h1 className="text-3xl font-bold mb-4">Stats for {code}</h1>
        <div className="bg-gray-900 p-4 rounded space-y-2">
          <p>URL: {link.url}</p>
          <p>redirectURL: {`http://localhost:5000/api/links/r/${code}`}</p>
          <p>TotalClicks: {link.clicks}</p>
          <p>Last Click: {link.lastClicked || "Never clicked"}</p>
          <p>Created At: {new Date(link.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
