# Set .api/.env variables appropriately... 
 
> *:: <span style="color:green">GENERAL</span>*
>
> TWIT_TEE_API_PORT=8001<br/>
> TWIT_TEE_CONSUMER_KEY=?????<br/>
> TWIT_TEE_CONSUMER_SECRET=?????<br/>
> TWIT_TEE_ACCESS_TOKEN=?????<br/>
> TWIT_TEE_ACCESS_TOKEN_SECRET=?????<br/>
> TWIT_TEE_REDIS_EXPIRE_SECONDS=900<br/>

> *:: <span style="color:green">NON-DOCKER</span>*
> 
> TWIT_TEE_DB_CONFIG=localhost:27017/twitteemongo<br/>
> TWIT_TEE_REDIS_CONFIG=redis://localhost:6379<br/>
 
> *:: <span style="color:green">DOCKER</span>*
> 
> TWIT_TEE_DB_CONFIG=database:27017/twitteemongo<br/>
> TWIT_TEE_REDIS_CONFIG=redis://cache:6379<br/>

# Set .env variables appropriately... 
 
> 
> *:: <span style="color:green">DOCKER</span>*
>
> <span style="color:gray">*...DOCKER UI on LOCALHOST*</span><br/>
> NGINX_CONFIG=dev.conf
>
> <span style="color:gray">*...DOCKER UI on SERVER*</span><span style="color:red"> IMPORTANT!</span><br/>
> NGINX_CONFIG=default.conf

# Run Without Docker or When Developing...
We can consider revamping this to use [Concurrently](https://github.com/kimmobrunfeldt/concurrently), but for now, cd into separate terminals for API, UI and Redis.

### Terminal 1 - API
```sh
$ cd api
$ npm node server
<or>
$ npx nodemon server
```
### Terminal 2 - UI
```sh
$ cd ui
$ npm install
$ npm start
```

### Terminal 3 - Redis (If not using docker, [Redis](https://redis.io/) must be pre-installed)
````sh
$ redis-server
````

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
### If necessary... a cheatsheet of some cleanup commands
```sh
$ docker image prune -f
$ docker rm $(docker ps -a -q)
$ docker rmi $(docker images -q)
```