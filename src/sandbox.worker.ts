import { expose } from "comlink";
import { parentPort, workerData } from "worker_threads";
import { Interpreter } from "./interpreter";
import { nodeAdapter } from "./node-adapter";

export type SandboxWorkerOptions = Exclude<
  Parameters<typeof Interpreter.create>[0],
  "interceptor" | "sdtout" | "sdterr" | "stdin"
> & {
  commands?: Array<string>;
};

if (!parentPort) {
  throw new Error("parentPort is null");
}

export class SandboxWorker {
  protected interpreter!: Interpreter;

  public ready: Promise<void>;

  constructor(options: SandboxWorkerOptions) {
    this.ready = this.init(options);
  }

  public execute(code: string) {
    return this.interpreter.execute(code);
  }

  protected async init({ commands, ...options }: SandboxWorkerOptions = {}) {
    this.interpreter = await Interpreter.create({
      ...options,
      async interceptor(pyodide) {
        if (commands) {
          await Promise.all(
            commands.map((command) => pyodide.runPythonAsync(command)),
          );
        }
      },
    });
  }

  terminate() {
    process.exit();
  }
}

expose(new SandboxWorker(workerData), nodeAdapter(parentPort!));
