import React from 'react';
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

export const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {yarn 
    // TODO extend to other types
    // use fast-equals for other objects
    return deepEqual(a, b);
});

export function useDeepCompareMemoize(value) {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }
    return ref.current;
}

export function useDeepCompareEffectForMaps(callback, dependencies) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}