import React, { useState } from "react";

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
import PropTypes from "prop-types";
import { OWNERSHIP_STATUS_OPTIONS } from "../data/constants";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const createNewRow = () => {
    const id = randomId();
    setRows(oldRows => [
      ...oldRows,
      {
        id,
        ownershipStatus: "",
        where: "",
        when: "",
        who: "",
        amount: null,
        notes: "",
        isNew: true
      }
    ]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "ownershipStatus" }
    }));
  };

  return (
    <GridToolbarContainer className="d-flex justify-content-between p-2">
      <h5>Purchase History</h5>
      <Button
        color="primary"
        startIcon={<FontAwesomeIcon icon={faPlus} />}
        onClick={createNewRow}
      >
        Add Entry
      </Button>
    </GridToolbarContainer>
  );
}

const PurchaseHistory = props => {
  const { writePurchaseHistory } = props;
  const formProps = useFormikContext();

  const [rows, setRows] = useState(formProps?.values?.purchaseHistory ?? []);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View }
    });
  };

  const handleDeleteClick = id => () => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleCancelClick = id => () => {
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
    const updatedRow = { ...newRow, isNew: false };
    const newRows = rows.map(row => (row.id === newRow.id ? updatedRow : row));
    setRows(newRows);
    writePurchaseHistory(newRows);
    return updatedRow;
  };

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "ownershipStatus",
      headerName: "Ownership Status",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: OWNERSHIP_STATUS_OPTIONS,
      getOptionValue: value => value.value,
      getOptionLabel: value => value.label
    },
    {
      field: "where",
      headerName: "Transaction Location",
      flex: 1,
      editable: true
    },
    {
      field: "when",
      headerName: "Date",
      flex: 1,
      editable: true
    },
    {
      field: "who",
      headerName: "Store / Party",
      flex: 1,
      editable: true
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 1,
      align: "right",
      headerAlign: "right",
      editable: true,
      valueFormatter: params => {
        if (params.value == null) {
          return "";
        }
        return `$ ${params.value.toLocaleString()}`;
      }
    },
    {
      field: "notes",
      headerName: "Notes",
      flex: 1.5,
      editable: true
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
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faTrash} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
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
        processRowUpdate={(newRow, oldRow) => {
          console.log("processRowUpdate > values", newRow);
          return processRowUpdate(newRow, oldRow);
        }}
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

PurchaseHistory.propTypes = {
  writePurchaseHistory: PropTypes.func
};

PurchaseHistory.defaultProps = {
  writePurchaseHistory: () => {}
};

export default PurchaseHistory;
