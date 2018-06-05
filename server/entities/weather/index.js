import Model from "./model";
import Resolvers from "./resolvers";

export default ({ connector, endpoints }) => {
  const model = Model({ connector, endpoints });
  return {
    resolvers: Resolvers({ model }),
    typeDefs: `
    ##### TYPES #####

    type Main {
      temp: Int!
    }

    type Wind {
      speed: Int!
      deg: Int!
    }

    type Weather {
        id: Int
        main: String
        description: String
    }


    type WeatherItem {
     dt: Int!
     main: Main
     wind: Wind
     Weather: [Weather]
    }


    type City {
      id: Int!
      name: String!
    }

    type WeatherData {
      list: [WeatherItem]
      city: City
    }

    ##### INPUT PARAMS ####

     input weatherCoordinatesQuery {
      lon: Float!
      lat: Float!
    }
  
    ##### QUERY ####
    extend type Query {
     getWeatherByCoordinates(params: weatherCoordinatesQuery): WeatherData
    }`
  };
};
