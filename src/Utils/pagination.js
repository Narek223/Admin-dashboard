export function paginate(list, page, itemsPerPage) {
    const start = page * itemsPerPage;
    return list.slice(start, start + itemsPerPage);
  }