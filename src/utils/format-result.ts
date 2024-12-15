import { PyProxyResponse } from "../interpreter/types";
import { mapToObject } from "./map-to-object";

export function formatResult<R extends PyProxyResponse<unknown>>(
  result: R,
): R extends PyProxyResponse<infer T> ? T | undefined : undefined {
  if (!result) {
    return undefined as R extends PyProxyResponse<infer T>
      ? T | undefined
      : undefined;
  }
  const m = result.toJs();
  const results = mapToObject(m);
  return results;
}
