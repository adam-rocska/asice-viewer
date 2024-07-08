export function format(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 B';
  // const k = 1024;
  const k = Math.pow(10, 3);
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}
