export enum ACTION {
  ADD = 1,
  EDIT = 2,
}

export interface Item {
  id: number;
  word: string;
  meaning: string;
  createdDate: Date;
  modifiedDate: Date;
}
