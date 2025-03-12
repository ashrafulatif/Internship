const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export const getCroppedImg = async (imageSrc, crop, zoom) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size to be a perfect square based on the smallest dimension
  const size = Math.min(image.width, image.height);
  canvas.width = size;
  canvas.height = size;

  // Calculate crop area
  const centerX = image.width / 2;
  const centerY = image.height / 2;
  const scale = 1 / zoom;

  // Calculate source position and dimensions
  const srcX = centerX + crop.x * scale - size / 2 / zoom;
  const srcY = centerY + crop.y * scale - size / 2 / zoom;
  const srcWidth = size / zoom;
  const srcHeight = size / zoom;

  // Draw the image with cropping applied
  ctx.drawImage(
    image,
    srcX,
    srcY,
    srcWidth,
    srcHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  // Return as blob URL
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create cropped image"));
          return;
        }
        resolve(URL.createObjectURL(blob));
      },
      "image/jpeg",
      0.95
    ); // High quality JPEG
  });
};
