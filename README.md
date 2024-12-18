# python-interpreter

`python-interpreter` executes Python code via [Pyodide](https://pyodide.org) and the [JupyterLite kernel](https://jupyterlite.readthedocs.io).
This library is a **proof of concept** and is **not intended for production use**.

For production environments, consider using robust solutions like [Riza](https://riza.io) or [E2B](https://e2b.dev).

## Installation

Install the library using npm:

```bash
npm install python-interpreter pyodide
```

## Usage

Here's a basic example of how to use `python-interpreter`:

```javascript
import { Sandbox } from "python-interpreter";

(async () => {
  const sandbox = await Sandbox.create();

  const execution = await sandbox.execute(`print("hello world")`);

  console.log("Output:", execution);
})();
```
