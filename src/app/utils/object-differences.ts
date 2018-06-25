'use strict';

import * as _ from 'lodash';

export function objectDifferences(a, b) {
  return _.reduce(a, (result, value, key) => {
    return _.isEqual(value, b[key]) ?
      result : result.concat(key);
  }, []);
}
