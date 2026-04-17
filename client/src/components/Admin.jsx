import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [leads, setLeads] = useState([]);
  const [platform, setPlatform] = useState("");

  const fetchLeads = async () => {
    try {
      const url = platform
        ? `https://seller-rocket-sgzb.onrender.com/api/leads?platform=${platform}`
        : `https://seller-rocket-sgzb.onrender.com/api/leads`;

      const res = await axios.get(url);
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [platform]);

  return (
    <div className="admin-section">
      <h2>Admin - Leads</h2>

      <select onChange={(e) => setPlatform(e.target.value)}>
        <option value="">All</option>
        <option value="Amazon">Amazon</option>
        <option value="Flipkart">Flipkart</option>
        <option value="Shopify">Shopify</option>
        <option value="WordPress">WordPress</option>
      </select>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Platform</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.email}</td>
                <td>{lead.platform}</td>
                <td className="status">{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;