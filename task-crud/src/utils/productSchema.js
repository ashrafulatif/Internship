import { z } from "zod";

const productSchema = z.object({
  productName: z.string().min(3, "Product Name must be at least 3 characters"),
  productDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  price: z.preprocess(
    (val) => (val ? parseFloat(val) : undefined),
    z.number().min(0, "Price must be a positive number")
  ),
  stockQuantity: z.preprocess(
    (val) => (val ? parseInt(val, 10) : undefined),
    z.number().min(1, "Stock Quantity must be at least 1")
  ),
  releaseDate: z.string().min(1, "Release Date is required"),
  category: z.string().min(1, "Category is required"),
});

export default productSchema;
