import { Button, DialogActions, DialogTitle, Grid } from "@mui/material";

const DialogContainer = ({ children, record, handleAddEditClose, name, actionFlag }) => {
  return (
    <>
      <DialogTitle style={{ padding: "0" }}>
        {record ? `Edit ${name}` : `Add ${name}`}
      </DialogTitle>
      {children}
      <Grid item xs={12}>
        <DialogActions>
          <Button
            type="button"
            variant="contained"
            color="warning"
            onClick={handleAddEditClose}
          >
            Cancel
          </Button>{" "}
          <Button type="submit" variant="contained" color="primary" disabled={actionFlag}>
            {record ? "Update" : "Create"}
          </Button>{" "}
        </DialogActions>
      </Grid>
    </>
  );
};

export default DialogContainer;
