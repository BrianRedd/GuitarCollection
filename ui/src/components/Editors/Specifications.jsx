/** @module Specifications */

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
import { SPEC_OPTION_DEFAULTS } from "../data/constants";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const createNewRow = () => {
    const id = randomId();
    setRows(oldRows => [
      ...oldRows,
      {
        id,
        specType: "",
        specification: "",
        isNew: true
      }
    ]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "specType" }
    }));
  };

  return (
    <GridToolbarContainer className="d-flex justify-content-between p-2">
      <h5>Specifications</h5>
      <Button
        color="primary"
        startIcon={<FontAwesomeIcon icon={faPlus} />}
        onClick={createNewRow}
      >
        Add Spec
      </Button>
    </GridToolbarContainer>
  );
}

/**
 * @function Specifications
 * @returns {React.ReactNode}
 */
const Specifications = props => {
  const { writeSpecifications } = props;
  const formProps = useFormikContext();

  const [rows, setRows] = useState(formProps?.values?.specifications ?? []);
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
    writeSpecifications(newRows);
    return updatedRow;
  };

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "specType",
      headerName: "Type",
      flex: 0.3,
      editable: true,
      type: "singleSelect",
      valueOptions: SPEC_OPTION_DEFAULTS,
      getOptionValue: value => value,
      getOptionLabel: value => value.replaceAll("^", ""),
      headerClassName: "fst-italic"
    },
    {
      field: "specification",
      headerName: "Specification",
      editable: true,
      flex: 1,
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
        processRowUpdate={(newRow, oldRow) => {
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

Specifications.propTypes = {
  writeSpecifications: PropTypes.func
};

Specifications.defaultProps = {
  writeSpecifications: () => {}
};

export default Specifications;
