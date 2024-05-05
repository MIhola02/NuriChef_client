import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function RecipeTile({ title, imageUrl, description, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/detail?id=${id}`);
  };

  const shortTitle = truncateText(title, 20);
  const shortDescription = truncateText(description, 60);

  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {shortTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RecipeTile;
