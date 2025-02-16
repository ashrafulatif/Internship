import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import QuickEditDialog from "./QuickEditDialog"; // Import Quick Edit Component

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/product-management/"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    router.push("/add");
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleUpdate = () => {
    router.push(`/update/${selectedProduct.productId}`);
    handleMenuClose();
  };

  //for delete prodict
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:1000/product-management/remove-product/${selectedProduct.productId}`
      );
      toast.error("Product has been deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setProducts(
        products.filter(
          (product) => product.productId !== selectedProduct.productId
        )
      );
      handleMenuClose();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const handleQuickEdit = (product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleQuickEditClose = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts(
      products.map((p) =>
        p.productId === updatedProduct.productId ? updatedProduct : p
      )
    );
  };

  return (
    <Box my={5}>
      <Box display="flex" justifyContent="right" mr={9} my={4}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add New
        </Button>
      </Box>
      <Typography variant="h6" ml={10}>
        Product Information Table:
      </Typography>
      <Paper sx={{ width: "90%", margin: "auto", marginTop: 2, padding: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price ($)</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Release Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stockQuantity}</TableCell>
                    <TableCell>
                      {new Date(product.releaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleQuickEdit(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={(event) => handleMenuClick(event, product)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      {/* 3 dot icon */}
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleUpdate}>
                          <ListItemIcon>
                            <EditIcon />
                          </ListItemIcon>
                          Update
                        </MenuItem>
                        <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
                          <ListItemIcon>
                            <DeleteIcon sx={{ color: "red" }} />
                          </ListItemIcon>
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <QuickEditDialog
        open={isEditDialogOpen}
        handleClose={handleQuickEditClose}
        product={selectedProduct}
        onProductUpdate={handleProductUpdate}
      />
      <ToastContainer />
    </Box>
  );
};

export default ProductTable;
