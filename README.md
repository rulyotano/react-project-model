# Introduction
Here are described the conventions that are going to be used in the front end projects

# Project File/Directory Structure
## Directory per View 
> ... if your app has 3routes such as /home, /trending, /about, then there will be 3directories with the same names as the routes ...

[README](https://levelup.gitconnected.com/structure-your-react-redux-project-for-scalability-and-maintainability-618ad82e32b7)

```
src/
├───services/         --------> Folder for storing common things that aren't components, eg. services, classes, etc...
│   └───...
├───components/     --------> All components here...
│   ├───_duck/      --------> Duck folder ..... we are going to write about that
│   │   └───...
│   ├───common/     --------> Common folder, here are going to be all common components for all routes, may contains also redux things
│   │   └───...
│   ├───landing/
│   │   └───...
│   ├───login/      --------> A folder per route, nested routes, for instance a real route is for instance `/login/ff`
│   │   └───...
│   ├───app/
│   │   └───...
│   ├───configureStore.js
│   ├───Root.js     --------> Entry point for components, the main routes defined
│   └───store.js
├───i18n/           --------> langs dir, a folder per language, a file per issue
│   ├───en-us/
│   │   └───...
│   ├───es/
│   │   └───...
│   └───index.js
├───settings/       --------> settings folder, settings files for dev and prop
│   ├───index.js
│   ├───settings.dev.js
│   └───settings.prod.js
├───styles/
│   └───...
└───...
```

For instance, now we are going to have a folder per route path, for instance, if we have  a route `/login` and `/app` then we are going to have a folder `/src/components/login` and `/src/components/app`.

## Redux 
### Component/Container
There exists a very common classification for react components. 
* Components: A react component that doesn't know about the redux state. Only receive values and callbacks from props. Can store variables in the state for internal view propose.
* Containers: A react component that receives the redux state and pass variables and callbacks to Components. Define the layout.

For name convention, all containers must end with the word Component, and containers with Container, for instance `LoginContainer` and `LoginComponent`.

[README](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

### Ducks pattern
A form to group our redux things:

```
login/
├───_duck/
│   ├───actions.js      --------> actions and action creators, all in the same folder
│   ├───reducers.js     --------> reducers
│   ├───selectors.js    --------> selectors (are going to see this later)
│   ├───test.js         --------> tests
│   └───types.js        --------> the constants, for instance, action name types
└───...
```
The selectors here is the new thing here. The idea of selectors is to expose methods for accessing the reducer state. For instance instead of making
```
...
const mapStateToProps = (state) => ({
    l: state.languages.a.long.path.polyglot
})
...
```
whe use a selector for that
```
...
import { getL } from '../common/language/_duck/selectors'
...
const mapStateToProps = (state) => ({
    l: getL(state)
})
...
```

[README](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)

**NOTE:** I know it is a bit repetitive creating all these files for each feature, so I have added a template folder `_dev-templates`. This is a `VSCode` folder template that can be used by adding the `Template Generator` plugin, maybe there is a similar thing for `WebStorm`. Meanwhile can be used by copy paste...

### Use of reselect
Reselect is a library for composing selectors. Have the improvement that keeps a cache or memoization based on props and state, in this way expensive selectors are not re-executed if it not necessary. 

[README and EXAMPLES](https://github.com/reduxjs/reselect)

### Component reference for splitting into bundle files
For allowing dynamic component loading, and final js files splitting into several bundles, we must import components in a particular way, by using `react-loadable`.
```
...
import Loadable from 'react-loadable';
import LoadingComponent from "../loading/LoadingComponent";
...
const LandingAsync = Loadable({
    loader: ()=>import('./landing/LandingContainer'),
    loading: LoadingComponent,
})
```
then
```
<Switch>
    <Route exact path={landingRoute} component={LandingAsync}/>
    <Route path={loginRoute} component={LoginAsync}/>
    <PrivateRoute path={ffRoute} redirect={LOGIN_FF} component={FfAsync}/>
    <PrivateRoute path={hubRoute} redirect={LOGIN_HUB} component={HubAsync}/>
</Switch>
```
For making easier to implement it, made an small refactoring:
```
...
import Loadable from './common/loadable';
...
const LandingAsync = Loadable(()=>import('./landing/LandingContainer'))
```

### Loading reducers on demand
All reducers in the first level are loaded on demand, for example, our a route `/ff` we may have a file `index.js` for exporting the component to render, and then loading the reducer...

```
import FfContainer from "./FfContainer";
import reducerRegistry from "../../../common/redux/reducerRegistry";
import reducer from "./_duck/reducers";

reducerRegistry.register("ff", reducer)
export default FfContainer;
```
then load them:
```
const FfAsync = Loadable(()=>import('./app/ff'))
```

### Const in routeNames.js
All folders that represent a route path, must have a file named `routeNames.js` where are going to be all path contanst, that are going to be useful for reusing them without repeating strings.

# Tests
For better finding test when testfail, them must be grouped in `describe` sections every time is needed. The first description must contain a path...

```
describe("components > login > testfile.js",()=>{        
    //TODO: tests
    test(()=>{

    })
})
```
Also, test must be located inside each feature folder. Tests must be formed in the following way: `'file-name'+test.js`. The files `_duck/test.js` only contains redux associated tests.

# i18n
The folder `i18n` now is grouped in folders, for improving the organization, and must include several lang files when needed, by features, etc.
```
├───en-us/
│   ├───index.js
│   └───landing.js
├───es/
│   ├───index.js
│   └───landing.js
└───index.js
```

# Practices
* Use always `.js` extensions ([No need to use `.jsx` - README](https://github.com/facebook/create-react-app/issues/87))

# Libraries
### Lodash
Lodash has a lot of functional helpers, that save time and helps keeping our code cleaner. Load it on demands, for instance for instance: `npm i --save lodash.foreach` [lodash - README](https://lodash.com/docs/4.17.10)

### Axios
Axios is a library for making the http requests. It allows a lot of functionalities, as making interceptoprs, or base urls in all requests. [axios - README](https://github.com/axios/axios)


[Lodash](https://lodash.com/docs/4.17.10)

# Need to Read
* [Structure your React-Redux project for scalability and maintainability](https://levelup.gitconnected.com/structure-your-react-redux-project-for-scalability-and-maintainability-618ad82e32b7)
* [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
* [Scaling your Redux App with ducks](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)
* [Structure your React-Redux project for scalability and maintainability](https://levelup.gitconnected.com/structure-your-react-redux-project-for-scalability-and-maintainability-618ad82e32b7)
* [Code Splitting](https://reacttraining.com/react-router/web/guides/code-splitting)
* [Redux best practices](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e)
* [Redux modules and code-splitting](http://nicolasgallagher.com/redux-modules-and-code-splitting/)
* [Code Structure (Redux - Oficial)](https://redux.js.org/faq/code-structure)


