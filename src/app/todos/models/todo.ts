export interface ITodo {
  _id: string;
  name: string;
  done: boolean;
}

export class Todo implements ITodo {
  _id;
  public done = false;

  constructor(public name: string) {}
}
