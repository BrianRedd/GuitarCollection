/** @module GalleryImage */

import React from "react";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import confirm from "reactstrap-confirm";

import {
  deleteGalleryImage,
  getGallery
} from "../../store/slices/gallerySlice";

/**
 * @function GalleryImage
 * @returns {React.ReactNode}
 */
const GalleryImage = props => {
  const { image, selectImage } = props;
  const dispatch = useDispatch();

  return (
    <div className="border p-2 m-2 text-center" style={{ width: "200px" }}>
      <Tooltip arrow placement="top" title={image.notes}>
        <figure>
          <img
            src={`http://localhost:5000/gallery/${image.image}`}
            style={{ maxWidth: "175px" }}
            alt={image._id}
          ></img>
          <figcaption>{image.caption}</figcaption>
        </figure>
      </Tooltip>
      <div className="mt-3">
        <IconButton onClick={() => selectImage(image)}>
          <FontAwesomeIcon icon={faEdit} className="text-success small" />
        </IconButton>
        <IconButton
          onClick={async () => {
            const result = await confirm({
              title: `Delete Image?`,
              message: `Are you sure you want to permanently delete image?`,
              confirmColor: "danger",
              cancelColor: "link text-primary"
            });
            if (result) {
              dispatch(deleteGalleryImage(image)).then(() =>
                dispatch(getGallery())
              );
            }
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="text-danger small" />
        </IconButton>
      </div>
    </div>
  );
};

GalleryImage.propTypes = {
  image: PropTypes.objectOf(PropTypes.any),
  selectImage: PropTypes.func
};

GalleryImage.defaultTypes = {
  image: {},
  selectImage: () => {}
};

export default GalleryImage;
