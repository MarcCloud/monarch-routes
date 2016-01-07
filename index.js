import { isNil, map, filter, keys, head, compose, curry } from 'ramda';
import { Maybe } from 'ramda-fantasy';
import match from './lib/url-match';

// notNil:: Any -> Boolean
const notNil = (x) => !isNil(x);
// executeHandler:: (Object) -> Object -> Any
const executeHandler = curry((handler, ctx)=> handler(ctx));
// routeState:: Object -> String -> String -> Any
const routeState = curry((routingTable, url, route)=> Maybe.maybe(null, executeHandler(routingTable[route]), match(route, url)));
// routerBuilder:: Object -> (String -> Any)
export default curry((routingTable, url)=> compose(head, filter(notNil), map(routeState(routingTable, url)), keys)(routingTable));
