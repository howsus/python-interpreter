import { ExecutionError } from "./execution-error";

export class Execution {
  public stdout: Array<string> = [];

  public stderr: Array<string> = [];

  public results: Array<Record<string, string>> = [];

  public error?: ExecutionError = undefined;

  get text() {
    return this.results.at(-1)?.["text/plain"];
  }
}
