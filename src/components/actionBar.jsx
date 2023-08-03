import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { CloudDownload, Add, Refresh } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { CSVLink } from "react-csv";

const ActionBar = ({ handleAddEditOpen, name, searchType, getType, handleDownload, csvData}) => {
  const dispatch = useDispatch();

  const [actionFlag, setActionFlag] = useState(false);
  const [searchText, setSearchText] = useState("");

  const changeSearch = (e) => {
    let text = e.target.value;
    setSearchText(text);
  };

  const handleSearch = () => {
    if (searchText) {
      return dispatch({ type: searchType, payload: searchText });
    }
    dispatch({ type: getType, payload: {} });
  };

  const handleRefresh = () => {
    setActionFlag(true);
    setTimeout(() => {
      dispatch({ type: getType, payload: {} });
      setActionFlag(false);
    }, 2000);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{name}</Typography>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <div style={{ paddingTop: "5px" }}>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              size="small"
              onChange={changeSearch}
            />
            <IconButton
              aria-label="search"
              color="inherit"
              size="medium"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <Button
            startIcon={<Refresh size="15px" />}
            sx={{
              fontSize: "1rem",
              cursor: actionFlag ? "not-allowed" : "pointer",
            }}
            onClick={handleRefresh}
            disabled={actionFlag}
          >
            Refresh
          </Button>
          {csvData ? (
            <Button
              startIcon={<CloudDownload size="15px" />}
              sx={{ fontSize: "1rem" }}
              onClick={handleDownload}
            >
              <CSVLink
                data={csvData}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Download
              </CSVLink>
            </Button>
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            startIcon={<Add size="15px" />}
            sx={{ fontSize: "1rem" }}
            onClick={handleAddEditOpen}
          >
            Add Record
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ActionBar;
