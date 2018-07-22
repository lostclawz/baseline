export function makeRequest({base, port}, url) {
   return new Promise((resolve, reject) => {
      /*
         method: 'post',
         credentials: "same-origin",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            action, ...data
         })
      */
      fetch(`${base}:${port}${url}`)
         .then(response => {
            if (response.ok) {
               resolve(response.json());
            }
            else {
               reject(response.status);
            }
         })
         .catch(e => {
            console.warn("Couldn't complete fetch request", e);
            reject(e);
         })
   })
}

export function queryString(queryObj) {
   let out = [];
   for (let key in queryObj) {
      let val = encodeURIComponent(
         queryObj[key] || ''
      );
      out.push(
         typeof queryObj[key] === 'undefined'
         ? key
         : `${key}=${val}`
      )
   }
   return `?${out.join('&')}`;
}