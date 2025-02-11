"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container, Typography } from "@mui/material";
import ProductList from "@/components/ProductList";
import productsData from "@/Data/productData.json";

const SearchResults = () => {
  const query = useSearchParams().get("query")?.toLowerCase() || "";

  const filteredProducts = productsData.products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results for: {query}
      </Typography>

      {filteredProducts.length ? (
        <ProductList products={filteredProducts} hideTitle={true} />
      ) : (
        <Typography variant="h6" color="textSecondary">
          No products found.
        </Typography>
      )}
    </Container>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
