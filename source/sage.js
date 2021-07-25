/**
 * 
 * @typedef {"cache-first" | "cache-only" | "cache-and-network" | "network-only"} FetchPolicy 
 */

/**
 * 
 * @param {object} options 
 * @param {string} options.url
 * @param {FetchPolicy} [options.fetchPolicy]
 */
export function Sage(options) {
  const sageOptions = options;
  const cache = {};

  /**
   * 
   * @param {string} queryName
   * @param {object} query 
   * @param {object} [options] 
   * @param {FetchPolicy} [options.fetchPolicy] 
   */
  this.want = function (queryName, query, options) {
    return fetch(sageOptions.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    }).then(response => response.json())
  }

  function checkCache(params) {

  }
}