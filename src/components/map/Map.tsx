import React, { useEffect, useState, useRef, cloneElement } from "react";

/* eslint-disable */
const MapComponent = (props: any) => {
  const {
    children,
    style,
    onIdle,
    onClick,
    onZoomChange,
    onCenterChange,
    onMapReady,
    ...options
  } = props;

  const mapRef = useRef(null);
  const first = useRef(true);
  const [map, setMap] = useState<any | null>(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const googleMap = new (window as any).google.maps.Map(mapRef.current, {});
      setMap(googleMap);
    }
  }, [mapRef.current, map]);

  useEffect(() => {
    if (map) {
      (window as any).google.maps.event.addListenerOnce(
        map,
        "idle",
        function () {
          onMapReady(map);
        }
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", (e: Event) => {
          console.log(e);
        });
      }

      if (onZoomChange) {
        map.addListener(
          "zoom_changed",
          (e: Event) => {
            onZoomChange(map.zoom);
          },
          {
            passive: true,
          }
        );
      }

      if (onCenterChange) {
        map.addListener("dragend", (e: Event) => {
          const newCenter = map.getCenter();
          onCenterChange({ lat: newCenter.lat(), lng: newCenter.lng() });
        });
      }

      return () => {
        ["click", "idle", "zoom_changed", "dragend"].forEach((eventName) =>
          (window as any).google.maps.event.clearListeners(map, eventName)
        );
      };
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options.zoom, options.center.lat, options.center.lng]);

  const childs =
    props.children.length > 0 ? props.children.length : [props.children];

  return (
    <div id="map" ref={mapRef} style={style}>
      {map &&
        childs.map((child: any, index: number) => {
          return cloneElement(child, { key: index, map });
        })}
    </div>
  );
};

export default MapComponent;
