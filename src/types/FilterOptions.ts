export type filterType =
  | 'filters'
  | 'include'
  | 'pageNumber'
  | 'pageSize'
  | 'includeTotal';

export type filterOptions = {
  [key in filterType]: string | number | boolean | null | undefined;
};
