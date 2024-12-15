export class ExecutionError {
  constructor(
    public name: string,
    public value: string,
    public traceback: Array<string>,
  ) {}
}
