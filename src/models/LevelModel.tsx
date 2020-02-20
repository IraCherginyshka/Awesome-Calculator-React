import {
  GAME_LEVEL_SETTINGS,
  LEVEL_WITH_NEGATIVE_NUMBER,
  MAX_DENOMINATOR_AND_MULTIPLIER_FIRST,
  MAX_DENOMINATOR_AND_MULTIPLIER_SECOND,
  MAX_DENOMINATOR_AND_MULTIPLIER_THIRD,
  MAX_QUANTITY_QUESTIONS,
} from '../constants/gameConstants';
import { QuestionsInterface } from '../interfaces/QuestionsInterface';
import { OperatorsEnum } from '../enums/operatorsEnum';

export class LevelModel {
  level: number;
  operatorSign: string;

  constructor(levelNumber: number) {
    this.level = levelNumber;
    this.operatorSign = '';
  }

  static generateRandomNumber(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  public getCorrectAnswer(firstNumber: number, operator: number, secondNumber: number): number {
    switch (operator) {
      case 0:
        this.operatorSign = OperatorsEnum.MINUS;
        return firstNumber - secondNumber;
      case 1:
        this.operatorSign = OperatorsEnum.PLUS;
        return firstNumber + secondNumber;
      case 2:
        this.operatorSign = OperatorsEnum.MULTIPLICATION;
        return firstNumber * secondNumber;
      case 3:
        this.operatorSign = OperatorsEnum.DIVISION;
        return firstNumber / secondNumber;
      default:
        return 0;
    }
  }

  public getCurrentLevelQuestion(level: number): QuestionsInterface {
    const { maxOperatorIndex, maxNumber, maxSecondNumber } = GAME_LEVEL_SETTINGS[level - 1];
    const operator = LevelModel.generateRandomNumber(maxOperatorIndex);
    let firstNumber = LevelModel.generateRandomNumber(maxNumber);
    let secondNumber: number;
    let denominatorAndMultiplier: number;

    if (operator > 1) {
      denominatorAndMultiplier =
        // eslint-disable-next-line no-nested-ternary
        level < 8
          ? MAX_DENOMINATOR_AND_MULTIPLIER_FIRST
          : level < 10
          ? MAX_DENOMINATOR_AND_MULTIPLIER_SECOND
          : MAX_DENOMINATOR_AND_MULTIPLIER_THIRD;
      secondNumber = LevelModel.generateRandomNumber(denominatorAndMultiplier) || 2;
    } else {
      secondNumber = LevelModel.generateRandomNumber(maxSecondNumber);
    }

    if (operator === 3) {
      firstNumber -= firstNumber % secondNumber;
    }

    if (!operator && level < LEVEL_WITH_NEGATIVE_NUMBER && firstNumber < secondNumber) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }

    const correctAnswer = this.getCorrectAnswer(firstNumber, operator, secondNumber);

    return {
      id: level,
      firstNumber,
      operator: this.operatorSign,
      secondNumber,
      correctAnswer,
    };
  }

  public getCurrentLevelLogic(): QuestionsInterface[] {
    return [...Array(MAX_QUANTITY_QUESTIONS)].map(() => this.getCurrentLevelQuestion(this.level));
  }
}
