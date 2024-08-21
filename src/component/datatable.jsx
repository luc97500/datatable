import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { DropdownCell } from "./dropdowncell";
import { CommentCell } from "./commentCell";
import "./datable.css"; // Import your CSS file
import { Box, Button } from "@mui/material";
import { Padding } from "@mui/icons-material";

export const Datatable = ({ currentScreen }) => {
  console.log(currentScreen);

  function generateUniqueRows(count) {
    const reasons = ["accepted", "rejected", "modify", ""];
    const comments = {
      accepted: ["ok tested", "good to go", "all set"],
      rejected: ["not good", "needs work", "rejected"],
      modify: ["oks tddested", "needs changes", "update required"],
      "": [""],
    };

    function uniqueString() {
      return "xxxxxx"
        .replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16))
        .toUpperCase();
    }

    function randomDate() {
      const start = new Date(2020, 9, 1); // October 1, 2020
      const end = new Date(2020, 11, 31); // December 31, 2020
      const randomTime =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());
      return new Date(randomTime).toLocaleString("en-GB", { timeZone: "UTC" });
    }

    const rows = [];
    const usedNames = new Set(); // To ensure unique names

    for (let i = 0; i < count; i++) {
      let name;
      do {
        name = uniqueString();
      } while (usedNames.has(name));
      usedNames.add(name);

      const reason = reasons[Math.floor(Math.random() * reasons.length)];
      const comment =
        comments[reason][Math.floor(Math.random() * comments[reason].length)];
      const row = {
        id: i + 1,
        name: name,
        reason: reason,
        comment: comment,
        requestnumber: name + i,
        datetime: randomDate(),
      };
      rows.push(row);
    }

    return rows;
  }

  const [tableData, setTableData] = useState(generateUniqueRows(200));

  //   const [tableData, setTableData] = useState([
  //     {
  //       id: 1,
  //       name: "x53235",
  //       reason: "accepted",
  //       comment: "ok tested",
  //       datetime: "12/12/2020 12:00 PM",
  //     },
  //     {
  //       id: 2,
  //       name: "x553235",
  //       reason: "",
  //       comment: "",
  //       datetime: "17/12/2020 12:00 PM",
  //     },
  //     {
  //       id: 3,
  //       name: "xs53235",
  //       reason: "rejected",
  //       comment: "oks tested",
  //       datetime: "17/12/2020 12:00 PM",
  //     },
  //     {
  //       id: 4,
  //       name: "xs53xx235",
  //       reason: "accepted",
  //       comment: "oks tested",
  //       datetime: "17/10/2020 12:00 PM",
  //     },
  //     {
  //       id: 5,
  //       name: "xs53454235",
  //       reason: "modify",
  //       comment: "oks tddested",
  //       datetime: "17/10/2020 12:00 PM",
  //     },
  //     {
  //       id: 6,
  //       name: "ss",
  //       reason: "",
  //       comment: "",
  //       datetime: "15/10/2020 12:00 PM",
  //     },
  //     {
  //       id: 7,
  //       name: "xs53235",
  //       reason: "rejected",
  //       comment: "oks tested",
  //       datetime: "17/12/2020 12:00 PM",
  //     },
  //     {
  //       id: 8,
  //       name: "dddd",
  //       reason: "accepted",
  //       comment: "oks tested",
  //       datetime: "17/10/2020 12:00 PM",
  //     },
  //     {
  //       id: 9,
  //       name: "sss",
  //       reason: "modify",
  //       comment: "oks tddested",
  //       datetime: "17/10/2020 12:00 PM",
  //     },
  //     {
  //       id: 10,
  //       name: "ss",
  //       reason: "",
  //       comment: "",
  //       datetime: "15/10/2020 12:00 PM",
  //     },
  //   ]);

  const [editableRows, setEditableRows] = useState({});

  const handleDropdownChange = (id, newValue) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, reason: newValue } : row
      )
    );
    setEditableRows((prev) => ({ ...prev, [id]: true }));
  };

  const handleCommentChange = (id, newComment) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, comment: newComment } : row
      )
    );
    setEditableRows((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = () => {
    console.log("Submitted data:", tableData);
    setEditableRows({});
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f4f4f4",
        fontWeight: "bold",
        fontSize: "16px",
        justifyContent: "center",
      },
    },
    rows: {
      style: {
        minHeight: "5px",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        justifyContent: "center",
      },
    },
    pagination: {
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Reason",
      cell: (row) => (
        <DropdownCell
          row={row}
          onChange={handleDropdownChange}
          isEditable={editableRows[row.id] || row.reason === ""}
        />
      ),
      sortable: true,
      sortFunction: (a, b) => {
        return a.reason.localeCompare(b.reason);
      },
    },
    {
      name: "Comment",
      cell: (row) => (
        <CommentCell
          row={row}
          onChange={handleCommentChange}
          isEditable={editableRows[row.id]}
        />
      ),
      sortable: true,
      sortFunction: (a, b) => {
        return a.comment.localeCompare(b.comment);
      },
    },
    {
      name: "RequestNumber",
      selector: (row) => row.requestnumber,
      sortable: true,
      sortFunction: (a, b) => {
        return a.requestnumber.localeCompare(b.requestnumber);
      },
    },
    {
      name: "DateTime",
      selector: (row) => row.datetime,
      sortable: true,
      sortFunction: (a, b) => {
        return new Date(a.datetime) - new Date(b.datetime);
      },
    },
  ];

  return (
    <>
      <div className="data-table-wrapper">
        <div className="data-table-container">
          <DataTable
            columns={columns}
            data={tableData}
            fixedHeader
            pagination
            paginationRowsPerPageOptions={[50, 100, 150, 200]}
            paginationPerPage={50}
            customStyles={customStyles}
          />
        </div>
      </div>

      {/* <div> */}
      <Box
        sx={{
          minHeight: "5vh", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end", // Aligns content to the bottom
          alignItems: "center", // Centers content horizontally
          p: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            minWidth: 120,
            height: 40,
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      {/* </div> */}
    </>
  );
};
