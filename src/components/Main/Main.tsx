import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { blue, purple } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { LevelInterface } from '../../interfaces/LevelsInterface';

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 200,
    margin: 10,
    background: blue[100],
    color: purple[800],
  },
  link: {
    textDecoration: 'none',
  },
});

const Main: React.FC = () => {
  const classes = useStyles();

  const levelDB: LevelInterface[] = [
    { levelNumber: 1, quantityQuestions: 10, isCompleted: true },
    { levelNumber: 2, quantityQuestions: 10, isCompleted: true },
    { levelNumber: 3, quantityQuestions: 10, isCompleted: false },
    { levelNumber: 4, quantityQuestions: 10, isCompleted: false },
    { levelNumber: 5, quantityQuestions: 10, isCompleted: false },
    { levelNumber: 6, quantityQuestions: 10, isCompleted: false },
    { levelNumber: 7, quantityQuestions: 10, isCompleted: false },
    { levelNumber: 8, quantityQuestions: 10, isCompleted: false },
    { levelNumber: 9, quantityQuestions: 10, isCompleted: false },
    { levelNumber: 10, quantityQuestions: 10, isCompleted: false },
  ];

  const [levelsList] = useState(levelDB);

  const levels = levelsList.map((level) => {
    return (
      <Card className={classes.root} key={level.levelNumber}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              LEVEL
              {level.levelNumber}
            </Typography>
            <Typography color="textSecondary" component="p">
              Questions:
              {level.quantityQuestions}
            </Typography>
            <Typography color="textSecondary" component="p">
              {level.isCompleted ? 'Completed' : 'Not Started'}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <NavLink className={classes.link} to={`/level/${level.levelNumber}`}>
            <Button variant="contained" color="primary">
              Start
            </Button>
          </NavLink>
        </CardActions>
      </Card>
    );
  });

  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      {levels}
    </Grid>
  );
};

export default Main;
