# Villes Dashboard

A react, GraphQL dashboard application fetching data from SLs API

Hosted on heroku: https://ville-dashboard.herokuapp.com/

github repo: https://github.com/vilhelmfalkenmark/dashboard-v3/

## Installation

1.  Have node version 8.9.3 installed
2.  Have yarn installed
3.  run

```sh
yarn
```

## Develop

Start client develop mode with

```sh
yarn client
```

Start development nodemon hot-reloading GrapqhQL server with

```sh
yarn server
```

Start static GrapqhQL server with

```sh
yarn start
```

## Deploy

If a normal deploy from master branch run

```sh
git push heroku master
```

If pushing from another branch than master run:

```sh
git push heroku LOCAL_BRANCH_NAME:master
```

## Test Build

Run

```sh
yarn build
```

and then

```sh
yarn start
```

And go to localhost:5000
