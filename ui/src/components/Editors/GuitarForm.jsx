import React, { useState } from "react";

import {
  faCalendarCheck,
  faCircleXmark,
  faGuitar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton } from "@mui/material";
import { Formik } from "formik";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, FormGroup, Row } from "reactstrap";

import {
  COLOR_OPTION_DEFAULTS,
  COUNTRY_OPTION_DEFAULTS,
  DATE_FORMAT,
  INSTRUMENT_OPTION_DEFAULTS,
  OWNERSHIP_STATUS_OPTIONS,
  SOUNDSCAPE_OPTION_DEFAULTS,
  SPEC_OPTION_DEFAULTS,
  STATUS_OPTION_DEFAULTS,
  TODO_OPTION_DEFAULTS,
  TUNING_OPTION_DEFAULTS
} from "../data/constants";
import { getGuitarsValidationSchema } from "./data/validationSchemas";

import { getDateFromOvationSN } from "../../utils/utils";
import InputFreeFormField from "../common/InputFreeFormField";
import InputSelectField from "../common/InputSelectField";
import InputTextField from "../common/InputTextField";
import EditableGrid from "./EditableGrid";

/**
 * @function GuitarForm
 * @returns {React.ReactNode}
 */
const GuitarForm = props => {
  const { handleSubmit, initialValues, buttonText } = props;
  const navigate = useNavigate();

  const guitars = useSelector(state => state.guitarsState?.list) ?? [];
  const brands = useSelector(state => state.brandsState.list) ?? [];

  const [snComment, setSnComment] = useState(null);

  const brandOptions = _.orderBy(
    brands?.map(brand => ({
      value: brand.id,
      label: brand.name,
      presence: (guitars ?? []).filter(guitar => guitar.brandId === brand.id)
        .length
    })),
    ["presence", "name"],
    ["desc", "asc"]
  );
  const countryOptions = _.uniq(
    _.compact([
      ...COUNTRY_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.countyOfOrigin).sort()
    ])
  );
  const instrumentOptions = _.uniq(
    _.compact([
      ...INSTRUMENT_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.instrumentType).sort()
    ])
  );
  const soundScapeOptions = _.uniq(
    _.compact([
      ...SOUNDSCAPE_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.soundScape)
    ])
  ).sort();
  const colorOptions = _.uniq(
    _.compact([
      ...COLOR_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.color)
    ])
  ).sort();
  const statusOptions = _.uniq(
    _.compact([
      ...STATUS_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.status).sort()
    ])
  );
  const tuningOptions = _.uniq(
    _.compact([
      ...TUNING_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.tuning).sort()
    ])
  );

  const isEdit = Boolean(initialValues._id);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={getGuitarsValidationSchema({
        isEdit,
        guitars
      })}
    >
      {formProps => {
        const writeArray = (arrayField, rows) => {
          console.log("writeArray", arrayField, rows);
          formProps.setFieldValue(arrayField, rows);
        };
        return (
          <Form>
            <FormGroup>
              {isEdit ? (
                <Row className="border my-4 pt-3">
                  <InputFreeFormField
                    name="status"
                    required
                    options={statusOptions}
                    width="wide"
                  />
                  <InputFreeFormField
                    name="tuning"
                    options={tuningOptions}
                    width="wide"
                  />
                  <InputTextField
                    name="lastPlayed"
                    label="Last Played"
                    otherProps={{
                      type: "date",
                      InputLabelProps: { shrink: true }
                    }}
                    width="wide"
                  />
                </Row>
              ) : null}
              <Row>
                <InputTextField name="name" required />
                <InputSelectField
                  name="brandId"
                  label="Brand"
                  required
                  options={brandOptions}
                />
                <InputTextField name="model" required />
                <InputTextField
                  name="serialNo"
                  label="S/N"
                  required
                  Adornment={
                    <IconButton
                      onClick={() => {
                        const dateFromSN = getDateFromOvationSN({
                          brandId: formProps.values.brandId,
                          serialNo: formProps.values.serialNo
                        });
                        formProps.setFieldValue("year", dateFromSN.year ?? "");
                        setSnComment(dateFromSN.comment ?? "");
                      }}
                      color="info"
                    >
                      <FontAwesomeIcon icon={faCalendarCheck} />
                    </IconButton>
                  }
                />
                <InputTextField name="year" required helperText={snComment} />
                <InputFreeFormField
                  name="countyOfOrigin"
                  label="Country of Origin"
                  options={countryOptions}
                />
                <InputTextField name="case" width="wide" />
                <InputFreeFormField
                  name="instrumentType"
                  label="Instrument Type"
                  required
                  options={instrumentOptions}
                />
                <InputTextField
                  name="noOfStrings"
                  label="Number of Strings"
                  required
                  otherProps={{
                    type: "number"
                  }}
                />
                <InputFreeFormField
                  name="soundScape"
                  label="Sound Scape"
                  required
                  options={soundScapeOptions}
                  width="wide"
                />
                <InputFreeFormField
                  name="color"
                  required
                  options={colorOptions}
                  width="wide"
                />
                <InputTextField
                  name="appearanceNotes"
                  label="Notes on Appearance"
                  width="wide"
                />
              </Row>
              <Row>
                <InputTextField
                  name="story"
                  otherProps={{
                    multiline: true,
                    rows: 4
                  }}
                  width="full"
                />
              </Row>
              {isEdit ? null : (
                <Row>
                  <InputFreeFormField
                    name="status"
                    required
                    options={statusOptions}
                    width="wide"
                  />
                  <InputFreeFormField
                    name="tuning"
                    options={tuningOptions}
                    width="wide"
                  />
                  <InputTextField
                    name="lastPlayed"
                    label="Last Played"
                    otherProps={{
                      type: "date",
                      InputLabelProps: { shrink: true }
                    }}
                  />
                </Row>
              )}
              <EditableGrid
                title="Purchase History"
                writeArray={writeArray}
                listName="purchaseHistory"
                fieldDefaults={{
                  ownershipStatus: "",
                  where: "",
                  when: "",
                  who: "",
                  amount: null,
                  notes: ""
                }}
                gridColumns={[
                  {
                    field: "ownershipStatus",
                    headerName: "Ownership Status",
                    flex: 1,
                    editable: true,
                    type: "singleSelect",
                    valueOptions: OWNERSHIP_STATUS_OPTIONS,
                    getOptionValue: value => value.value,
                    getOptionLabel: value => value.label,
                    headerClassName: "fst-italic"
                  },
                  {
                    field: "where",
                    headerName: "Transaction Location",
                    flex: 1,
                    editable: true,
                    headerClassName: "fst-italic"
                  },
                  {
                    field: "when",
                    headerName: "Date",
                    flex: 1,
                    editable: true,
                    headerClassName: "fst-italic"
                  },
                  {
                    field: "who",
                    headerName: "Store / Party",
                    flex: 1,
                    editable: true,
                    headerClassName: "fst-italic"
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
                    },
                    headerClassName: "fst-italic"
                  },
                  {
                    field: "notes",
                    headerName: "Notes",
                    flex: 1.5,
                    editable: true,
                    headerClassName: "fst-italic"
                  }
                ]}
              />
              {/* <Specifications
                writeSpecifications={rows => writeArray("specifications", rows)}
              /> */}
              <EditableGrid
                title="Specifications"
                writeArray={writeArray}
                listName="specifications"
                fieldDefaults={{
                  specType: "",
                  specification: ""
                }}
                gridColumns={[
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
                  }
                ]}
              />
              <EditableGrid
                title="To Do List"
                writeArray={writeArray}
                listName="todoList"
                fieldDefaults={{
                  todoItem: "",
                  status: "",
                  completionDate: "",
                  notes: ""
                }}
                gridColumns={[
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
                      const completionDate = moment(params.value).format(
                        DATE_FORMAT
                      );
                      if (completionDate === "Invalid date") {
                        return { ...params.row, completionDate: "" };
                      }
                      return { ...params.row, completionDate };
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
                  }
                ]}
              />
              <EditableGrid
                title="Maintenance History"
                writeArray={writeArray}
                listName="maintenance"
                fieldDefaults={{
                  maintenanceType: "",
                  maintenanceDate: "",
                  whoBy: "",
                  cost: null,
                  notes: ""
                }}
                gridColumns={[
                  {
                    field: "maintenanceType",
                    headerName: "Maintenance Type",
                    editable: true,
                    flex: 3,
                    headerClassName: "fst-italic"
                  },
                  {
                    field: "maintenanceDate",
                    headerName: "Date",
                    editable: true,
                    type: "date",
                    flex: 1,
                    headerClassName: "fst-italic",
                    valueSetter: params => {
                      const maintenanceDate = moment(params.value).format(
                        DATE_FORMAT
                      );
                      if (maintenanceDate === "Invalid date") {
                        return { ...params.row, maintenanceDate: "" };
                      }
                      return { ...params.row, maintenanceDate };
                    },
                    valueGetter: params => {
                      if (!params.value) {
                        return params.value;
                      }
                      return new Date(params.value);
                    }
                  },
                  {
                    field: "whoBy",
                    headerName: "Performed By",
                    flex: 1,
                    editable: true,
                    headerClassName: "fst-italic"
                  },
                  {
                    field: "cost",
                    headerName: "Cost",
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
                    },
                    headerClassName: "fst-italic"
                  },
                  {
                    field: "notes",
                    headerName: "Notes",
                    editable: true,
                    flex: 2,
                    headerClassName: "fst-italic"
                  }
                ]}
              />
            </FormGroup>
            <Row className="pt-5">
              <Col xs={0} md={6} />
              <Col xs={12} md={6} className="d-flex justify-content-end">
                <Button
                  onClick={formProps.handleSubmit}
                  variant="contained"
                  disableElevation
                  color="primary"
                  className="font-weight-bold"
                >
                  <FontAwesomeIcon icon={faGuitar} className="me-3" />
                  {buttonText}
                </Button>
                <Button
                  className="ms-2"
                  onClick={() => {
                    formProps.resetForm(initialValues);
                    navigate(
                      `/${
                        isEdit ? `guitar/${initialValues._id}` : "guitarlist"
                      }`
                    );
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  <FontAwesomeIcon icon={faCircleXmark} className="me-3" />
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

GuitarForm.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.objectOf(PropTypes.any),
  buttonText: PropTypes.string
};

GuitarForm.defaultTypes = {
  handleSubmit: () => {},
  initialValues: {},
  buttonText: ""
};

export default GuitarForm;
