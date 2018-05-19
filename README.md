# Template for project

## Built with
* Docker (infrastructure)
* ReactJS + Foundation CSS (client side)
* Django (server side)
* Postgres (database)
* Nginx (reverse proxy and cache for static assets)


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Install Docker for Mac if using Mac (https://store.docker.com/editions/community/docker-ce-desktop-mac)
* Add your SSH key to your Bitbucket settings
* Install NPM (https://docs.npmjs.com/getting-started/installing-node)


Add these lines to .zshrc to setup our custom Docker command
```
alias dcdev='docker-compose -f docker-compose.yml -f docker-compose.dev.yml'
```

Then, run this command to load your changes
```
source ~/.zshrc
```

### Setup project

### Set up environmental variables
```
cp .env.sample .env
cp db.env.sample db.env
```

#### Install node packages
```
cd ~/Desktop/projectname/frontend
yarn install
```

NOTE: should not have to manually do yarn install. Also, there may be issues with installing new node packages while devloping, making you have to restart the Docker container, will need to investigate further...

http://dchua.com/2016/02/07/getting-npm-packages-to-be-installed-with-docker-compose/

#### Generate Django secret key



#### Start the project
Spin up containers using the alias we set up earlier

* Check to make sure Docker is running, when it is, you will be able to use docker-compose commands
* This may take a few minutes if this is your first time running the command since Docker will have to build the images that we will use to run our Docker containers

```
cd ~/Desktop/projectname
dcdev up
```


#### View in browser
* go to localhost:3000 to view our user interface
* go to localhost/api/ for server side and to see API response data (e.g. localhost/api/stories?bySpeaker=true&byTitle=true for all the stories)

You are now ready to start developing and testing!

#### If you want to stop the containers, run this command
```
dcdev down
```

### Developing


Any changes to the Dockerfiles will require you to rebuild the images
```
dcdev build
```


## Production

### Build Static files
```
cd ~/Desktop/projectname/frontend
npm run build
```

