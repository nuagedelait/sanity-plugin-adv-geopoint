import React, { useEffect, useState, useRef, cloneElement, forwardRef } from "react";
import { useDeepCompareEffectForMaps } from './helpers';


const MapComponent = (props) => {

    const {
        children,
        style,
        onIdle,
        onClick,
        onZoomChange,
        onCenterChange,
        onMapReady,
        ...options
    } = props

    const mapRef = useRef(null);
    const first = useRef(true)
    const [map, setMap] = useState(null);


    useEffect(() => {
        if (mapRef.current && !map) {
            const googleMap = new window.google.maps.Map(mapRef.current, {});
            setMap( googleMap);
        }
    }, [mapRef.current, map]);

    useEffect(() => {
        if (map) {
            google.maps.event.addListenerOnce(map, 'idle', function(){   onMapReady(map);}); 
            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", e => {
                    
                });
            }

            if (onZoomChange) {
                map.addListener("zoom_changed", (e) => {onZoomChange(map.zoom)},{
                    passive: true
                  });
            }

            if (onCenterChange) {
                map.addListener("dragend", (e) => {
                    const newCenter = map.getCenter()
                    onCenterChange({lat : newCenter.lat(),lng: newCenter.lng()})
                });
            }

            return () => {
                ["click", "idle", "zoom_changed","dragend"].forEach((eventName) =>
                    google.maps.event.clearListeners(map, eventName)
                );
            }
        }
    }, [map]);

    useEffect( () => {
        if (map) {
            map.setOptions(options);
        }
    },[map,options.zoom, options.center.lat,options.center.lng])

    

    const childs = props.children.length > 0 ? props.children.length : [props.children]

    return <div id="map" ref={mapRef} style={style}>
        {
            map && childs.map((child, index) => {
                return cloneElement(child, { key: index, map })
            })
        }
    </div>
}

export default MapComponent;