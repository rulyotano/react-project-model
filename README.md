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