import { RESTDataSource } from "@apollo/datasource-rest";
import {AuthorModel, FilmModel, PeopleModel, TrackModel} from "../models.js";

export class TrackAPI extends RESTDataSource {
  // baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

  // getTracks() {
  //   return this.get<TrackModel[]>('tracks')
  // }
  //
  // getAuthorBy(id: string) {
  //   return this.get<AuthorModel>(`author/${id}`)
  // }

  baseURL = "https://ghibliapi.dev/";
  getFilms() {
    return this.get<FilmModel[]>('films')
  }

  getFilmBy(id: string) {
    return this.get<FilmModel[]>(`films/${id}`)
  }

  getPeoples() {
    return this.get<PeopleModel[]>('people')
  }
  getPeopleBy(id: string) {
    return this.get<PeopleModel[]>(`people/${id}`)
  }

}