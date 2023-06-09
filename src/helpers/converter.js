export function formatBytes(bytes) {
  if (bytes < 1024) {
    return bytes + " KB";
  } else if (bytes < 1024 * 1000) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }
}