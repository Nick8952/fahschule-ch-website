export function fmt(value: string, vars: Record<string, string | number>): string {
  return value.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}
