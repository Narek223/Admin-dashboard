import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styles from "./pagination.module.scss";

export default function PaginationComponent({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}) {
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage - 1);
  };

  const handleItemsPerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value, 10);
    onItemsPerPageChange(newPerPage);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.stack}>


    
      <Stack spacing={3} direction="row" alignItems="center"   className={styles.stack}   >
        <div className={styles.perpages}>
          <p>Results per page</p>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#F8F9FA",
                  borderRadius: "8px", 
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#FFFFFF",
                    border:'none',
                  },  
                },
              },
            }}
            sx={{
              height: "38px",
              backgroundColor: "transparent",
              borderRadius: "8px",
            }}
          >
            {[5, 10,15].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
<div>
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage+1}
 
          onChange={handlePageChange}
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              backgroundColor: "#transparent",
              display:'flex',
              "&:hover": {
                backgroundColor: "#DADCE0",
              },
              "&.Mui-selected": {
                backgroundColor: "#DADCE0",
                color: "#000000",
              },
            },
          }}
        />
        </div>
      </Stack>
      </div>
    </div>
  );
}
