import memoize from 'lodash/memoize';


export const searchKeys = (obj, searchText) => {
   if (obj.searchSpace) {
      if (obj.searchSpace.indexOf(searchText) >= 0) {
         return true;
      }
   }
   else {
      for (let k in obj) {
         let space = obj[k].toString().toLowerCase();
         if (space.indexOf(searchText) >= 0) {
            return true;
         }
      }
   }
   return false;
}

export const basicSearch = (items, searchText, key="searchSpace") => {
   if (!searchText){
      return items;
   }
   searchText = searchText.toLowerCase();
   let results = [];
   let numItems = items.length;
   let i = 0;
   for (i; i < numItems; i++){
      if (items[i][key].indexOf(searchText) >= 0){
         results.push(items[i]);
      }
   }
   return results;
}

export const searchCache = new Map();
memoize.cache = searchCache;
export const optSearch = () => {
   var lastResults, lastSearchText, results;
   var space;
   var numItems, i;

   const searchFunc = memoize(function(searchText, items, key = "searchSpace") {
      if (!searchText) {
         lastSearchText = searchText;
         return items;
      }
      searchText = searchText.toLowerCase();
      space = lastSearchText && searchText.indexOf(lastSearchText) >= 0
         ? lastResults
         : items;

      results = [];
      numItems = space.length;
      for (i = 0; i < numItems; i++) {
         if (space[i][key].indexOf(searchText) >= 0) {
            results.push(space[i]);
         }
      }
      lastResults = results;
      lastSearchText = searchText;

      return results;
   }, (searchText, items) => `${searchText} ${items.length}`);
   return searchFunc;
}

export const filterSearch = (items, searchText, key="searchSpace") => {
   searchText = searchText.toLowerCase();
   return !searchText
      ? items
      : items.filter(i => searchKeys(i, searchText));
}

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
   var space, results, lastResults, lastSearchText, i;
   return function (searchText="", items={}, key="searchSpace") {
      if (!searchText) {
         lastSearchText = searchText;
         results = Object.keys(items);
      }
      else{
         results = [];
         searchText = searchText.toLowerCase();

         // if current search is in last search, use last results
         space = lastSearchText && searchText.indexOf(lastSearchText) >= 0
            ? lastResults
            : Object.keys(items);
         
         // create array of results from space
         for (i = 0; i < space.length; i++){
            if (items[space[i]][key].indexOf(searchText) >= 0){
               results.push(space[i]);
            }
         }
         lastResults = results;
         lastSearchText = searchText;
      }      
      return results;
   }
}