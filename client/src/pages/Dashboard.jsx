import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const API = "https://tiny-link-lne5.onrender.com/api/links";

  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");

  const fetchLinks = async () => {
    const res = await axios.get(API);
    setLinks(res.data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const createLink = async (e) => {
    e.preventDefault();
    await axios.post(API, { url, code });
    fetchLinks();
    setUrl("");
    setCode("");
  };

  const deleteLink = async (code) => {
    await axios.delete(`${API}/${code}`);
    alert("TinkyLink Deleted")
    fetchLinks();
  };


  return (
    <div className="bg-[#232327] min-h-screen">
      <div className="p-6 max-w-3xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-6">TinyLink Dashboard</h1>

        <form className="space-y-4 bg-gray-900 p-4 rounded" onSubmit={createLink}>
          <input className="w-full p-3 rounded bg-gray-800" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
          <input className="w-full p-3 rounded bg-gray-800" placeholder="Custom Code (6–8 chars)" value={code} onChange={(e) => setCode(e.target.value)} />
          <button className="w-full bg-blue-600 p-3 rounded">Create Link</button>
        </form>

        <div className="mt-6 space-y-3">
          {links.map(l => (
            <div key={l.code} className="p-4 bg-gray-800 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">Code : {l.code}</p>
                <p className="text-sm text-gray-300 truncate w-64">Original URL : {l.url}</p>
                <p className="text-xs">TotalClicks: {l.clicks}</p>
              </div>
              <div className="flex gap-3">
                <Link to={`/code/${l.code}`} className="text-blue-400 underline">Stats</Link>
                <button onClick={() => deleteLink(l.code)} className="text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
