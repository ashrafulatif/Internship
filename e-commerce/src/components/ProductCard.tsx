import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

// Define the Product type
interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 345,
        height: 320, // Fixed card height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      {/* Image with a fixed height */}
      <CardMedia
        component="img"
        alt={product.name}
        image={product.imageUrl}
        sx={{
          height: 150,
          width: 150,
          objectFit: "cover",
          margin: "auto",
        }}
      />
      <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ mt: 1, textAlign: "left" }}>
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {product.description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, textAlign: "left" }}>
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ pb: 1 }}>
        <Button size="small" variant="contained">
          Buy
        </Button>
        <Button size="small" variant="outlined">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
