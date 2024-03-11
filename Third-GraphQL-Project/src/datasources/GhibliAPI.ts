import { RESTDataSource } from "@apollo/datasource-rest";
import {AuthorModel, FilmModel, PeopleModel, TrackModel} from "../models.js";

export class GhibliAPI extends RESTDataSource {
  baseURL = "https://ghibliapi.dev/";

  getFilms() {
    return this.get<FilmModel[]>('films')
  }
  getFilmByUrls(urls: string[]) {
    return urls.map(url => this.get<FilmModel>(url))
  }

  getPeoples() {
    return this.get<PeopleModel[]>('people')
  }
  getPeopleByUrls(urls: string[]) {
    return urls
        .filter(url => url !== `${this.baseURL}people/`)
        .map(url => this.get<PeopleModel>(url))
  }
}