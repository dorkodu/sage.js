/**
 * 
 * @typedef {"cache-first" | "cache-only" | "network-only"} FetchPolicy 
 */

/**
 * 
 * @param {object} options 
 * @param {string} options.url
 * @param {FetchPolicy} [options.fetchPolicy]
 */
export function Sage(options) {
  const sageOptions = options;
  /** @type {Object<string, {arguments: any[], data: object}[]>} */
  const cache = {};

  /**
   * 
   * @param {string} queryName
   * @param {object} query 
   * @param {object} [options] 
   * @param {FetchPolicy} [options.fetchPolicy] 
   * @returns {Promise | any}
   */
  this.want = function (queryName, query, options) {
    const fetchPolicy = options && options.fetchPolicy || sageOptions.fetchPolicy;

    switch (fetchPolicy) {
      case "cache-first":
        const cachedQuery = checkCache(queryName, query);
        if (cachedQuery) return cachedQuery;
        else return fetchNetwork(queryName, query);
      case "cache-only":
        return checkCache(queryName, query);
      case "network-only":
        return fetchNetwork(queryName, query);
    }
  }

  function fetchNetwork(queryName, query) {
    return fetch(sageOptions.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    }).then(response => response.json())
  }

  function checkCache(queryName, query) {
    // If query name inside cache doesn't exist it hasn't been cached
    if (!cache[queryName]) return null;

    // Loop all previous caches with the same query name
    for (let cacheIndex = 0; cacheIndex < cache[queryName].length; ++cacheIndex) {
      let currentCache = cache[queryName][cacheIndex];

      // If argument count is not same, this is not what we want
      if (currentCache.arguments.length !== query.arguments.length) continue;

      // Loop all arguments, and if they all aren't equal, this is not our query's cache
      for (let argIndex = 0; argIndex < cache[queryName][i].length; ++argIndex) {
        if (currentCache.arguments[argIndex] !== query.arguments[argIndex]) { currentCache = null; break; }
      }

      // Cache of this query has been found, return the data
      if (currentCache) return currentCache.data;
    }
  }
}
