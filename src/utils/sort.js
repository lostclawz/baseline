const { compare } = new Intl.Collator('en', {
   sensitivity: 'base',
   ignorePunctuation: true,
   numeric: true,
});

export const alphaSort = (sortKey, a, b) => compare(a[sortKey], b[sortKey]);


export function columnSorter(items, { columns, sortAsc, sortKey }) {
   if (!columns) {
      return items;
   }
   const colData = columns.find(
      c => c.key === sortKey,
   );
   const sortFunc = colData && typeof colData.sorter === 'function'
      ? colData.sorter : alphaSort.bind(null, sortKey);
   return items.sort((a, b) => {
      let sorted = sortFunc(a, b);
      if (!sortAsc) {
         sorted *= -1;
      }
      if (colData.invertSort) {
         sorted *= -1;
      }
      return sorted;
   });
}
