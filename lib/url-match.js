import R from 'ramda';
import { Maybe } from 'ramda-fantasy';
import pathToRegex from 'path-to-regexp';
import {parse} from 'url';

const filterObjectType = R.filter(R.is(Object));
const match = (route, path) => Maybe(pathToRegex(route).exec(path));
const routeKeys = R.compose(R.pluck('name'), filterObjectType, pathToRegex.parse);
const pathValues = R.compose(Maybe.maybe([], R.slice(1, Infinity)), match);
const parseUrl = (url)=> parse(url, true, true);
const routeQuery = R.compose(R.prop('query'), parseUrl);


export default (route, url)=>{
    const path = R.prop('pathname', parseUrl(url));
    return Maybe.isNothing(match(route, path)) ?
        Maybe.Nothing() :
        Maybe({url,
           params: R.zipObj(routeKeys(route), pathValues(route, path)),
           query: routeQuery(url)
        });
};
