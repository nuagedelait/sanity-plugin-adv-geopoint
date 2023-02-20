/* eslint-disable */

import { useState, forwardRef, useRef } from "react";

import { Card, Button, Inline, useToast } from "@sanity/ui";
import { set, unset, FieldPresence } from "sanity";

import Wrapper from "./map/mapWrapper";
import Map from "./map/Map";
import Marker from "./map/marker";
import Searchbox from "./map/searchbox";

import { useGoogleFields, useAddressFields } from "./map/hooks/useFields";
import useAddressCreation from "./map/hooks/useAddressCreation";

type statut = "error" | "warning" | "success" | "info" | undefined;

const config = {
  apikey: "",
};

const MapPicker = (props: any) => {
  const {
    elementProps: { id, onBlur, onFocus, placeholder, readOnly },
    onChange,
    schemaType,
    validation,
    value = "",
  } = props;

  const defaultGeoloc = { lat: -25.363, lng: 131.044, alt: 0 };

  const defaultValue = {
    address: props.value.address ? props.value.address : {},
    geoloc: props.value.geoloc ? props.value.geoloc : defaultGeoloc,
    mapConfig: props.value.mapConfig
      ? props.value.mapConfig
      : {
          zoom: 7,
          center: props.value.geoloc ? props.value.geoloc : defaultGeoloc,
        },
  };
  if (!defaultValue.mapConfig.zoom) {
    defaultValue.mapConfig.zoom = 7;
  }

  const toast = useToast();
  const googleFields = useGoogleFields(schemaType);
  const [map, setMap] = useState(null);

  const onMapReady = (googleMap: any) => {
    setMap(googleMap);
  };

  const handleMapClicked = (event: any) => {
    /*
        setValue((currentValue) => {
            const newValue = {
                ...currentValue,
                geoloc: {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    alt: 0
                }
            };
            onChange(PatchEvent.from(set(newValue)))
            return newValue;
        })
        */
  };

  const handlePlaceSelected = (place: any) => {
    const address = useAddressFields(googleFields, place);

    /*
        setValue((currentValue) => {
            const newValue = {
                ...currentValue,
                address:address,
                geoloc: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    alt: 0
                }
            }
    
            if(map && map.zoom){
                newValue.mapConfig ={
                    zoom: map.zoom,
                    center : place.geometry.location
                }
            }
            onChange(PatchEvent.from(set(newValue)))
            return newValue;
        });
        */
  };

  const handleCreateAddress = (event: any) => {
    useAddressCreation(value.address, (status: statut, message: string) => {
      toast.push({
        status: status,
        title: message,
      });
    });
  };

  const handleZoomChange = (zoomValue: number) => {
    /*
        setValue((currentValue) => {
            const newValue = {
                ...currentValue,
                mapConfig:{
                    zoom: zoomValue,
                    center : currentValue.mapConfig.center 
                }
            }
            onChange(PatchEvent.from(set(newValue)));
            return newValue;
        });
        */
  };

  const handleCenterChange = (center: number) => {
    /*
        setValue((currentValue) => {
            const newValue = {
                ...currentValue,
                mapConfig:{
                    zoom: currentValue.mapConfig.zoom,
                    center : center 
                }
            }
            onChange(PatchEvent.from(set(newValue)));
            return newValue;
        });
        */
  };

  return (
    <Wrapper apiKey={config.apikey}>
      <Card>
        <div style={{ opacity: map ? 1 : 0 }}>
          <Searchbox onSelect={handlePlaceSelected} />
          {
            <Map
              onClick={handleMapClicked}
              onZoomChange={handleZoomChange}
              onCenterChange={handleCenterChange}
              zoom={value.mapConfig.zoom}
              center={value.mapConfig.center}
              style={{ height: "400px" }}
              onMapReady={onMapReady}
            >
              <Marker position={value.geoloc} />
            </Map>
          }
        </div>
      </Card>
      <Card padding={4} style={{ textAlign: "center" }}>
        <Inline space={[3, 3, 4]}>
          <Button
            fontSize={[2, 2, 3]}
            //icon={AddIcon}
            mode="ghost"
            padding={[3, 3, 4]}
            text="Create Address"
            onClick={handleCreateAddress}
          />
        </Inline>
      </Card>
    </Wrapper>
  );
};

// Create the default export to import into our schema
export default MapPicker;
