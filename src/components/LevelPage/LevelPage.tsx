import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue, purple } from '@material-ui/core/colors';
import React from 'react';
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
}));

export const LevelPage: React.FC = () => {
  const classes = useStyles();
  const params = useParams<RouteParams>();

  const levelQuestions = new LevelModel(Number(params.id)).getCurrentLevelLogic();

  const questions = levelQuestions.map((question: QuestionsInterface) => {
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

  return <div>{questions}</div>;
};
