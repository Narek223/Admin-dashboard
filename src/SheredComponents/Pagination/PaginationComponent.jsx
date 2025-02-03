import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


export default function PaginationComponent({onChange,page,perpage,service}) {


  const handleChangePage = (event, newPage) => {
    page(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    perpage(parseInt(event.target.value, 10));
    page(0);
  };
  return (
    <div>
    <div>
      <Stack spacing={3} direction="row" alignItems="center" >

        <Select
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "rgba(248, 249, 250, 1)",
            borderRadius: "8px",
            padding: 0,
            height:"38px"
          },
          "& .MuiMenuItem-root:hover": {
            backgroundColor: "white",
          },
        }}
        >
        {[5,10,15].map((option, index) => (
          <MenuItem value={perpage}  key={index}>
          {option/perpage}
          </MenuItem>
           ))}
        </Select>


        <Pagination
          component="div" 
          count={Math.ceil(service.length / perpage)}
          page={page}
          onChange={onChange}
          onPageChange={handleChangePage}
          shape="rounded"
          rowsPerPage={perpage}
          color="rgba(rgba(236, 237, 241, 1)"
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </div>
    </div>
  );
}
