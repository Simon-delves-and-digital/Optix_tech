import { Box, Button, FormHelperText, TextField } from "@mui/material"
import { useState } from "react";
import { submitReview } from "../../../../API/api";
import './ReviewField.css';

type ReviewFieldType = {
  id: string,
}

export const ReviewField = ({ id }: ReviewFieldType) => {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [returnMessage, setReturnMessage] = useState("");

  const isSubmitDisabled = (): boolean => {
    return !review.length || formError || !!returnMessage || loading || apiError;
  }

  const updateImput = (newValue: string) => {
    setFormError(newValue.length > 100);
    setReview(newValue);
  }

  const submit = async () => {
    setLoading(true)

    const response = await submitReview();

    if (!response) {
      setApiError(true)
    }

    setReturnMessage(response);

    setLoading(false)
  }

  return (
    <div className="reviewField">
      <div className="reviewContainer">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="formContainer"
        >
          <div className="inputFieldContainer">
            <TextField
              id="review"
              label="Please leave a review"
              variant="filled"
              value={review}
              error={formError}
              disabled={!!returnMessage}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                updateImput(event.target.value);
              }}
              fullWidth
            />

          </div>

          {formError && <FormHelperText error id="error-text">Responses must be under 100 characters</FormHelperText>}

        </Box>

        <Button variant="contained" disabled={isSubmitDisabled()} onClick={submit}>Submit</Button>

      </div>

      <p>{returnMessage}</p>
      {apiError && <p className="errorText">Error submiting review, please try again later.</p>}
    </div>
  )
}