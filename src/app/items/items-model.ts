export enum ACTION {
  VIEW = 0,
  ADD = 1,
  EDIT = 2,
}

export interface Item {
  id: number;
  word: string;
  createdDate: Date;
  modifiedDate: Date;
}
