import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useMemo, useState } from "react";
import { Movie } from "../../../types/types";
import { MovieTableRow } from "../../atoms/MovieTableRow/MovieTableRow";
import './MovieTable.css';

type MovieTableType = {
  movies: Movie[]
}
type Order = 'asc' | 'desc';

const comparator = (a: Movie, b: Movie) => {
  if (b.averageReview < a.averageReview) {
    return -1;
  }
  if (b.averageReview > a.averageReview) {
    return 1;
  }
  return 0;
}

const getComparitor = (order: Order) => {
  return order === 'desc'
    ? (a: Movie, b: Movie) => comparator(a, b)
    : (a: Movie, b: Movie) => -comparator(a, b);

}

export const MovieTable = ({ movies }: MovieTableType) => {
  if (!movies.length) {
    return <p data-testid="noDataText">No data to display</p>
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [order, setOrder] = useState<Order>("desc");
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortClick = () => {
    setOrder(order === 'desc' ? "asc" : "desc")
  }

  const visiblemovies = useMemo(
    () =>
      [...movies]
        .sort(getComparitor(order))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, order],
  );


  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="movie table" data-testid="movieTable">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>
                <div className="headerCell ">
                  Review
                  {order === "asc" ?
                    <ArrowCircleDown onClick={handleSortClick} className="headerIcon" /> :
                    <ArrowCircleUp onClick={handleSortClick} className="headerIcon" />}

                </div>
              </TableCell>
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
          data-testid="movieTablePagination"
        />
      </TableContainer>
    </div>
  );
}