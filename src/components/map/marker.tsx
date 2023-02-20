import { useEffect, useRef } from "react";

export default (options: any) => {
  const defaultOptions = {
    icon: {
      url: "/static/images/marker.svg",
      size: new (window as any).google.maps.Size(20, 32),
    },
  };

  const marker = useRef<any | null>(null);

  useEffect(() => {
    if (!marker.current && options.map) {
      marker.current = new (window as any).google.maps.Marker({
        ...defaultOptions,
        ...options,
      });
    }

    // remove marker from map on unmount
    return () => {
      if (marker.current) {
        marker.current.setMap(null);
      }
    };
  }, [options.map]);

  useEffect(() => {
    if (marker.current && options.map) {
      marker.current.setOptions({
        ...defaultOptions,
        ...options,
      });
    }
  }, [
    options.map,
    options.map.zoom,
    options.position.lat,
    options.position.lng,
  ]);

  return <></>;
};
