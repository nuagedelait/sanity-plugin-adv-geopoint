import { definePlugin } from "sanity";
import schemas from "./schemas";

/** @public */
export interface GeoConfig {
  apikey?: string;
}

/** @public */
export const Geo = definePlugin<void>((config: GeoConfig = {}) => {
  // eslint-disable-next-line no-console
  console.log("hello from sanity-plugin-tabs");

  config.apikey = "";
  return {
    name: "sanity-plugin-tabs",
    schema: {
      types: schemas,
    },
  };
});
