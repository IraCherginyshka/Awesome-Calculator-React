import uuid from 'uuid';

import {
  GAME_LEVEL_SETTINGS,
  LEVEL_WITH_NEGATIVE_NUMBER,
  MAX_DENOMINATOR_AND_MULTIPLIER_FIRST,
  MAX_DENOMINATOR_AND_MULTIPLIER_SECOND,
  MAX_DENOMINATOR_AND_MULTIPLIER_THIRD,
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
    const operatorIndex = generateRandomNumber(maxOperatorIndex);
    let firstNumber = generateRandomNumber(maxNumber);
    let secondNumber: number;
    let denominatorAndMultiplier: number;

    if (operatorIndex > 1) {
      denominatorAndMultiplier =
        // eslint-disable-next-line no-nested-ternary
        level < 8
          ? MAX_DENOMINATOR_AND_MULTIPLIER_FIRST
          : level < 10
          ? MAX_DENOMINATOR_AND_MULTIPLIER_SECOND
          : MAX_DENOMINATOR_AND_MULTIPLIER_THIRD;
      secondNumber = generateRandomNumber(denominatorAndMultiplier) || 2;
    } else {
      secondNumber = generateRandomNumber(maxSecondNumber);
    }

    if (operatorIndex === 3) {
      firstNumber -= firstNumber % secondNumber;
    }

    if (!operatorIndex && level < LEVEL_WITH_NEGATIVE_NUMBER && firstNumber < secondNumber) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }

    const correctAnswer = this.operations[this.operators[operatorIndex]](firstNumber, secondNumber);

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
