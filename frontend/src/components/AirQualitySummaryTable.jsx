import React, { useEffect, useState } from "react";
import axios from "axios";

function AirQualitySummaryTable() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    axios
      .get("https://air-quality-checker-ftzu.onrender.com/api/summary")
      .then((res) => {
        const data = res.data;
        // Convert object to array if needed
        if (data && typeof data === "object" && !Array.isArray(data)) {
          const arr = Object.entries(data).map(([location, stats]) => ({
            location,
            ...stats,
          }));
          setSummary(arr);
        } else {
          setSummary(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📊 Air Quality Summary</h2>
      <table className="w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Location</th>
            <th className="border p-2">Min</th>
            <th className="border p-2">Max</th>
            <th className="border p-2">Average</th>
            <th className="border p-2">Samples</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(summary) && summary.length > 0 ? (
            summary.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{item.location}</td>
                <td className="border p-2">{item.min}</td>
                <td className="border p-2">{item.max}</td>
                <td className="border p-2">{item.average}</td>
                <td className="border p-2">{item.samples}</td>
                <td
                  className={`border p-2 font-semibold ${
                    item.status === "Good"
                      ? "text-green-600"
                      : item.status === "Moderate"
                      ? "text-yellow-600"
                      : item.status === "Unhealthy"
                      ? "text-orange-600"
                      : item.status === "Very Unhealthy"
                      ? "text-red-600"
                      : "text-purple-800"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AirQualitySummaryTable;
