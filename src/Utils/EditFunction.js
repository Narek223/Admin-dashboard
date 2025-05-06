export function manageItems(list, item, isEdit = false) {
  if (isEdit) {
    return list.map((existingItem) =>
      existingItem.id === item.id ? item : existingItem
    );
  } else {
    return [...list, { ...item, id: list.length + 1 }];
  }
}
