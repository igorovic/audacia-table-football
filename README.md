# Table football scores tracker

## How to run the project

Make sure to start your docker daemon before running the following commands.
In the project root run:

```bash
docker compose up --build
```

The web app is served at `http://localhost:3000` and the backend api at `http://localhost:3022`.
Open both urls in your browser to see the app in action.

# Project structure

This project is a monorepo managed with pnpm and turborepo.
The `backend` code resides in the `apps/backend` folder and the `web` app in the `apps/web` folder.

## Tech stack

- Next.js - frontend | because I have long experience with it
- Hono - backend | well structured and enables quick prototyping
- Zod-openapi - API documentation | I wanted to try it
- Sqlite - database | simple and easy to setup the project is simple and does not require fully fledged DB server
- Prisma - ORM | efficiently define DB models and queries
- Mantine - UI library | I am proficient with it

## UI decisions

- UI is responsive and mobile first
- Since the users will mostly use the app on hand held devices it was decided to constrain max-width to 768px.

### State management

- This app use `nuqs` to manage state in the url. The state of the app is quite simple and url params are a good place to store it in my opinion.

## Database

There was not much thought put into the database schema. The goal was to create a quick POC which implements the requirements.

### Issues to fix

- In the current version, it's possible to create a game but not set any score. In that case there will be an orphan game in `Game` table without participants. We should implement a pruning function for those instances or some security mechanism to avoid this case.
- There is no security to check on game participants. Which means that is's possible to add more than two players to a game.

# Tests

Tests are descrutive they will resest the database. So make sure to back up the database before running them.
However this is temporary and will only impact dev environment on the local machine.

# Notes

- In this implementation the game score is stored on each change. This is fine for this POC with a local sqlite database. However, in production we should use a different approach to limit the number of network requests.

## Options for future improvements

- Optimize docker image build with multi-stage builds
- Create a production ready container. Currently it simply runs the app with pnpm and next
- Use semantic commit messages
- should share types definition between backend and frontend apps
- use a shared library for backend and frontend
- add authentication for the app but mot importantly for the database
- implement a more engaging user interface
- use motion detection and device orientation to increase the goals in the realtime game tracker (e.g: swipe up to increase goal for player 1, swipe down to increase goal for player 2)
  - eventualy use the device gyroscope sensor to do the same
