import { Box, Button, Container, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue, purple, red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import React, { ChangeEvent, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { LevelModel } from '../../models/LevelModel';
import { QuestionsInterface } from '../../interfaces/QuestionsInterface';
import './LevelPage.scss';

interface RouteParams {
  id: string;
}

interface Answers {
  [key: string]: number;
}

const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    width: 150,
    height: 150,
    marginBottom: 100,
    background: blue[200],
    border: 0,
    borderRadius: 20,
    boxShadow: '0 2px 7px 5px #7e57c2',
    color: purple[700],
    fontSize: 55,
  },
  score: {
    width: '100%',
    margin: 20,
  },
  input: {
    width: 250,
    height: 165,
    paddingLeft: 60,
    color: purple[700],
    fontSize: 50,
  },
  error: {
    color: red[700],
    fontSize: 35,
  },
  success: {
    color: blue[700],
    fontSize: 35,
  },
  button: {
    width: '100%',
    height: 170,
    margin: 20,
  },
  link: {
    textDecoration: 'none',
  },
}));

export const LevelPage: React.FC = () => {
  const classes = useStyles();
  const params = useParams<RouteParams>();

  const [isCheck, setCheckMode] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [score, setScore] = useState<number>(0);
  const [levelQuestions, getLevelQuestions] = useState<QuestionsInterface[]>(
    new LevelModel(Number(params.id)).getCurrentLevelLogic(),
  );

  const getNewLevelQuestion = (): void => {
    getLevelQuestions(new LevelModel(Number(params.id)).getCurrentLevelLogic());
    setCheckMode(false);
    setScore(0);
  };

  const correctAnswers: Answers = levelQuestions.reduce((acc, question, index) => {
    return { ...acc, [`question${index}`]: question.correctAnswer };
  }, {});

  const checkAnswers = (): void => {
    Object.keys(correctAnswers).forEach((questionNumber) => {
      if (correctAnswers[questionNumber] === answers[questionNumber]) {
        setScore((prevScore) => prevScore + 1);
      }
    });
    setCheckMode(true);
  };

  const onEnterAnswer = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    event.persist();

    setAnswers((prevAnswers) => {
      return { ...prevAnswers, [event.target.name]: Number(event.target.value) };
    });
  };

  const questionsView = levelQuestions.map((question: QuestionsInterface, index) => {
    return (
      <Container className="container" key={question.id}>
        <Box className={classes.wrap}>
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
          <Input
            className={classes.input}
            type="number"
            name={`question${index}`}
            placeholder="Answer"
            readOnly={isCheck}
            onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
              onEnterAnswer(event);
            }}
          />
        </Box>
        {isCheck ? (
          <Box className="current-result" textAlign="center">
            {answers[`question${index}`] === correctAnswers[`question${index}`] ? (
              <p className={classes.success}>Good job!</p>
            ) : (
              <p className={classes.error}>
                {`Sorry, the correct answer is ${correctAnswers[`question${index}`]}`}
              </p>
            )}
          </Box>
        ) : null}
      </Container>
    );
  });

  return (
    <form>
      <Box>
        <Typography className="title" gutterBottom variant="h2" component="h2">
          LEVEL
          {params.id}
        </Typography>
        {questionsView}
        {!isCheck ? (
          <Button
            type="button"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={checkAnswers}
          >
            Check answers
          </Button>
        ) : (
          <Button
            type="button"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={getNewLevelQuestion}
          >
            Try again
          </Button>
        )}
        {isCheck ? (
          <Box className={`${classes.root} ${classes.score}`} textAlign="center" lineHeight={2.5}>
            Your score:
            {score}
          </Box>
        ) : null}

        <NavLink className={classes.link} to="/">
          <Button className={classes.button} variant="contained" color="primary">
            Beck to levels
          </Button>
        </NavLink>
      </Box>
    </form>
  );
};
