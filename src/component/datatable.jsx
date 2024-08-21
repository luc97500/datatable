import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { DropdownCell } from './dropdowncell';
import { CommentCell } from './commentCell';

export const Datatable = ({currentScreen}) => {
    console.log(currentScreen)

    function generateRandomData(numEntries) {
        const reasons = ['accepted', 'rejected', 'modify', ''];
        const comments = ['ok tested', 'oks tested', 'oks tddested', ''];
        const names = ['x53235', 'x553235', 'xs53235', 'xs53xx235', 'xs53454235', 'ss', 'dddd', 'sss'];
      
        const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
      
        const getRandomDate = () => {
          const start = new Date(2020, 0, 1);
          const end = new Date(2024, 0, 1);
          const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        };
      
        const data = [];
        for (let i = 0; i < numEntries; i++) {
          data.push({
            id: i + 1,
            name: getRandomItem(names),
            reason: getRandomItem(reasons),
            comment: getRandomItem(comments),
            datetime: getRandomDate(),
          });
        }
      
        return data;
      }
  // Initialize state with table data
  const [tableData, setTableData] = useState(generateRandomData(1000));

//   [
//     { id: 1, name: 'x53235', reason: 'accepted', comment: 'ok tested', datetime: '12/12/2020 12:00 PM' },
//     { id: 2, name: 'x553235', reason: '', comment: '', datetime: '17/12/2020 12:00 PM' },
//     { id: 3, name: 'xs53235', reason: 'rejected', comment: 'oks tested', datetime: '17/12/2020 12:00 PM' },
//     { id: 4, name: 'xs53xx235', reason: 'accepted', comment: 'oks tested', datetime: '17/10/2020 12:00 PM' },
//     { id: 5, name: 'xs53454235', reason: 'modify', comment: 'oks tddested', datetime: '17/10/2020 12:00 PM' },
//     { id: 6, name: 'ss', reason: '', comment: '', datetime: '15/10/2020 12:00 PM' },
//     { id: 7, name: 'xs53235', reason: 'rejected', comment: 'oks tested', datetime: '17/12/2020 12:00 PM' },
//     { id: 8, name: 'dddd', reason: 'accepted', comment: 'oks tested', datetime: '17/10/2020 12:00 PM' },
//     { id: 9, name: 'sss', reason: 'modify', comment: 'oks tddested', datetime: '17/10/2020 12:00 PM' },
//     { id: 10, name: 'ss', reason: '', comment: '', datetime: '15/10/2020 12:00 PM' },
//     // Add more data as needed
//   ]

  // State to manage the editing status of each row
  const [editableRows, setEditableRows] = useState({});

  // Handle dropdown change
  const handleDropdownChange = (id, newValue) => {
    setTableData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, reason: newValue } : row
      )
    );
    setEditableRows(prev => ({ ...prev, [id]: true })); 
  };

  // Handle comment change
  const handleCommentChange = (id, newComment) => {
    setTableData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, comment: newComment } : row
      )
    );
    setEditableRows(prev => ({ ...prev, [id]: true })); 
  };

  // Submit action
  const handleSubmit = () => {
    // Process the data
    console.log('Submitted data:', tableData);
    setEditableRows({});
  };

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Reason',
      cell: row => (
        <DropdownCell
          row={row}
          onChange={handleDropdownChange}
          isEditable={editableRows[row.id] || row.reason === ''} 
        />
      ),
      sortable: true,
      sortFunction: (a, b) => {
        return a.reason.localeCompare(b.reason);
      },
    },
    {
      name: 'Comment',
      cell: row => (
        <CommentCell
          row={row}
          onChange={handleCommentChange}
          isEditable={editableRows[row.id]} // Enable comment field only for rows marked as edited
        />
      ),
      sortable: true,
      sortFunction: (a, b) => {
        // Custom sort function for the 'Comment' column
        return a.comment.localeCompare(b.comment);
      },
    },
    {
      name: 'DateTime',
      selector: row => row.datetime,
      sortable: true,
      sortFunction: (a, b) => {
        return new Date(a.datetime) - new Date(b.datetime);
      },
    },
  ];
  

  return (
    <div>
      <DataTable
        columns={columns}
        data={tableData}
        fixedHeader
        pagination
        paginationRowsPerPageOptions={[50, 100, 150, 200]}
        paginationPerPage={5}
        // paginationServer // Add this if you are using server-side pagination
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
