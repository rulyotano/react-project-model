### sgpa-react
##### Configurando commit-template
#
```sh
$ cd sgpa-react
$ git config commit.template .git-commit-template
```
>Dessa forma na hora de gerar o commit basta usar < git commit > e o tema definido acima será carregado, você deverá informar o escopo e suas implemtações. Fica à seu critério adicionar demais informações.
Exemplo:
```sh
$ Scope: <...> | Implementation: <...>
$ # Please enter the commit message for your changes. Lines starting
$ # with '#' will be ignored, and an empty message aborts the commit.
$ # On branch master
$ #
$ # Initial commit
$ #
$ # Changes to be committed:
$ #       new file:   .git-commit-template
$ #       new file:   .gitignore
$ #       new file:   README.md
$ #       new file:   package.json
$ #       new file:   public/favicon.ico
$ #       new file:   public/index.html
$ #       new file:   public/manifest.json
$ #       new file:   src/App.css
$ #       new file:   src/App.js
$ #       new file:   src/App.test.js
$ #       new file:   src/index.css
$ #       new file:   src/index.js
$ #       new file:   src/logo.svg
$ #       new file:   src/registerServiceWorker.js
```

##### Intalando dependências
#
```sh
$ npm install
```

##### Iniciado projeto
#
```sh
$ npm start
```

#### Name Norms
Service File Name: CamelCase, eg. `helperService.js`
Component File Name (principal or primary components, components container of other): CapitalFirst eg. `Dashboard.js`
Stateless components, small ones: CapitalFirst starting with underscore, eg. `_LoadingComponent.js`
Css and Less files: Lowercase divided by - eg. `font-solinftec.css`

#### Services
Try keep services as simple as possible, for instance, try allways be an js object. In most of cases it is only what is needed, a class is to much complexity for it.
If a class is needed, for instance, http service, returns the instance, in this way doesn't need to be done by the 'users' of the service, and is like a real service.

#### Redux
All flux stores are goin to be inside the components folder. The `/src/components/configureStore.js` will be a function for creating stores (this can be useful for making test), and the `/src/components/store.js` will be the particular store instance used in the real aplication.
Inside the folder `/src/components/_store` is the base store. There will be all the common reduxers, actions and action creators. Inside the `_store` folder there will be the following file structure: folders `actions` and `reducers`, and the file `index.js`. In the file `index.js` there will be the reducer composition.
The idea is that in each component that needed, will be a `_store` folder.
