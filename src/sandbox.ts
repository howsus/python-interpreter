import { resolve } from "path";
import { Worker } from "worker_threads";
import { wrap, type Remote } from "comlink";
import { nodeAdapter } from "./node-adapter";
import { Execution, ExecutionError } from "./interpreter";
import type { SandboxWorker, SandboxWorkerOptions } from "./sandbox.worker";

export class Sandbox {
  constructor(protected interpreter: Remote<SandboxWorker>) {}

  async execute(code: string) {
    const execution = new Execution();

    const result = await this.interpreter.execute(code);

    execution.results = result.results;
    execution.stderr = result.stderr;
    execution.stdout = result.stdout;

    if (result.error) {
      execution.error = new ExecutionError(
        result.error.name,
        result.error.value,
        result.error.traceback,
      );
    }

    return execution;
  }

  terminate() {
    return this.interpreter.terminate();
  }

  static async create(options: SandboxWorkerOptions) {
    const worker = new Worker(resolve(__dirname, "./sandbox.worker"), {
      workerData: options,
    });

    const remote = wrap<SandboxWorker>(nodeAdapter(worker));

    await remote.ready;

    return new Sandbox(remote);
  }
}
