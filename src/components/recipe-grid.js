import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// Styled Paper component to represent your Tile
const Tile = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RecipeList = ({ recipes }) => {
  return (
    <Grid container spacing={2}>
      {recipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
          <Tile>
            <h3>{recipe.name}</h3>
            <img src={`http://localhost:8000/api/photos/${recipe.photoFilename}`} alt={recipe.name} />
            <p>{recipe.description}</p>
          </Tile>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
