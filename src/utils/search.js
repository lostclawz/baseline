import memoize from 'lodash/memoize';


export const searchKeys = (obj, searchText) => {
   if (obj.searchSpace) {
      if (obj.searchSpace.indexOf(searchText) >= 0) {
         return true;
      }
   } else {
      return Object.values(obj)
         .some((k) => {
            const space = k.toString().toLowerCase();
            if (space.indexOf(searchText) >= 0) {
               return true;
            }
            return false;
         });
   }
   return false;
};

export const basicSearch = (items, searchText, key = 'searchSpace') => {
   if (!searchText) {
      return items;
   }
   const searchFor = searchText.toLowerCase();
   const results = [];
   const numItems = items.length;
   let i = 0;
   for (i; i < numItems; i++) {
      if (items[i][key].indexOf(searchFor) >= 0) {
         results.push(items[i]);
      }
   }
   return results;
};

export const searchCache = new Map();
memoize.cache = searchCache;
export const optSearch = () => {
   let lastResults; let lastSearchText; let
      results;
   let space;
   let numItems; let
      i;

   const searchFunc = memoize((searchText, items, key = 'searchSpace') => {
      if (!searchText) {
         lastSearchText = searchText;
         return items;
      }
      const searchFor = searchText.toLowerCase();
      space = lastSearchText && searchFor.indexOf(lastSearchText) >= 0
         ? lastResults
         : items;

      results = [];
      numItems = space.length;
      for (i = 0; i < numItems; i++) {
         if (space[i][key].indexOf(searchFor) >= 0) {
            results.push(space[i]);
         }
      }
      lastResults = results;
      lastSearchText = searchFor;

      return results;
   }, (searchText, items) => `${searchText} ${items.length}`);
   return searchFunc;
};

export const filterSearch = (items, searchText) => {
   const searchFor = searchText.toLowerCase();
   return !searchFor
      ? items
      : items.filter(i => searchKeys(i, searchFor));
};

/**
 * Returns a simple array of IDs
 * - no memoization
 * - keeps track of last results
 *
 * @param {string} searchText text to search for
 * @param {object} items each key represents an ID
 * @param {string} key object key to search
 */
export const quickSearch = () => {
   let space;
   let results;
   let lastResults;
   let lastSearchText;
   let i;
   return (searchText, items = {}, key = 'searchSpace') => {
      let searchFor;
      if (!searchText) {
         lastSearchText = searchText || '';
         results = Object.keys(items);
      } else {
         results = [];
         searchFor = searchText.toLowerCase();

         // if current search is in last search, use last results
         space = lastSearchText && searchFor.indexOf(lastSearchText) >= 0
            ? lastResults
            : Object.keys(items);

         // create array of results from space
         for (i = 0; i < space.length; i++) {
            if (items[space[i]][key].indexOf(searchFor) >= 0) {
               results.push(space[i]);
            }
         }
         lastResults = results;
         lastSearchText = searchFor;
      }
      return results;
   };
};
