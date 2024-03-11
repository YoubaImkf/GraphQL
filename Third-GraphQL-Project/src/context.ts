import { GhibliAPI } from "./datasources/GhibliAPI.ts"
import {TrackAPI} from "./datasources/TrackAPI.ts";

export type DataSourceContext = {
  dataSources: {
    ghibliAPI: GhibliAPI,
    trackAPI: TrackAPI
  }
}