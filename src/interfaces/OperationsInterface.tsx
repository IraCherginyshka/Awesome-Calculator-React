import { OperatorsEnum } from '../enums/operatorsEnum';

export interface OperationsInterface {
  [OperatorsEnum.SUBTRACTION](a: number, b: number): number;
  [OperatorsEnum.ADDITION](a: number, b: number): number;
  [OperatorsEnum.MULTIPLICATION](a: number, b: number): number;
  [OperatorsEnum.DIVISION](a: number, b: number): number;
}
