import React, { useState, useEffect } from 'react';

export const DropdownCell = ({ row, onChange, isEditable }) => {
  const [selectedValue, setSelectedValue] = useState(row.reason);

  useEffect(() => {
    setSelectedValue(row.reason); // Sync selected value with row's reason
  }, [row.reason]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(row.id, newValue); // Notify parent component of the change
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <select
        value={selectedValue}
        onChange={handleChange}
        disabled={!isEditable} // Disable based on isEditable prop
      >
        <option value="">Select a reason</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        <option value="modify">Modify</option>
        {/* Add other options as needed */}
      </select>
    </div>
  );
};
