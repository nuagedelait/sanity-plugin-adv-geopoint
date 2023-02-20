import React, { EffectCallback } from "react";
import { createCustomEqual } from "fast-equals";

/* eslint-disable */
export const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a, b) => {
    // TODO extend to other types
    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);


export function useDeepCompareMemoize(value: any): any {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

export function useDeepCompareEffectForMaps(
  callback: EffectCallback,
  dependencies: Array<any>
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
