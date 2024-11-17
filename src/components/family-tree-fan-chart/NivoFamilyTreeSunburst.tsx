import React, { useState } from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";

// Simplified and extended family tree data
const initialData = {
  name: 'John Doe',
  color: 'hsl(0, 100%, 50%)',
  children: [
    {
      name: 'Alice Doe',
      color: 'hsl(1, 100%, 50%)',
      children: [
        { name: 'Charlie Doe', color: 'hsl(2, 100%, 50%)', value: 5 },
        { name: 'Diana Doe', color: 'hsl(3, 100%, 50%)', value: 5 },
        {
          name: 'Evan Doe',
          color: 'hsl(4, 100%, 50%)',
          children: [
            { name: 'Felix Doe', color: 'hsl(5, 100%, 50%)', value: 5 },
            { name: 'Grace Doe', color: 'hsl(6, 100%, 50%)', value: 5 }
          ]
        }
      ]
    },
    {
      name: 'Bob Doe',
      color: 'hsl(7, 100%, 50%)',
      children: [
        { name: 'Harry Doe', color: 'hsl(8, 100%, 50%)', value: 5 },
        { name: 'Ivy Doe', color: 'hsl(9, 100%, 50%)', value: 5 },
        {
          name: 'Jack Doe',
          color: 'hsl(10, 100%, 50%)',
          children: [
            { name: 'Kathy Doe', color: 'hsl(11, 100%, 50%)', value: 5 },
            { name: 'Liam Doe', color: 'hsl(12, 100%, 50%)', value: 5 }
          ]
        }
      ]
    }
  ]
};

export const NivoFamilyTreeSunburst = () => {
  const [data, setData] = useState(initialData);
  const [history, setHistory] = useState([initialData]); // Store history of previous generations

  const handleClick = (node: any) => {
    if (node.data.children) {
      setHistory([...history, node.data]); // Save the current state before drilling down
      setData(node.data); // Drill down to clicked generation
    }
  };

  const handleBackClick = () => {
    if (history.length > 1) {
      // Pop the most recent state and go back to the previous generation
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      setData(newHistory[newHistory.length - 1]); // Set the data to the previous state
    }
  };

  return (
    <div style={{ height: '500px', position: 'relative' }}>
      {/* Render the back button inside the sunburst chart's center */}
      {history.length > 1 && (
        <button
          onClick={handleBackClick}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            padding: '10px',
            backgroundColor: 'gray',
            color: 'white',
            borderRadius: '5px',
          }}
        >
          Back
        </button>
      )}

      <ResponsiveSunburst
        data={data}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        id="name"
        value="value"
        colorBy="id"
        onClick={handleClick} // Enable drill down on click
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      />
    </div>
  );
};
