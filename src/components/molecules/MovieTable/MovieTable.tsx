import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useMemo, useState } from "react";
import { Movie } from "../../../types/types";
import { MovieTableRow } from "../../atoms/MovieTableRow/MovieTableRow";

type MovieTableType = {
  movies: Movie[]
}

export const MovieTable = ({ movies }: MovieTableType) => {
  if (!movies.length) {
    return <p>No data to display</p>
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visiblemovies = useMemo(
    () =>
      [...movies]
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage],
  );


  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Film Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visiblemovies.map((movie: Movie) => (
              <MovieTableRow
                movie={movie}
              />
            ))}

          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}