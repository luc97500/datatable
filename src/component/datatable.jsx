import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { DropdownCell } from "./dropdowncell";
import { CommentCell } from "./commentCell";
import "./datable.css";
import { Box, Button, TextField } from "@mui/material";
import Swal from "sweetalert2";

export const Datatable = ({ currentScreen }) => {
  console.log(currentScreen);

  function generateUniqueRows(count) {
    const reasons = ["accepted", "rejected", "modify", ""];
    const comments = {
      accepted: ["ok tested", "good to go", "all set", "ok nice good to go"],
      rejected: ["not good", "needs work", "rejected", "reevaluated"],
      modify: [
        "oks tddested",
        "needs changes",
        "update required",
        "modified control",
      ],
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
  const [editedRows, setEditedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDropdownChange = (id, newValue) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, reason: newValue } : row
      )
    );
    setEditedRows((prev) => ({ ...prev, [id]: true }));
  };

  const handleCommentChange = (id, newComment) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, comment: newComment } : row
      )
    );
    setEditedRows((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = () => {
    const editedData = tableData.filter((row) => editedRows[row.id]);
    console.log("Submitted data:", editedData);
    let text = "";

    let name = editedData.map(record => record.name);

    if (editedData.length == 0) {
      text = "You have not made any changes in Grid data!";
    } else {
      text = "Great! Changes saved For User : " + name;
    }

    Swal.fire({
      title: "Data Saved SuccessFully!",
      text: text,
      icon: "success",
    });
    setEditedRows({});
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f9e79f",
        fontWeight: "bold",
        fontSize: "14px",
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
        backgroundColor: "#f4f4f4",
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
          isEditable={editedRows[row.id] || row.reason === ""}
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
          isEditable={editedRows[row.id]}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
          sx={{ width: 300 }}
        />
      </Box>

      <div className="data-table-wrapper">
        <div className="data-table-container">
          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            pagination
            paginationRowsPerPageOptions={[50, 100, 150, 200]}
            paginationPerPage={50}
            customStyles={customStyles}
          />
        </div>
      </div>

      <Box
        sx={{
          minHeight: "5vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
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
    </>
  );
};
