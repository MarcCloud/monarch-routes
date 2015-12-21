#Monarch Router

Functional style universal JavaScript router(yes, another one). I wrote this with the intention to practice some
functional programming concepts, and to use it in my own isomorphic apps.

#Why another router?

 I have been experimenting with isomorphic JavaScript for a while now, and so far none of the current routing solutions
 has quite convinced me. React-Router is nice, but it is coupled to React and it's API is not as simple as I would like
 to. Other routing solution add history and hash events management, which ,in my opinion, are out of the responsibility
 of a router. The prior also makes difficult integration with server side routing.


 I wanted a simple url/state pattern mapping tool that executes a function and returns results. And here it is.

#install

`$ npm install -S monarch-routes`


#Use it

```JavaScript
import routes from 'monarch-routes';

const routingTable = {
    "/users": ()=> "This should return a bunch of people...",
    "/users/:id": ({params})=> {DB.getUser(params.id)}
}

const monarch = routes(routingTable);

monarch('/users'); // This should return a bunch of people...

```
That's it. I don't think it could be simpler.

#API

`monarch-routes` takes a routing table in the form of a JavaScript object with the keys being the route pattern to match
,and the value being a handler function for that route pattern. It will return a `monarch` function which is our new router.

`monarch` takes a string path or url and returns whatever the matched handler result is. The handler is invoked with a context
object with the url that matched, the params of the pathname, and the query string variables.

The router uses the same path matcher algorithm than [ExpressJS](http://expressjs.com/en/guide/routing.html), so integrating with any express-ish app is easy. 


#Conribute/Fork

Clone this repo and run `npm install` and after that run the tests `npm test`.
