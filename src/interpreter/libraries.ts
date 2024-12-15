import { resolve } from "path";
import piplite from "@jupyterlite/pyodide-kernel/pypi/piplite-0.4.5-py3-none-any.whl";
import ipykernel from "@jupyterlite/pyodide-kernel/pypi/ipykernel-6.9.2-py3-none-any.whl";
import pyodidekernel from "@jupyterlite/pyodide-kernel/pypi/pyodide_kernel-0.4.5-py3-none-any.whl";
import comm from "../pypi/comm-0.2.2-py3-none-any.whl";

export const packages = [
  "micropip",
  resolve(import.meta.dirname, comm),
  resolve(import.meta.dirname, piplite),
  resolve(import.meta.dirname, ipykernel),
  resolve(import.meta.dirname, pyodidekernel),
  "ipython",
];
