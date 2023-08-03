import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, IconButton } from "@mui/material";
import DeleteDialog from "../components/dialogs/deleteDialog";
import Paginatior from "../components/paginatior";
import ActionBar from "../components/actionBar";
import AddEditSubCateDialog from "../components/dialogs/addEditSubCateDialog";
import Layout from "../components/layout";
import Loader from "../components/loader";
import {
  DELETE_SUB_CATEGORIES,
  GET_ALL_SUB_CATEGORIES,
  GET_SUB_CATEGORIES,
  SORT_SUB_CATEGORIES,
} from "../store/types/type";
import { dateFormater } from "../helper/dateFormater";

const SubCategoryList = () => {
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [actionFlag, setActionFlag] = useState(false);
  const [record, setRecord] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const { subCategories: masterSubCategoryData } = useSelector((state) => state.subCategoryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_SUB_CATEGORIES, payload: 1 });
  }, []);

  useEffect(() => {
    setSubCategoryList(masterSubCategoryData);
  }, [masterSubCategoryData]);

  const handleSorting = (sortColumn) => {
    dispatch({
      type: SORT_SUB_CATEGORIES,
      payload: { sortColumn: sortColumn, pageNum: pageNumber },
    });
  };

  const handleAddEditOpen = (row) => {
    row && setRecord(row);
    setEditDialog(true);
  };

  const handleAddEditClose = () => setEditDialog(false);

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
      dispatch({ type: DELETE_SUB_CATEGORIES, payload: recordId });
      setDeleteDialog(false);
      toast("Sub Category is deleted successfully!");
      setActionFlag(false);
    }, 2000)
  };

  const handlePagination = (e) => {
    let pageNum = e.target.textContent;
    dispatch({ type: GET_SUB_CATEGORIES, payload: pageNum });
    setPageNumber(pageNum);
  };

  const handleDownload = () => {
    dispatch({ type: GET_ALL_SUB_CATEGORIES, payload: {} });
  };

  return (
    <>
      <Layout>
        <Container maxWidth="xl">
          <ActionBar
            name="Sub Category List"
            handleAddEditOpen={handleAddEditOpen}
            searchType="SEARCH_SUB_CATEGORY"
            getType="GET_SUB_CATEGORIES"
            handleDownload={handleDownload}
            allData={masterSubCategoryData}
          />
          <br />
          {subCategoryList.length != 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={() => handleSorting("subCategoryName")}
                        >
                          Sub Category Name
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleSorting("subCategoryName")}
                        >
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
                    {masterSubCategoryData?.data?.allSubCategories.map(
                      (row, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.subCategoryName}
                          </TableCell>
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
                                handleDeleteOpen(row._id, row.subCategoryName)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              <Paginatior
                totalPages={subCategoryList.data?.totalPages}
                handlePagination={handlePagination}
              />
            </>
          ) : (
            <Loader />
          )}
          {editDialog && (
            <AddEditSubCateDialog
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
        </Container>
      </Layout>
    </>
  );
};

export default SubCategoryList;
