/** @module BrandBlock */

import React from "react";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import confirm from "reactstrap-confirm";

import { deleteBrand, getBrands } from "../../store/slices/brandsSlice";

/**
 * @function BrandBlock
 * @returns {React.ReactNode}
 */
const BrandBlock = props => {
  const { brand, selectBrand } = props;
  const dispatch = useDispatch();

  return (
    <div className="border p-2 m-2 text-center" style={{ width: "200px" }}>
      <p>
        {brand.id} - {brand.name}
      </p>
      <img
        src={`http://localhost:5000/${brand.logo}`}
        height="70"
        style={{ maxWidth: "175px" }}
        alt={brand.name}
      ></img>
      <p>{brand.notes}</p>
      <IconButton onClick={() => selectBrand(brand)}>
        <FontAwesomeIcon icon={faEdit} className="text-success small" />
      </IconButton>
      <IconButton
        onClick={async () => {
          const result = await confirm({
            title: `Delete Brand ${brand.name}?`,
            message: `Are you sure you want to permanently delete brand ${brand.name}?`,
            confirmColor: "danger",
            cancelColor: "link text-primary"
          });
          if (result) {
            dispatch(deleteBrand(brand._id)).then(() => dispatch(getBrands()));
          }
        }}
      >
        <FontAwesomeIcon icon={faTrash} className="text-danger small" />
      </IconButton>
    </div>
  );
};

BrandBlock.propTypes = {
  brand: PropTypes.objectOf(PropTypes.any),
  selectBrand: PropTypes.func
};

BrandBlock.defaultTypes = {
  brand: {},
  selectBrand: () => {}
};

export default BrandBlock;
