import { TrackAPI } from "./datasources/TrackAPI"

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI
  }
}