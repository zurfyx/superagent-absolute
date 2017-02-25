'use strict';

const OVERRIDE = 'delete,get,head,patch,post,put'.split(',');

module.exports = agent => baseUrl => (
  new Proxy(agent, {
    get(target, propertyName) {
      return (...params) => {
        if (OVERRIDE.indexOf(propertyName) !== -1 
            && params.length > 0 
            && typeof params[0] === 'string' 
            && params[0].startsWith('/')) {
          const absoluteUrl = baseUrl + params[0];
          return target[propertyName](absoluteUrl, ...params.slice(1));
        }
        return target[propertyName](...params);
      };
    },
  })
);