import { Pagination, Stack } from "@mui/material";

const Paginatior = ({ totalPages, handlePagination }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        onChange={handlePagination}
      />
    </Stack>
  );
};

export default Paginatior;
