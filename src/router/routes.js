import React from "react";
import universal from "react-universal-component";

import EntryPointSkeleton from "components/Loading/EntryPointSkeleton";

import heartSolidIcon from "images/svg/heart-solid.svg";
import searchIcon from "images/svg/search.svg";
import positonIcon from "images/svg/position.svg";

//////////////////////////////////////////////////
/**
 * CODE SPLITTING CHUNKS
 */
//////////////////////////////////////////////////

// Departures
const SearchStation = universal(
  () =>
    import(/* webpackChunkName: 'searchStation' */ "entrypoints/SearchStation"),
  {
    resolve: () => require.resolveWeak("entrypoints/SearchStation"),
    chunkName: "searchStation",
    loading: <EntryPointSkeleton />
  }
);

const MyFavoriteStations = universal(
  () =>
    import(/* webpackChunkName: 'myFavoriteStations' */ "entrypoints/MyFavoriteStations"),
  {
    resolve: () => require.resolveWeak("entrypoints/MyFavoriteStations"),
    chunkName: "myFavoriteStations",
    loading: <EntryPointSkeleton />
  }
);

const CloseStations = universal(
  () =>
    import(/* webpackChunkName: 'closeStations' */ "entrypoints/CloseStations"),
  {
    resolve: () => require.resolveWeak("entrypoints/CloseStations"),
    chunkName: "closeStations",
    loading: <EntryPointSkeleton />
  }
);

// Todos
const Todos = universal(
  () => import(/* webpackChunkName: 'todos' */ "entrypoints/Todos"),
  {
    resolve: () => require.resolveWeak("entrypoints/Todos"),
    chunkName: "Todos",
    loading: <EntryPointSkeleton />
  }
);
// Weather
const Weather = universal(
  () => import(/* webpackChunkName: 'weather' */ "entrypoints/Weather"),
  {
    resolve: () => require.resolveWeak("entrypoints/Weather"),
    chunkName: "weather",
    loading: <EntryPointSkeleton />
  }
);

//////////////////////////////////////////////////
/**
 * Routes base
 */
//////////////////////////////////////////////////
export const DEPARTURES_GROUP = {
  title: "Lokaltrafiken",
  routes: [
    {
      key: 12,
      exact: true,
      navTitle: "Sök station",
      slug: "/",
      component: SearchStation,
      icon: searchIcon
    },
    {
      key: 13,
      exact: true,
      navTitle: "Mina favoritstationer",
      slug: "/my-favorite-stations",
      component: MyFavoriteStations,
      icon: heartSolidIcon
    },
    {
      key: 14,
      exact: true,
      navTitle: "Nära avgångar",
      slug: "/close-stations",
      component: CloseStations,
      icon: positonIcon
    }
  ]
};

export const TODO_GROUP = {
  title: "Att-göra-lista",
  routes: [
    {
      key: 15,
      exact: true,
      navTitle: "Att-göra-lista",
      slug: "/todos/",
      component: Todos,
      icon: heartSolidIcon
    }
  ]
};

export const WEATHER_GROUP = {
  title: "Väder",
  routes: [
    {
      key: 15,
      exact: true,
      navTitle: "Att-göra-lista",
      slug: "/todos/",
      component: Todos,
      icon: heartSolidIcon
    }
  ]
};

export default [DEPARTURES_GROUP, TODO_GROUP];
