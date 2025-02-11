import React, { useState, ChangeEvent } from "react";
import ProductCard from "./ProductCard";
import { Box, Pagination, Stack, Typography } from "@mui/material";

// Define Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  rating: number;
}

interface ProductListProps {
  products: Product[];
  hideTitle?: boolean; //prop for hide title
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  hideTitle = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{ textAlign: "center", padding: "20px" }}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      {/* Only show the title if hideTitle is false */}
      {!hideTitle && (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Featured Products
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Check & Get Your Desired Product!
          </Typography>
        </>
      )}

      {/* Product List */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
        data-aos="fade-up"
        data-aos-duration="900"
      >
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>

      {/* Pagination */}
      <Stack spacing={2} sx={{ m: 3 }}>
        <Pagination
          sx={{ display: "flex", justifyContent: "center" }}
          count={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default ProductList;
