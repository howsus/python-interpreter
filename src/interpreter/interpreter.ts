import { loadPyodide, type PyodideInterface } from "pyodide";

import type * as Kernel from "./types";
import { packages } from "./libraries";
import { Execution } from "./execution";
import { ExecutionError } from "./execution-error";
import { formatResult } from "../utils/format-result";

type PyodideOptions = Parameters<typeof loadPyodide>[0] & {
  interceptor?(pyodide: PyodideInterface): Promise<void> | void;
};

export class Interpreter {
  protected kernel: Kernel.KernelInstance;

  protected stdout: Kernel.LiteStream;

  protected stderr: Kernel.LiteStream;

  protected interpreter: Kernel.Interpreter;

  constructor(protected pyodide: PyodideInterface) {
    const { globals } = pyodide;
    const namespace: Kernel.PyodideKernel = globals.get("pyodide_kernel");
    this.kernel = namespace.kernel_instance.copy();
    this.stdout = namespace.stdout_stream.copy();
    this.stderr = namespace.stderr_stream.copy();
    this.interpreter = this.kernel.interpreter.copy();
  }

  async execute(code: string): Promise<Execution> {
    const execution = new Execution();

    this.stdout.publish_stream_callback = (_, text) => {
      execution.stdout.push(text);
    };

    this.stderr.publish_stream_callback = (_, text) => {
      execution.stderr.push(text);
    };

    this.interpreter.display_pub.display_data_callback = (data) => {
      const output = formatResult(data);
      if (output) {
        execution.results.push(output);
      }
    };

    this.interpreter.displayhook.publish_execution_result = (_, data) => {
      const output = formatResult(data);
      if (output) {
        execution.results.push(output);
      }
    };

    const res = formatResult(await this.kernel.run(code));

    if (res && res.status === "error") {
      execution.error = new ExecutionError(
        res.ename,
        res.evalue,
        res.traceback,
      );
    }

    return execution;
  }

  static async create({ interceptor, ...options }: PyodideOptions = {}) {
    const pyodide = await loadPyodide(options);

    await pyodide.loadPackage([...packages, ...(options?.packages ?? [])]);

    await pyodide.runPythonAsync("import pyodide_kernel");

    if (interceptor) {
      await interceptor(pyodide);
    }

    return new Interpreter(pyodide);
  }
}
