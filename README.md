# p7-riotjs-host
A riotjs app that hosts other riotjs applets
 
* [live Demo](https://ghstahl.github.io/riot1/)

## Features 
This is a riotjs app that loads other riotjs apps where the child apps could be more specifically considered plugins.
Other projects I have seen use terms like 'code spliting', 'componentization', etc.

Its a plugin, because the plugin has to obey some rules of the host and not carry code that that host provides.

In this example, you will notice the plugin bundle.js does not contain riot, bootstrap, or jquery amongst other libraries that are already present in the host app.  Its quite small, and the child plugin considers itself autonomous.

The plugin is self-contained [typicode-component](plugins/typicode_component) and can be built using the followoing;  
```
npm run prod-typicode
npm run dev-typicode
```
The plugin bundle is [here](dist/externals/typicode_component)

## Housekeeping 
A starter riotjs project based upon the following;

* [Bootswatch](http://bootswatch.com/)
* [Bootstrap](https://github.com/twbs/bootstrap)
* [Riot 3](https://muut.com/riotjs/)
* [RiotControl](https://github.com/jimsparkman/RiotControl/)
* [Webpack 2](http://webpack.github.io/)
* [jQuery](https://github.com/jquery/jquery)

## Get the kit

```
$ git clone https://github.com/ghstahl/P7-riotjs-host.git && cd P7-riotjs-host
```

## Installation

```
$ npm install
```

## Development

```
$ npm run dev
```
currently this doesn't watch the plugin area.  
Now the server is runnning on localhost:1338

## Production

```
$ npm run prod
```
This will build everything.

## Plugin Authors

### cookies
Cookies are supplied via riot.Cookies.  The implementation comes from js-cookies.   
'''
	let blah = riot.Cookies.get('blah-blah-blah');
'''

## Bootswatch Theming

The index.js can be modified to use any of the existing themes provided by [Bootswatch](https://github.com/thomaspark/bootswatch/).
Change line 01 from `import 'bootswatch/slate/bootstrap.css';` to `import 'bootswatch/{bootswatch-theme-name}/bootstrap.css';` to do this.
Save and preview the page immediately with the live reload feature.

