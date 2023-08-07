import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import DeleteDialog from "../components/dialogs/deleteDialog";
import AddEditProDialog from "../components/dialogs/addEditProDialog";
import Paginatior from "../components/paginatior";
import ActionBar from "../components/actionBar";
import ToastCon from "../components/toastContainer";
import Layout from "../components/layout";
import {
  DELETE_PRODUCTS,
  GET_ALL_CATEGORIES,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS,
  SORT_PRODUCTS,
} from "../store/types/type";
import { dateFormater } from "../helper/dateFormater";
import { formatNumberWithCommas } from "../helper/decimalFormater";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products: masterProductData } = useSelector((state) => state.productReducer);
  const { categories: mastercategoryData } = useSelector((state) => state.categoryReducer);

  const [productList, setProductList] = useState({});
  const [allProductList, setAllProductList] = useState([]);
  const [categoryList, setcategoryList] = useState({});
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [actionFlag, setActionFlag] = useState(false);
  const [record, setRecord] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [csvDownload, setCsvDownload] = useState([]);
-
  useEffect(() => {
    dispatch({ type: GET_PRODUCTS, payload: {} });
    dispatch({ type: GET_ALL_CATEGORIES, payload: {} });
  }, []);

  useEffect(() => {
    setProductList(masterProductData);
    setcategoryList(mastercategoryData);
    setAllProductList(masterProductData?.allData?.allProducts);
  }, [masterProductData, mastercategoryData]);

  const handleSorting = (sortColumn) => {
    dispatch({
      type: SORT_PRODUCTS,
      payload: { sortColumn: sortColumn, pageNum: pageNumber },
    });
  };

  const handleAddEditOpen = (row) => {
    row && setRecord(row);
    setEditDialog(true);
  }

  const handleAddEditClose = () => {
    setEditDialog(false);
    setRecord({});
  };

  const handleDeleteOpen = (recordId, recordName) => {
    setRecord({ recordId: recordId, recordName: recordName });
    setDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialog(false);
  };

  const actionDelete = (recordId) => {
    setActionFlag(true);
    setTimeout(() => {
      dispatch({ type: DELETE_PRODUCTS, payload: recordId });
      setDeleteDialog(false);
      toast("Product is deleted successfully!");
      setActionFlag(false);
    }, 2000)
  };

  const handlePagination = (e) => {
    let pageNum = e.target.textContent;
    setPageNumber(pageNum);
    dispatch({ type: GET_PRODUCTS, payload: pageNum });
  };
  
  useEffect(() => {
    if(allProductList?.length != 0) {
      const heading = ["Product Name", "Price", "Category Name", "Discription"];
      const csvData = masterProductData?.allData?.allProducts?.map((element) => [
        element.productName,
        element.price,
        element.categoryName[0]?.categoryName, 
        element.discription, 
      ]);
      csvData?.unshift(heading);
      setCsvDownload(csvData);
    }
  },[allProductList])

  useEffect(() => {
    if(!masterProductData?.allData?.allProducts) {
      dispatch({ type: GET_ALL_PRODUCTS, payload: {} });
    }
  }, []);


  const tableHeader = [
    {
      headerName: "Product Image",
      fieldName: "productImage",
    },
    {
      headerName: "Product Name",
      fieldName: "productName",
    },
    {
      headerName: "Price (Rs)",
      fieldName: "price",
    },
    {
      headerName: "Discription",
      fieldName: "discription",
    },
    {
      headerName: "Category",
      fieldName: "categoryId",
    },
    {
      headerName: "Created At",
      fieldName: "createdAt",
    },
    {
      headerName: "Updated At",
      fieldName: "updatedAt",
    },
  ];

  return (
    <>
      <Layout>
        <ActionBar
          name="Product List"
          handleAddEditOpen={handleAddEditOpen}
          searchType="SEARCH_PRODUCT"
          getType="GET_PRODUCTS"
          csvData={csvDownload}
        />
        <br />
        {productList.data?.allProducts != undefined ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {tableHeader.map((name) => {
                      return (
                        <TableCell align="center">
                          <Button onClick={() => handleSorting(name.fieldName)}>
                            {name.headerName}
                          </Button>
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList.data?.allProducts.map((row, i) => {
                    return (
                      <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row" align="center">
                          {row.productImage ? (
                            <img
                              src={row.productImage}
                              alt="Product image"
                              style={{ width: "100px", marginBottom: 0 }}
                            />
                          ) : (
                            "No image"
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.productName}
                        </TableCell>
                        <TableCell align="center">
                          {formatNumberWithCommas(row.price)}/-
                        </TableCell>
                        <TableCell align="center">{row.discription}</TableCell>
                        <TableCell align="center">
                          {row.categoryName[0]?.categoryName}
                        </TableCell>
                        <TableCell align="center">
                          {dateFormater(row.createdAt)}
                        </TableCell>
                        <TableCell align="center">
                          {dateFormater(row.updatedAt)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton color="warning" aria-label="edit" onClick={() => handleAddEditOpen(row)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            aria-label="delete"
                            onClick={() => handleDeleteOpen(row._id, row.productName)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Paginatior
              totalPages={productList.data?.totalPages}
              handlePagination={handlePagination}
            />
          </>
        ) : (
          <Loader />
        )}
        {editDialog && (
          <AddEditProDialog
            editDialog={editDialog}
            setEditDialog={setEditDialog}
            handleAddEditClose={handleAddEditClose}
            categoryList={categoryList}
            record={record}
          />
        )}
        <DeleteDialog
          deleteDialog={deleteDialog}
          handleDeleteClose={handleDeleteClose}
          record={record}
          actionDelete={actionDelete}
          actionFlag={actionFlag}
        />
      </Layout>
      <ToastCon />
    </>
  );
};

export default ProductList;
