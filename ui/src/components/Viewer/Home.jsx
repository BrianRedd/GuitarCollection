import React, { useState } from "react";

import {
  faEdit,
  faTrash,
  faWandSparkles
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { removeGuitar } from "../../store/slices/guitarsSlice";

/**
 * @function Home
 * @returns {ReactNode}
 */
const Home = () => {
  const dispatch = useDispatch();
  const guitars = useSelector(state => state.guitarsState?.list) ?? [];

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headCells = [
    {
      id: "name",
      label: "Name"
    },
    {
      id: "make",
      label: "Make"
    },
    {
      id: "model",
      label: "Model"
    },
    {
      id: "year",
      label: "Year"
    },
    {
      id: "iconHolder",
      label: ""
    }
  ];

  const gridData = _.orderBy(guitars ?? [], orderBy, order).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (page + 1) * rowsPerPage) - guitars.length : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle" size="small">
          <TableHead>
            <TableRow>
              {headCells.map(headCell => (
                <TableCell
                  className={headCell.id === "iconHolder" ? "icon_holder" : ""}
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.id === "iconHolder" ? (
                    <span>{headCell.label}</span>
                  ) : (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => {
                        setOrderBy(headCell.id);
                        setOrder(order === "asc" ? "desc" : "asc");
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {gridData.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                  {row.isNew ? (
                    <FontAwesomeIcon icon={faWandSparkles} className="ms-2" />
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>{row.make}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell className="icon_holder">
                  <IconButton>
                    <Link to={`/editguitar/${row._id}`}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-success small"
                      />
                    </Link>
                  </IconButton>
                  <IconButton onClick={() => dispatch(removeGuitar(row._id))}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-danger small"
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 71 * emptyRows
                }}
              >
                <TableCell colSpan={headCells.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={guitars.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Home;
