/**
 * 
 * @param {object} options 
 * @param {string} options.url
 * @param {"cache-first" | "cache-only" | "cache-and-network" | "network-only"} [options.fetchPolicy]
 */
export function Sage(options) {
  const sageOptions = options;
  const cache = {};

  /**
   * 
   * @param {string} queryName
   * @param {object} query 
   * @param {object} [options] 
   */
  this.want = function (queryName, query, options) {
    return fetch(sageOptions.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    }).then(response => response.json())
  }
}