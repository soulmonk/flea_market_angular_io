export interface ITodo {
  _id: string;
  name: string;
  done: boolean;
}

export interface IUpdatePayload {
  done: boolean;
}

export interface IUpdateTodo {
  id: string;
  data: IUpdatePayload;
}

export class Todo implements ITodo {
  // TODO update response from server
  // tslint:disable-next-line:variable-name
  _id;
  public done = false;

  constructor(public name: string) {
  }
}
