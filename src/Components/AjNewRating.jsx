import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import { useMediaQuery } from "@mui/material";

function AjNewRating({
  filterSelected,
  handleRatingSelect,
  handleRatingSelectsm,
}) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleCheckboxChange = (rating) => {
    setSelectedRatings([rating]);
    if (!isMobile) {
      handleRatingSelect(rating);
      filterSelected(rating);
    } else {
      handleRatingSelectsm(rating);
    }
  };

  return (
    <div>
      <Stack spacing={1}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <div key={rating} sx={{ display: "flex", justifyContent: "center" }}>
            <Checkbox
              checked={selectedRatings.includes(rating)}
              onChange={() => handleCheckboxChange(rating)}
            />
            <Rating
              name="size-small"
              defaultValue={rating}
              readOnly={true}
              size="small"
              style={{
                color: "rgba(0, 109, 51, 1)",
              }}
            />
          </div>
        ))}
      </Stack>
    </div>
  );
}

export default AjNewRating;
