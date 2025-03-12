"use client";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Cropper from "react-easy-crop";
import Iconify from "../Iconify/Iconify";
import { getCroppedImg } from "./getCroppedImg";

// ----------------------------------------------------------------------

export default function UploadAvatar({
  sx,
  error,
  value,
  disabled,
  helperText,
  className,
  onDrop,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    disabled,
    accept: { "image/*": [] },
    onDrop,
    ...other,
  });

  const hasFile = !!value;
  const hasError = isDragReject || !!error;
  const [preview, setPreview] = useState("");
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      setPreview(URL.createObjectURL(value));
    } else {
      setPreview("");
    }
  }, [value]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //save resized image
  const handleSave = async () => {
    try {
      const croppedImg = await getCroppedImg(preview, crop, zoom);
      setCroppedImage(croppedImg);

      // Create a blob from the cropped image URL
      const response = await fetch(croppedImg);
      const blob = await response.blob();

      // Create a new File object from the blob
      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      // Update the value with the new File
      if (onDrop) {
        onDrop([file]);
      }

      handleClose();
    } catch (error) {
      console.error("Failed to crop image:", error);
    }
  };

  // Modified to ensure the image fits correctly
  const renderPreview =
    hasFile && (croppedImage || preview) ? (
      <Box
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          alt="avatar"
          src={croppedImage || preview}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
          }}
        />
      </Box>
    ) : null;

  const renderPlaceholder = (
    <Box
      className="upload-placeholder"
      sx={{
        top: 0,
        gap: 1,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 9,
        display: "flex",
        borderRadius: "50%",
        position: "absolute",
        alignItems: "center",
        color: "text.disabled",
        flexDirection: "column",
        justifyContent: "center",
        bgcolor: "rgba(0, 0, 0, 0.08)",
        transition: "opacity 0.3s",
        "&:hover": { opacity: 0.72 },
        ...(hasError && {
          color: "error.main",
          bgcolor: "rgba(255, 0, 0, 0.08)",
        }),
        ...(hasFile && {
          zIndex: 9,
          opacity: 0,
          color: "common.white",
          bgcolor: "rgba(0, 0, 0, 0.64)",
        }),
      }}
    >
      <Iconify icon="solar:camera-add-bold" width={32} />
      <Typography variant="caption">
        {hasFile ? "Update photo" : "Upload photo"}
      </Typography>
    </Box>
  );

  const renderContent = (
    <Box
      sx={{
        width: 1,
        height: 1,
        overflow: "hidden",
        borderRadius: "50%",
        position: "relative",
      }}
    >
      {renderPreview}
      {renderPlaceholder}
    </Box>
  );

  return (
    <>
      <Box
        {...getRootProps()}
        className={className}
        sx={{
          p: 1,
          m: "auto",
          width: 144,
          height: 144,
          cursor: "pointer",
          overflow: "hidden",
          borderRadius: "50%",
          border: "1px dashed rgba(0, 0, 0, 0.2)",
          ...(isDragActive && { opacity: 0.72 }),
          ...(disabled && { opacity: 0.48, pointerEvents: "none" }),
          ...(hasError && { borderColor: "error.main" }),
          ...(hasFile && {
            ...(hasError && {
              bgcolor: "rgba(255, 0, 0, 0.08)",
            }),
            "&:hover .upload-placeholder": { opacity: 1 },
          }),
          ...sx,
        }}
      >
        <input {...getInputProps()} />
        {renderContent}
      </Box>

      {helperText && helperText}

      <Button onClick={handleOpen} disabled={!hasFile}>
        Preview & Resize
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Resize Image
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 300,
              bgcolor: "grey.200",
            }}
          >
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              cropShape="round"
              showGrid={false}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
