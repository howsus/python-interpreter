import { PyProxy } from "pyodide/ffi";

export interface PyProxyResponse<T = unknown> extends PyProxy {
  toJs(options?: Parameters<PyProxy["toJs"]>[0]): T;
}

export interface PyProxyInstance extends PyProxy {
  copy(): this;
}

export interface LiteStream extends PyProxyInstance {
  publish_stream_callback(name: string, text: string): void;
}

export interface DisplayPub extends PyProxyInstance {
  clear_output_callback(wait: boolean): void;
  update_display_data_callback(
    data: PyProxyResponse<Record<string, string>>,
    metadata: PyProxyResponse<Record<string, string>>,
  ): void;
  display_data_callback(
    data: PyProxyResponse<Record<string, string>>,
    metadata: PyProxyResponse<Record<string, string>>,
  ): void;
}

export interface DisplayHook extends PyProxyInstance {
  publish_execution_result(
    count: number,
    data: PyProxyResponse<Record<string, string>>,
    metadata: PyProxyResponse<Record<string, string>>,
  ): void;
}

export interface Interpreter extends PyProxyInstance {
  display_pub: DisplayPub;
  displayhook: DisplayHook;
}

export interface KernelInstance extends PyProxyInstance {
  interpreter: Interpreter;

  run(code: string): Promise<
    PyProxyResponse<
      | {
          status: "ok";
          payload?: Array<string>;
        }
      | {
          status: "error";
          ename: string;
          evalue: string;
          traceback: Array<string>;
        }
    >
  >;
}

export interface PyodideKernel extends PyProxyInstance {
  kernel_instance: KernelInstance;

  interpreter: Interpreter;

  stdout_stream: LiteStream;

  stderr_stream: LiteStream;
}
