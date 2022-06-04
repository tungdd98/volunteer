import { get } from "lodash";

export function deepParseJson<T extends unknown>(jsonString: T): T {
  // if not stringified json rather a simple string value then JSON.parse will throw error
  // otherwise continue recursion
  if (typeof jsonString === "string") {
    if (!Number.isNaN(Number(jsonString))) {
      // if a numeric string is received, return itself
      // otherwise JSON.parse will convert it to a number
      return jsonString as T;
    }
    try {
      return deepParseJson(JSON.parse(jsonString));
    } catch (err) {
      return jsonString as T;
    }
  }
  if (Array.isArray(jsonString)) {
    // if an array is received, map over the array and deepParse each value
    return (jsonString as Array<unknown>).map((val: unknown) =>
      deepParseJson(val)
    ) as T;
  }
  if (typeof jsonString === "object" && jsonString !== null) {
    // if an object is received then deepParse each element in the object
    // typeof null returns 'object' too, so we have to eliminate that

    const obj: Record<string, unknown> = {};
    Object.keys(jsonString as Record<string, unknown>).forEach(key => {
      obj[key] = deepParseJson(get(jsonString, key) as T);
      return obj;
    }, {});
    return obj as T;
  }
  // otherwise return whatever was received
  return jsonString;
}
