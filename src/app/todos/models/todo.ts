export interface ITodo {
  _id: string;
  name: string;
  done: boolean;
}

export class Todo implements ITodo {
  // TODO update response from server
  // tslint:disable-next-line:variable-name
  _id;
  public done = false;

  constructor(public name: string) {}
}
