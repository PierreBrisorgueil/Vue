[![Build Status](https://badges.weareopensource.me/travis/weareopensource/Vue.svg?style=flat-square)](https://travis-ci.org/weareopensource/Vue) [![Coveralls Status](https://badges.weareopensource.me/coveralls/github/weareopensource/Vue.svg?style=flat-square)](https://coveralls.io/github/weareopensource/Vue) [![Code Climate](https://badges.weareopensource.me/codeclimate/maintainability-percentage/weareopensource/Vue.svg?style=flat-square)](https://codeclimate.com/github/weareopensource/Vue/maintainability)
 [![Dependencies Status](https://david-dm.org/weareopensource/vue.svg?style=flat-square)](https://david-dm.org/weareopensource/vue) [![Dependabot badge](https://badges.weareopensource.me/badge/Dependabot-enabled-2768cf.svg?style=flat-square)](https://dependabot.com)
 [![Known Vulnerabilities](https://snyk.io/test/github/weareopensource/vue/badge.svg?style=flat-square)](https://snyk.io/test/github/weareopensource/vue)

# [WeAreOpenSource](https://weareopensource.me) Vue 4.x

## Presentation

This project is a stack Vue that can be ran as a standalone backend. Or in a fullstack with another of our repo of your choice (ex: [Node](https://github.com/weareopensource/Node), [Swift](https://github.com/weareopensource/Swift)). 

You can have more informations about us in our [global repo](https://github.com/weareopensource/weareopensource.github.io) and here : 

* our mindset and what we would like to create in our [introduction](https://weareopensource.me/introduction/) (in construction)
* how to create a fullstack from our repo in our [global wiki](https://github.com/weareopensource/weareopensource.github.io/wiki) (in construciton).
* our global roadmap and propose ideas about stacks in our [board](https://github.com/weareopensource/weareopensource.github.io/projects/1)
* how to contribute and help us [here](https://github.com/weareopensource/weareopensource.github.io/blob/master/CONTRIBUTE.md)

Our stack Vue is actually in Alpha. 

# Vue 4.x / Vuetify / Jwt

* [**Wiki**](#) - wip
* [**Knowledges JS**](https://github.com/weareopensource/weareopensource.github.io/wiki/Knowledges-JS)
* [**Demo**](https://vue.weareopensource.me) (working with [Node](https://github.com/weareopensource/Node) stack, email: *test@waos.me*, password: *TestWaos@2019*)

## Technology Overview

| Subject | Informations
| ------- | --------
| **Available** | 
| Architecture | Layered Architecture : everything is separated in layers, and the upper layers are abstractions of the lower ones, that's why every layer should only reference the immediate lower layer (vertical modules architecture)
| Testing |  [Jest](https://github.com/facebook/jest) WIP
| Linter  | [ESLint](https://github.com/eslint/eslint) ecmaVersion 10 (2019)
| Security | JWT Stateless - have a look on [Node](https://github.com/weareopensource/Node) stack for more informations
| CI  | [Travis CI](https://travis-ci.org/weareopensource/Node) 
| Developer  | [Coveralls](https://coveralls.io/github/weareopensource/Vue) - [Code Climate](https://codeclimate.com/github/weareopensource/Vue) - [Dependency status](https://david-dm.org/weareopensource/vue) - [Dependabot](https://dependabot.com/) - [Snyk](https://snyk.io/test/github/weareopensource/vue) <br> [standard-version](https://github.com/conventional-changelog/standard-version) - [commitlint](https://github.com/conventional-changelog/commitlint) - [commitizen](https://github.com/commitizen/cz-cli) - [waos-conventional-changelog](https://github.com/WeAreOpenSourceProjects/waos-conventional-changelog)
| Dependencies  | [npm](https://www.npmjs.com)
| **Being released** | 
| Deliver | Docker & Docker-compose
| **In reflexion** | 
| WIP  | wip

## Features Overview

#### Available

* **User** : classic register / auth

#### In reflexion

* **Tasks** : list tasks - add tasks - edit tasks - delete tasks
* **Admin** : list users - edit user - delete user
* RGPD conpliance 
* oAuth(microsoft, google)
* profile management (update, avatar upload ...)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:

* Git - [Download & Install Git](https://git-scm.com/downloads)
* Node.js (10.x) - [Download & Install Node.js](https://nodejs.org/en/download/)

## Installation
It's straightforward (you can use yarn if you want)
```bash
$ git clone https://github.com/weareopensource/vue.git && cd Vue
$ npm i 
```

## Running Your Application

### Development
* `npm start` to run a dev server with hot-reloads. Available at `http://localhost:8080/`.

/!\ in order to launch Vue with our node stack, node need to accept CORS. You can specify it in config or like it `WAOS_NODE_cors_origin=['http://localhost:8080'] npm start` when you starting node.

### Production
* `npm run build` to build a prod server.

### others 

* vue:serve : `npm vue:serve` -> be careful, this bypass config generation of the stack 
* vue:build : `npm vue:build` -> be careful, this bypass config generation of the stack 
* test : `npm test`
* test e2e : `npm run test:e2e`
* test unit : `npm run test:unit`
* lint : `npm run lint`
* commit : `npm run commit`
* release : `npm run release`
* generateConfig : `npm run generateConfig`

### Configuration

The default configuration is : `src/config/defaults/development.js`
The other configurations : `src/config/defaults/*.js` overwrite the default configuration, you can create your own. 

We take into account all system environment variables defined under the form WAOS_VUE_<path_toVariable>. A pre-build npm script turns under the hood those system environment variables into an object, infering paths from the varialbles name, merged to the configuration defined on `src/config/defaults` to regenerate the file used `src/config/index.js`.

So configuration avalable on `src/config/defaults/development` file are overidable. You can for instance define the app name by defining those system environment variables :

```
WAOS_VUE_app_name='my app =)'
```

## [Contribute](https://github.com/weareopensource/weareopensource.github.io/blob/master/CONTRIBUTE.md)

## History

This work is based on [MEAN.js](http://meanjs.org) and more precisely on a fork of the developers named [Riess.js](https://github.com/lirantal/Riess.js). The work being stopped we wished to take it back, we want to create updated stack with same mindset "simple", "easy to use". The toolbox needed to start projects, but not only with Node and Angular ...

## [We Are Open Source, Who we are ?](https://weareopensource.me)
Today, we dreams to create Backs/Fronts, aligns on feats, in multiple languages, in order to allow anyone to compose fullstack on demand (React, Angular, VusJS, Node, Nest, Swift, Go).
Feel free to discuss, share other kind of bricks, and invite whoever you want with this mindset to come help us.

## Licence

[![Packagist](https://badges.weareopensource.me/packagist/l/doctrine/orm.svg?style=flat-square)](/LICENSE.md)

## Dev

Pierre 

[![Blog](https://badges.weareopensource.me/badge/Read-WAOS%20Blog-1abc9c.svg?style=flat-square)](https://weareopensource.me) [![Slack](https://badges.weareopensource.me/badge/Chat-WAOS%20Slack-d0355b.svg?style=flat-square)](mailto:weareopensource.me@gmail.com?subject=Join%20Slack&body=Hi,%20I%20found%20your%20community%20We%20Are%20Open%20Source.%20I%20would%20be%20interested%20to%20join%20the%20Slack%20to%20share%20and%20discuss,%20Thanks) [![Mail](https://badges.weareopensource.me/badge/Contact-me%20by%20mail-00a8ff.svg?style=flat-square)](mailto:weareopensource.me@gmail.com?subject=Contact) [![Twitter](https://badges.weareopensource.me/badge/Follow-me%20on%20Twitter-3498db.svg?style=flat-square)](https://twitter.com/pbrisorgueil?lang=fr)  [![Youtube](https://badges.weareopensource.me/badge/Watch-me%20on%20Youtube-e74c3c.svg?style=flat-square)](https://www.youtube.com/channel/UCIIjHtrZL5-rFFupn7c3OtA)

Feel free to help us ! :) 
