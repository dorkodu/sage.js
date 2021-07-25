/**
 * 
 * @param {object} options 
 * @param {string} options.url
 * @param {string} [options.fetchPolicy]
 */
export function Sage(options) {
  const sageOptions = options;

  /**
   * 
   * @param {object} query 
   * @param {object} [options] 
   */
  this.want = function (query, options) {
    return fetch(sageOptions.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    }).then(response => response.json())
  }
}