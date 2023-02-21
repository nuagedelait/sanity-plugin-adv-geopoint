import React, { EffectCallback } from "react";
import { deepEqual } from "fast-equals";

export function useDeepCompareMemoize(value: any): any {
  const ref = React.useRef();

  if (!deepEqual(value, ref.current)) {
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
