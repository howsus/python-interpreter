export function mapToObject(obj: any) {
  const out: any = obj instanceof Array ? [] : {};

  obj.forEach((value: any, key: string) => {
    out[key] =
      value instanceof Map || value instanceof Array
        ? mapToObject(value)
        : value;
  });

  return out;
}
