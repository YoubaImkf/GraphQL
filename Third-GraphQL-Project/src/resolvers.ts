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
            if (!hexa.match(/^#[0-9a-fA-F]{6}/)) {
                throw new GraphQLError(`${hexa} does not match a color pattern`)
            }
            return getClosestColor(hexa, ["#FF5733", "#33FF57", "#3357FF"])
        },
        getTracks: (_, __, {dataSources}) => {
            return dataSources.trackAPI.getTracks()
        },
        getFilms: (_, __, {dataSources}) => {
            return dataSources.ghibliAPI.getFilms();
        },
        getPeoples: (_, __, {dataSources}) => {
            return dataSources.ghibliAPI.getPeoples();
        },
    },

    Track: {
        author: (parent, _, {dataSources}) => {
            return dataSources.trackAPI.getAuthorBy(parent.authorId)
        }
    },
    Film: {
        peoples: (parent, __, {dataSources}) => {
            return dataSources.ghibliAPI.getPeopleByUrls(parent.people);
        }
    },
    People: {
        films: (parent, __, {dataSources}) => {
            return dataSources.ghibliAPI.getFilmByUrls(parent.film);
        }
    },
    Mutation: {
        incrementTrackViews: async (_, {id}, {dataSources}) => {
            try {
                const track = await dataSources.trackAPI.incrementTrackView(id);
                return {
                    code: 200,
                    message: 'Number of views has been incremented',
                    success: Boolean(track),
                    track
                }
            } catch (e) {
                return {
                    code: 304,
                    message: 'Resource not modified',
                    success: false,
                    track: null,
                }
            }
        }
    },
}