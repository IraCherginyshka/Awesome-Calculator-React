import { Box, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue, purple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { LevelModel } from '../../models/LevelModel';
import { QuestionsInterface } from '../../interfaces/QuestionsInterface';

interface RouteParams {
  id: string;
}

const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  root: {
    width: 150,
    height: 150,
    margin: 20,
    background: blue[200],
    border: 0,
    borderRadius: 20,
    boxShadow: '0 2px 7px 5px #7e57c2',
    color: purple[700],
    fontSize: 55,
  },
  button: {
    width: '100%',
    height: 50,
    margin: 20,
  },
}));

export const LevelPage: React.FC = () => {
  const classes = useStyles();
  const params = useParams<RouteParams>();

  const [isNotCompleted] = useState<boolean>(true);

  const levelQuestions = new LevelModel(Number(params.id)).getCurrentLevelLogic();

  const questionsView = levelQuestions.map((question: QuestionsInterface) => {
    return (
      <Box className={classes.wrap} key={question.id}>
        <Box className={classes.root} textAlign="center" lineHeight={2.5}>
          {question.firstNumber}
        </Box>
        <Box className={classes.root} textAlign="center" lineHeight={2.5}>
          {question.operator}
        </Box>
        <Box className={classes.root} textAlign="center" lineHeight={2.5}>
          {question.secondNumber}
        </Box>
        <Box className={classes.root} textAlign="center" lineHeight={2.5}>
          =
        </Box>
        <Box className={classes.root} textAlign="center" lineHeight={2.5}>
          {question.correctAnswer}
        </Box>
      </Box>
    );
  });

  return (
    <Container>
      <Typography className="title" gutterBottom variant="h2" component="h2">
        LEVEL
        {params.id}
      </Typography>
      {questionsView}
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disabled={isNotCompleted}
      >
        Check answers
      </Button>
    </Container>
  );
};
