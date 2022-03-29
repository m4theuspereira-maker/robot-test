export function handlerCLIException(ex: any): boolean {
  console.error(ex.message);
  return false;
}
