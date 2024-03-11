import { GraphQLError } from "graphql";
import { getClosestColor } from "./colors.js";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
  Query: {
    divide: (parent, {number1, number2}, context, info) => {
      if (number2 === 0) {
        throw new GraphQLError('cannot divide by 0')
      }
      return number1 / number2
    },
    multiply: (parent, {number1, number2}, context, info) => number1 * number2,
    closestColor: (parent, {hexa}) => {
      if(!hexa.match(/^#[0-9a-fA-F]{6}/)) {
        throw new GraphQLError(`${hexa} does not match a color pattern`)
      }
      return getClosestColor(hexa, ["#FF5733", "#33FF57", "#3357FF"])
    },

    getFilms: async (_, __, {dataSources}) => {
        const film = await dataSources.trackAPI.getFilms();
        const mappedFilm = film.map(film => {
            const id = extractUUID(film.id);
            return { ...film, id };
        })
        return mappedFilm;
    },
    getPeoples: async (_, __, { dataSources }) => {
       const people = await dataSources.trackAPI.getPeoples(); // Await the promise
       const mappedPeople = people.map(person => {
           const id = extractUUID(person.id);
           return { ...person, id };
       });

       return mappedPeople;
      },
  },

  Film: {
      peoples: (parent, __, {dataSources}) => {
          return dataSources.trackAPI.getPeopleBy(parent.peopleId);
      }
  },
  People: {
      films: (parent, __, {dataSources}) => {
          return dataSources.trackAPI.getFilmBy(parent.filmId);
      }
  },
}

function extractUUID(url: string): string {
    const uuidPattern = /\/([a-f0-9-]+)$/i;
    const matches = url.match(uuidPattern);
    if (matches && matches.length > 1) {
        return matches[1]; // Extracted UUID
    }
    // Return the original URL if no UUID found
    return url;
}