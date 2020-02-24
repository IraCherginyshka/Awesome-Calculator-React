import uuid from 'uuid';

import {
  DENOMINATOR_AND_MULTIPLIER_HARD,
  DENOMINATOR_AND_MULTIPLIER_LIGHT,
  DENOMINATOR_AND_MULTIPLIER_MEDIUM,
  GAME_LEVEL_SETTINGS,
  LEVEL_WITH_DENOMINATOR_AND_MULTIPLIER_HARD,
  LEVEL_WITH_DENOMINATOR_AND_MULTIPLIER_LIGHT,
  LEVEL_WITH_NEGATIVE_NUMBER,
  MAX_QUANTITY_QUESTIONS,
} from '../constants/gameConstants';
import { OperatorsEnum } from '../enums/operatorsEnum';
import { generateRandomNumber } from '../services/utils';
import { QuestionsInterface } from '../interfaces/QuestionsInterface';
import { OperationsInterface } from '../interfaces/OperationsInterface';

export class LevelModel {
  level: number;
  operatorSign: string;
  operators: OperatorsEnum[];
  operations: OperationsInterface;

  constructor(levelNumber: number) {
    this.level = levelNumber;
    this.operatorSign = '';
    this.operators = [
      OperatorsEnum.SUBTRACTION,
      OperatorsEnum.ADDITION,
      OperatorsEnum.MULTIPLICATION,
      OperatorsEnum.DIVISION,
    ];
    this.operations = {
      [OperatorsEnum.SUBTRACTION]: (a, b): number => a - b,
      [OperatorsEnum.ADDITION]: (a, b): number => a + b,
      [OperatorsEnum.MULTIPLICATION]: (a, b): number => a * b,
      [OperatorsEnum.DIVISION]: (a, b): number => a / b,
    };
  }

  public getCurrentLevelQuestion(level: number): QuestionsInterface {
    const { maxOperatorIndex, maxNumber, maxSecondNumber } = GAME_LEVEL_SETTINGS[level - 1];
    const operatorIndex = generateRandomNumber(0, maxOperatorIndex);
    let firstNumber = generateRandomNumber(0, maxNumber);
    let secondNumber: number;
    let denominatorAndMultiplier: number;
    const operator: OperatorsEnum = this.operators[operatorIndex];

    if (operator === OperatorsEnum.MULTIPLICATION || operator === OperatorsEnum.DIVISION) {
      denominatorAndMultiplier =
        // eslint-disable-next-line no-nested-ternary
        level < LEVEL_WITH_DENOMINATOR_AND_MULTIPLIER_LIGHT
          ? DENOMINATOR_AND_MULTIPLIER_LIGHT
          : level < LEVEL_WITH_DENOMINATOR_AND_MULTIPLIER_HARD
          ? DENOMINATOR_AND_MULTIPLIER_MEDIUM
          : DENOMINATOR_AND_MULTIPLIER_HARD;
      secondNumber = generateRandomNumber(1, denominatorAndMultiplier);

      if (operator === OperatorsEnum.DIVISION) {
        firstNumber -= firstNumber % secondNumber;
      }
    } else if (operator === OperatorsEnum.SUBTRACTION && level < LEVEL_WITH_NEGATIVE_NUMBER) {
      secondNumber = generateRandomNumber(0, firstNumber);
    } else {
      secondNumber = generateRandomNumber(0, maxSecondNumber);
    }

    const correctAnswer = this.operations[operator](firstNumber, secondNumber);

    return {
      id: uuid.v4(),
      firstNumber,
      operator: this.operators[operatorIndex],
      secondNumber,
      correctAnswer,
    };
  }

  public getCurrentLevelLogic(): QuestionsInterface[] {
    return [...Array(MAX_QUANTITY_QUESTIONS)].map(() => this.getCurrentLevelQuestion(this.level));
  }
}
