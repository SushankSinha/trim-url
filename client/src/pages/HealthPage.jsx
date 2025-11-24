import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apiInstance";

const HealthCheckTable = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const res = await axiosInstance.get("/healthz"); 
        setHealthData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  if (loading) return <div className="container" style={{ padding: 24 }}>Loading...</div>;
  if (error) return <div className="container" style={{ padding: 24, color: 'var(--danger)' }}>Error: {error}</div>;

  return (
    <div className="container max-w-3xl">
      <div className="card" style={{padding:24}}>
        <h2 style={{fontSize:22, margin:0, marginBottom:12}}>System Health</h2>
        <table className="table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OK</td>
              <td>{healthData.ok.toString()}</td>
            </tr>
            <tr>
              <td>Version</td>
              <td>{healthData.version}</td>
            </tr>
            <tr>
              <td>Uptime (minutes)</td>
              <td>{(healthData.uptime / 60).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthCheckTable;
