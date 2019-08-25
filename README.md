# When developing...
We can consider revamping this to use concurrently, but for now, cd into separate terminals for API and Web.

### Terminal 1 - API
```sh
$ cd api
$ npm node server
<or>
$ nodemon server
```
### Terminal 2 - Web
```sh
$ cd ui
$ npm install
$ npm start
```
# When deploying...
Run docker-compose commands from root directory.

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
### If necessary... some cleanup commands
```sh
$ docker image prune -f
$ docker rm $(docker ps -a -q)
$ docker rmi $(docker images -q)
```