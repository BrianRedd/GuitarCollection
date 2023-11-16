/** @module ToDoList */

import React, { useEffect, useState } from "react";

import {
  faCircleXmark,
  faFloppyDisk,
  faPenToSquare,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useFormikContext } from "formik";
import moment from "moment";
import PropTypes from "prop-types";

import { DATE_FORMAT, TODO_OPTION_DEFAULTS } from "../data/constants";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const createNewRow = () => {
    const id = randomId();
    setRows(oldRows => [
      ...oldRows,
      {
        id,
        todoItem: "",
        status: "",
        completionDate: "",
        notes: "",
        isNew: true
      }
    ]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "todoItem" }
    }));
  };

  return (
    <GridToolbarContainer className="d-flex justify-content-between p-2">
      <h5>To Do List</h5>
      <Button
        color="primary"
        startIcon={<FontAwesomeIcon icon={faPlus} />}
        onClick={createNewRow}
      >
        Add To Do Item
      </Button>
    </GridToolbarContainer>
  );
}

/**
 * @function ToDoList
 * @returns {React.ReactNode}
 */
const ToDoList = props => {
  const { writeTodos } = props;
  const formProps = useFormikContext();

  const [rows, setRows] = useState(formProps?.values?.todoList ?? []);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    console.log("useEffect rows", rows);
  }, [rows]);

  const handleRowEditStop = (params, event) => {
    console.log("handleRowEditStop");
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = id => () => {
    console.log("handleEditClick");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = id => () => {
    console.log("handleSaveClick");
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View }
    });
    writeTodos(rows);
  };

  const handleDeleteClick = id => () => {
    console.log("handleDeleteClick");
    const newRows = rows.filter(row => row.id !== id);
    setRows(newRows);
    writeTodos(newRows);
  };

  const handleCancelClick = id => () => {
    console.log("handleCancelClick");
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find(row => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const processRowUpdate = newRow => {
    console.log("processRowUpdate");
    const updatedRow = { ...newRow, isNew: false };
    const newRows = rows.map(row => (row.id === newRow.id ? updatedRow : row));
    setRows(newRows);
    writeTodos(newRows);
    return updatedRow;
  };

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "todoItem",
      headerName: "To Do Task",
      editable: true,
      flex: 3,
      headerClassName: "fst-italic"
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: TODO_OPTION_DEFAULTS,
      headerClassName: "fst-italic"
    },
    {
      field: "completionDate",
      headerName: "Completed On",
      editable: true,
      flex: 1,
      headerClassName: "fst-italic",
      type: "date",
      valueSetter: params => {
        const date = moment(params.value).format(DATE_FORMAT);
        if (date === "Invalid date") {
          return {...params.row, date: ""}
        }
        return { ...params.row, date };
      },
      valueGetter: params => {
        if (!params.value) {
          return params.value;
        }
        return new Date(params.value);
      }
    },
    {
      field: "notes",
      headerName: "Notes",
      editable: true,
      flex: 2,
      headerClassName: "fst-italic"
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<FontAwesomeIcon icon={faFloppyDisk} />}
              label="Save"
              sx={{
                color: "primary.main"
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<FontAwesomeIcon icon={faCircleXmark} />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faPenToSquare} />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faTrash} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="warning"
          />
        ];
      }
    }
  ];

  return (
    <Box
      sx={{
        height: 214,
        width: "100%",
        "& .actions": {
          color: "text.secondary"
        },
        "& .textPrimary": {
          color: "text.primary"
        }
      }}
      className="mb-3"
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        hideFooter={true}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel }
        }}
      />
    </Box>
  );
};

ToDoList.propTypes = {
  writeTodos: PropTypes.func
};

ToDoList.defaultProps = {
  writeTodos: () => {}
};

export default ToDoList;
