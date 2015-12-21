import test from 'blue-tape';
import { Maybe } from 'ramda-fantasy';
import urlMatch from '../lib/url-match';


test('match should return { url: "/some/stuff", params: { name : "stuff"} } when matched against /some/:name', expect=>{

    const route = '/some/:name',
          url = 'http://somehost.com/some/stuff',
          expectedResult = {url, params: {name: 'stuff'}, query: {}};
          expect.looseEqual(Maybe.maybe(null, x=>x, urlMatch(route, url)), expectedResult);
          expect.end();
});


test('match should accept query parameters', expect=>{
    const route = '/some/:name',
          url = 'http://somehost.com/some/stuff?test1=1&test2=2',
          result = Maybe.maybe(null, x=>x, urlMatch(route, url));
          expect.equal(result.query.test1, '1');
          expect.equal(result.query.test2, '2');
          expect.end();
});

test('match should suppor multiple named params in path', expect=>{
    const route = '/sample/:route/:multi/param/:name',
          url = 'http://somehost.com/sample/gg/my/param/coolness',
          result = Maybe.maybe(null, x=>x, urlMatch(route, url));
          expect.equal(result.params.route, 'gg');
          expect.equal(result.params.multi, 'my');
          expect.equal(result.params.name, 'coolness');
          expect.end();
});

test('match should return Nothing when there is no match for path', expect=>{
    const route = '/',
          path = '/not_found';
          expect.ok(Maybe.isNothing(urlMatch(route, path)));
          expect.end();
});

test('match shoulf accept routes without params or query', expect=>{
    const route = '/simple/route',
          url = 'http://somehost.com/simple/route';
          expect.ok(Maybe.maybe(null, x=>x, urlMatch(route, url)).url);
          expect.end();
});
