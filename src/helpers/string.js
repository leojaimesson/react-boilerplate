export function toUpperSnakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}
