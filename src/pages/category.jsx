import { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import DeleteDialog from "../components/dialogs/deleteDialog";
import Paginatior from "../components/paginatior";
import ActionBar from "../components/actionBar";
import AddEditCateDialog from "../components/dialogs/addEditCateDialog";
import Layout from "../components/layout";
import ToastCon from "../components/toastContainer";
import Loader from "../components/loader";
import {
  DELETE_CATEGORIES,
  GET_ALL_CATEGORIES,
  GET_CATEGORIES,
  SORT_CATEGORIES,
} from "../store/types/type";
import { dateFormater } from "../helper/dateFormater";

const CategoryList = () => {
  const dispatch = useDispatch();
  
  const [categoryList, setCategoryList] = useState([]);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [actionFlag, setActionFlag] = useState(false);
  const [record, setRecord] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const { categories: masterCategoryData } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch({ type: GET_CATEGORIES, payload: { limit: 2 } });
  }, []);

  useEffect(() => {
    setCategoryList(masterCategoryData);
  }, [masterCategoryData]);

  const handleSorting = (sortColumn) => {
    dispatch({
      type: SORT_CATEGORIES,
      payload: { sortColumn: sortColumn, pageNum: pageNumber || 1 },
    });
  };

  const handleAddEditOpen = (row) => {
    row && setRecord(row);
    setEditDialog(true);
  }

  const handleAddEditClose = () => setEditDialog(false);

  const handleDeleteOpen = (recordId, recordName) => {
    setRecord({ recordId: recordId, recordName: recordName });
    setDeleteDialog(true);
  };
  
  const handleDeleteClose = () => setDeleteDialog(false);
  
  const actionDelete = (recordId) => {
    setActionFlag(true);
    setTimeout(() => {
      dispatch({ type: DELETE_CATEGORIES, payload: recordId });
      setDeleteDialog(false);
      toast("Category is deleted successfully!");
      setActionFlag(false);
    }, 2000)
  };

  const handlePagination = (e) => {
    let pageNum = e.target.textContent;
    setPageNumber(pageNum);
    dispatch({ type: GET_CATEGORIES, payload: pageNum });
  };

  const handleDownload = () => {
    dispatch({ type: GET_ALL_CATEGORIES, payload: {} });
  };

  return (
    <>
      <Layout>
        <Container maxWidth="xl">
          <ActionBar
            name="Category List"
            handleAddEditOpen={handleAddEditOpen}
            searchType="SEARCH_CATEGORY"
            getType="GET_CATEGORIES"
            handleDownload={handleDownload}
            allData={masterCategoryData}
          />
          <br />
          {categoryList.length != 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Button onClick={() => handleSorting("categoryName")}>
                          Category Name
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleSorting("createdAt")}>
                          Created At
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleSorting("updatedAt")}>
                          Updated At
                        </Button>
                      </TableCell>
                      <TableCell align="center">Edit</TableCell>
                      <TableCell align="center">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoryList.data?.allCategories.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.categoryName}
                        </TableCell>
                        <TableCell align="center">
                          {dateFormater(row.createdAt)}
                        </TableCell>
                        <TableCell align="center">
                          {dateFormater(row.updatedAt)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="edit"
                            size="large"
                            color="warning"
                            onClick={() => handleAddEditOpen(row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="delete"
                            size="large"
                            color="error"
                            onClick={() =>
                              handleDeleteOpen(row._id, row.categoryName)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              <Paginatior
                totalPages={categoryList.data?.totalPages}
                handlePagination={handlePagination}
              />
            </>
          ) : (
            <Loader />
          )}
          {editDialog && (
            <AddEditCateDialog
              editDialog={editDialog}
              setEditDialog={setEditDialog}
              handleAddEditClose={handleAddEditClose}
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
          <ToastCon />
        </Container>
      </Layout>
    </>
  );
};

export default CategoryList;
