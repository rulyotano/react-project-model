/** Geometry Calculation Service, most common things and utils for geometry calculations */
import {setWith} from "lodash";
import centroid from "@turf/centroid";
import envelope from "@turf/envelope";
import area from "@turf/area";
import {convertArea as turfConvertArea} from "@turf/helpers";
import {memoize} from "lodash";

/** Get a mapped field object from a geoJson */
export const mappedGeoJson = (geoJson)=>{
  if (!geoJson)
    return null;
  const result = {};

  const count = geoJson.features.length;
  for (let i = 0; i < count; i++) {
    const f = geoJson.features[i];
    setWith(result, `${f.properties.cdFazenda}.${f.properties.cdZona}.${f.properties.cdTalhao}`,f , Object);
  }    
  return result;
};

export const calculateCentroid = memoize((feature) => {
  const result = centroid(envelope(feature));
  return {x:result.geometry.coordinates[1], y:result.geometry.coordinates[0]};
});

/** Returns area in squared meters */
export const calculateArea = memoize((feature) => {
  return (area(feature));
});

/** Converts a area to the requested unit. Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches, hectares */
export const convertArea = memoize((area = 0, originalUnit = "meters", finalUnit="kilometres")=>{
  const originHa = originalUnit === "hectares";
  const destinationHa = finalUnit === "hectares";
  if (originHa){
    area *=10000;
    originalUnit = "meters";
  }
  if (destinationHa){
    finalUnit = "meters";
  }
  let result = turfConvertArea(area, originalUnit, finalUnit);
  if (destinationHa)
    result /= 10000;
  return result;
});

