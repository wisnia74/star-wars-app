# star-wars-app

## Running the project

Check `.nvmrc` for a correct Node version you need. You can also run `nvm use` or `fnm use`. The project uses `yarn`.

1. run `docker compose up`, this will spin up local database on port 5432 and Adminer (UI tool to inspect database) on port 8001
2. copy `.env.example` to a local `.env` file in the root of the repo
3. run `yarn db:schema:sync && yarn db:seed` - this will sync the database schema and seed it with example data (check `data-seeder.ts` file to see the data that will be seeded)
4. run `yarn start:dev` - the app will start on `localhost:8000`, `localhost:8000/api` to see Swagger UI and `localhost:8001` to see Adminer

Important - if you want to use Adminer to peek inside the database, make sure to specify `postgres` as host and not `localhost`.
The login data should look as follows:
```
system: postgresql
host: postgres
username: user
password: password
database: app
```

## Thoughts

I wasn't sure from the description of the task if the fact of not including IDs for the resources was intended or was it just omitted to not give me any ideas for the type of IDs :) I opted for using UUID and actually including it in the resources so you can actually take the IDs from the responses and use them to interact with the API further.

The app tries to leverage built-in (or at least officially recommended from the docs) features like validation pipeline, TypeORM and Swagger. As such, given how many features are taken from core NestJS packages, it didn't make sense to test too many things like input validation for example, since what I would essentially be doing would be testing the underlying implementation of those packages and you don't want to be testing 3rd party packages.

The only tests that I was thinking of adding would be integration tests that would test the interaction between different resources inside the database, during different operations. For that, I would need to spin up the database for tests, either locally (could use `lint-staged` to run tests on commits) or utilizing Github Actions. However, given how small the project is (and that it was supposed to be a simple task to showcase my skills), I didn't include such tests (they would also require some non-trivial effort to setup). It might look bad on the first glance, not having tests (well, I guess a simple healthcheck could suffice, but I'm nearing the deadline with the task) but at the same time, like I mentioned, having tests that test 3rd party packages isn't ideal either.

There's many things I could write here (like, how I solved Swagger circular dependency issue changing `type; <type>` to `type: () => <type>`, or how I was trying to achieve a separation of concerns extracting TypeORM error handling logic to `TypeORMExceptionFilter`) but this text would get quite long then (which it already is), so let me jump to what I would've done if I wanted to deploy this app to production in any form of shape.

## Steps to deploy to prod

1. Well, we need a Docker image which I didn't have time to setup, but this should be quite simple. I would use `alpine` image, copy only needed files and made sure to install only prod dependencies with a `--frozen-lockfile`. One thing to consider is that currently the app loads `.env` file when it starts - there's different approaches here, some companies prefer not to include `.env` in their images, some do not mind. `dotenv` behavior could be tweaked to support either option. If you ask me, if you think there is a problem with including `.env` in the image, I say, if somebody penetrated your infrastructure to the point of getting an image of your app, you likely have way bigger problems than the fact it includes an `.env` file :)
2. Authentication - could've been achieved on a level of an API gateway of some sorts
3. Load balancing - in case we want to run multiple instances of the app as a micro-service
4. If the application would be running as a micro-service, we would need to make sure that instances don't interrupt each other, so we would need some kind of idempotency key in the database and the ability for instances to lock resources
5. Caching + rate limiting (rate limiting could be achieved on API gateway level)
6. Logging and monitoring (could be achieved also on API gateway level)
7. DB migrations - I already have scripts for that
8. We're using an SQL database, but if this was NoSQL and traffic (or other reasons) would justify it - database sharding

I think that's all that comes to my mind right now, I'm happy to answer any questions too :)
