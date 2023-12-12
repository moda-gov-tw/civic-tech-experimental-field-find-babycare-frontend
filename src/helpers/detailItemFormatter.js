export function displayFormatter(currentData, key) {
  const item = currentData?.[key];

  if (Array.isArray(item)) {
    if(key === 'identities') {
      return item.join(', ');
    }
    return item[0];
  }
  return item;
}
