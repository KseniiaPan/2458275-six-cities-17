import leaflet from 'leaflet';
import {useEffect, useState, useRef, MutableRefObject } from 'react';
import {Map} from 'leaflet';
import {Location} from '../types/offers-types';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, cityLocation: Location, shouldZoomScroll: boolean): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if(map) {
      map.panTo({
        lat: cityLocation.latitude,
        lng: cityLocation.longitude
      });
    }
  }, [cityLocation, map]);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: cityLocation.latitude,
          lng: cityLocation.longitude
        },
        zoom: cityLocation.zoom,
        scrollWheelZoom: shouldZoomScroll,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, cityLocation, shouldZoomScroll]);

  return map;
}

export default useMap;
