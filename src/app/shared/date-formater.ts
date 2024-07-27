
export const formatDate = (date: Date): string =>  {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add 1 to month because getMonth() returns 0-based month
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }