# Set api/.env variables appropriately... 
 
> *:: <span style="color:green">GENERAL</span>*
>
> TWIT_TEE_API_PORT=?????<br/>
> TWIT_TEE_CONSUMER_KEY=?????<br/>
> TWIT_TEE_CONSUMER_SECRET=?????<br/>
> TWIT_TEE_ACCESS_TOKEN=?????<br/>
> TWIT_TEE_ACCESS_TOKEN_SECRET=?????<br/>
> TWIT_TEE_REDIS_EXPIRE_SECONDS=?????<br/>
>
> STRIPE_KEY_SECRET=?????<br/>

> *:: <span style="color:green">NON-DOCKER</span>*
> 
> TWIT_TEE_DB_CONFIG={HOST}:{PORT}/{DB}<br/>
> TWIT_TEE_REDIS_CONFIG=redis://{HOST}:{PORT}<br/>
 
> *:: <span style="color:green">DOCKER</span>*
> 
> TWIT_TEE_DB_CONFIG=database:{PORT}/{DB}<br/>
> TWIT_TEE_REDIS_CONFIG=redis://cache:{PORT}<br/>

# Set ui/.env variables appropriately... 
 
> *:: <span style="color:green">GENERAL</span>*
>
> REACT_APP_STRIPE_KEY_PUBLISHABLE=?????<br/>

# Set root .env variables appropriately... 
 
> 
> *:: <span style="color:green">DOCKER</span>*
>
> <span style="color:gray">*...DOCKER UI on LOCALHOST*</span><br/>
> NGINX_CONFIG=dev.conf
>
> <span style="color:gray">*...DOCKER UI on SERVER*</span><span style="color:red"> IMPORTANT!</span><br/>
> NGINX_CONFIG=default.conf

# Run Without Docker; Typically When Developing...

## Using [Concurrently](https://github.com/kimmobrunfeldt/concurrently)
Run all services using a single command.

###  Terminal - All Services
````sh
$ cd api && npm run start-all
````

## Using Seperate Terminals
You can obviously cd into separate terminals for API, Mongod, UI and Redis.

### Terminal 1 - Redis (If not using docker, [Redis](https://redis.io/) must be pre-installed)
````sh
$ redis-server
````

### Terminal 2 - Mongodb (If not using docker, [Mongodb](https://www.mongodb.com/) must be pre-installed)
````sh
$ mongod
````

### Terminal 3 - API
```sh
$ cd api && npm node server
<or>
$ npx nodemon server.js
```
> <span style="color:green">Once started, you should see an output similar to...</span>

```sh
App listening on port {PORT}
Connecting to mongodb://localhost:{PORT}/{DB} - retry number: 1
Redis connected. Ready.
MongoDB connected. Ready.
Twitter authentication successful. Ready.
```

### Terminal 4 - UI
```sh
$ cd ui && npm start
```
# Run With Docker...

### Build
```sh
$ docker-compose up --build -d
$ docker image prune -f
```
### Start
```sh
$ docker-compose up -d
```
### Stop
```sh
$ docker-compose down
```
### Misc... a cheatsheet of some cleanup commands
```sh
$ docker image prune -f
$ docker rm $(docker ps -a -q)
$ docker rmi $(docker images -q)
```
