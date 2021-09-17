/**
 * 
 * @typedef {"network-only" | "cache-only" | "network-or-cache" | "cache-then-network"} FetchPolicy 
 */

/**
 * 
 * @param {object} options 
 * @param {string} options.url
 * @param {FetchPolicy} [options.fetchPolicy]
 */
export function Sage(options) {
  const sageOptions = options;
  if (sageOptions.fetchPolicy === undefined) sageOptions.fetchPolicy = "network-or-cache";

  if (process.env.NODE_ENV === "development") {
    if (!(sageOptions.fetchPolicy === "network-only" ||
      sageOptions.fetchPolicy === "cache-only" ||
      sageOptions.fetchPolicy === "network-or-cache" ||
      sageOptions.fetchPolicy === "cache-then-network")) {
      throw new Error(`Fetch policy should be set to either
      network-only, cache-only, network-or-cache or cache-then-network.`);
    }
  }

  /** @type {Object<string, {data: any, errors: any}>} */
  const cache = {};

  /**
   * 
   * @param {string} queryName
   * @param {object} query 
   * @param {object} [options] 
   * @param {FetchPolicy} [options.fetchPolicy] 
   * @returns {Promise<{data: any, errors: any}>}
   */
  this.want = function (queryName, query, options) {
    const fetchPolicy = options && options.fetchPolicy || sageOptions.fetchPolicy;

    if (process.env.NODE_ENV === "development") {
      if (!(fetchPolicy === "network-only" ||
        fetchPolicy === "cache-only" ||
        fetchPolicy === "network-or-cache" ||
        fetchPolicy === "cache-then-network")) {
        throw new Error(`Fetch policy should be set to either
        network-only, cache-only, network-or-cache or cache-then-network.`);
      }
    }

    switch (fetchPolicy) {
      case "network-only":
        return fetchNetwork(queryName, query);
      case "cache-only":
        return checkCache(queryName);
      case "network-or-cache":
        return fetchNetwork(queryName, query).catch(() => checkCache(queryName));
      case "cache-then-network":
        return { cache: checkCache(queryName), promise: fetchNetwork(queryName, queryName) }
    }
  }

  function fetchNetwork(queryName, query) {
    return new Promise((resolve, reject) => {
      fetch(sageOptions.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [queryName]: query })
      }).then((response) => {
        if (response.ok) {
          response = response.json();
          cache[queryName] = response;
          resolve(response);
        }
        else {
          reject();
        }
      })
    })
  }

  function checkCache(queryName) {
    return cache[queryName];
  }
}
