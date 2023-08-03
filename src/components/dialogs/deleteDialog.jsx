import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ deleteDialog, handleDeleteClose, record, actionDelete, actionFlag }) => {
  return (
    <div>
      <Dialog
        open={deleteDialog}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ display: "flex", gap: "10px", alignItems: "center", padding: "16px" }}>
          <ReportGmailerrorredIcon fontSize="large" color="error"/>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You are deleting the racord <b>{record?.recordName}</b>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteClose}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => actionDelete(record.recordId)}
            variant="contained"
            color="error"
            disabled={actionFlag}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
