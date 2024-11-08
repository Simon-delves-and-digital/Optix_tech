import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";
import { Collapse, IconButton, TableCell, TableRow } from "@mui/material"
import { Fragment, useState } from "react";
import { Movie } from "../../../types/types"
import { ReviewField } from "../ReviewField/ReviewField";

type MovieTableRowType = {
  movie: Movie,
  getReviewsForMovie: (movie: Movie) => string,
  getCompaniesForMovie: (movie: Movie) => string,
}


export const MovieTableRow = (
  { movie,
    getReviewsForMovie,
    getCompaniesForMovie
  }: MovieTableRowType) => {
  const [expanded, setExpanded] = useState(false);


  return (
    <Fragment key={movie.id}>
      <TableRow
        key={movie.id}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ArrowCircleDown /> : <ArrowCircleUp />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {movie.title}
        </TableCell>
        <TableCell>{getReviewsForMovie(movie)}</TableCell>
        <TableCell>{getCompaniesForMovie(movie)}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <ReviewField id={movie.id} />
          </Collapse>
        </TableCell>
      </TableRow>

    </Fragment>
  )
}