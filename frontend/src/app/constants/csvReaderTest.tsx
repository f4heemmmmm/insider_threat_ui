"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";

const CSVParser = () => {
    const [jsonData, setJsonData] = useState<any[]>([]);

    useEffect(() => {
        // Fetch the CSV file from public folder
        fetch("/test2.csv")
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    dynamicTyping: true,
                    complete: (result) => {
                        // Parse nested JSON columns
                        const parsedData = result.data.map((row: any) => {
                            for (const key in row) {
                                if (typeof row[key] === "string" && row[key].startsWith("{")) {
                                    try {
                                        row[key] = JSON.parse(row[key]); // Convert string to JSON object
                                    } catch (error) {
                                        console.warn(`Could not parse JSON in column: ${key}`);
                                    }
                                }
                            }
                            return row;
                        });

                        setJsonData(parsedData);
                        console.log("Parsed CSV Data:", parsedData);
                    },
                });
            })
            .catch((error) => console.error("Error fetching CSV file:", error));
    }, []);

    return (
        <div className="p-4 border rounded-md">
            <h2 className="text-xl font-bold">Parsed CSV Data</h2>
    
            {/* Display JSON data nicely */}
            <pre className="mt-4 p-2 border rounded-md bg-gray-100 overflow-auto max-h-[500px]">
                {JSON.stringify(jsonData, null, 2)}
            </pre>
    
            {/* Display list_raw_events length for each row */}
            {jsonData.map((row, index) => (
                <div key={index} className="mt-2 p-2 border rounded-md bg-blue-50">
                    <p className="text-md font-semibold">Row {index + 1}</p>
                    <p>List Raw Events Count: {row?.evidence?.list_raw_events?.length || 0}</p>
                </div>
            ))}
        </div>
    );
}
export default CSVParser;