## Project dependencies:
To run PostgreSQL on docker:\
  `$ docker run gostack_postgres`

## TypeORM
Create new migration:\
  ` $ yarn typeorm migration:create -n <name> `\
\
Execute migrations:\
  ` $ yarn typeorm migration:run `\
\
Rollback migrations:\
  ` $ yarn typeorm migration:revert `
