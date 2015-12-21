import './url-match_test';
import test from 'blue-tape';
import { spy } from 'sinon';
import routes from '../';


test('routes should be a function', expect=>{
    expect.equal(typeof routes, 'function');
    expect.end();
});

test('routes should return another function', expect=>{
    expect.equal(typeof routes(), 'function');
    expect.end();
});

test('monarch("/route") should return the same result as routeHandler()', expect=>{
    const routeHandler = ()=> 'handled!!';
    const routingTable = { '/route': routeHandler};
    const monarch = routes(routingTable);
    expect.equal(monarch('/route'), routeHandler());
    expect.end();
});

test('monarch("/users/mark") should call usersHandler with { url: "/users/mark", params:{name:"mark"}}', expect=>{
    const context = {url: '/users/mark', params:{name: 'mark'}, query: {}};
    const usersHandler = ({url, params})=> `handled user ${params.name} from ${url}`;
    const double07 = spy(usersHandler);
    const routingTable = {'/users/:name': double07};
    const monarch = routes(routingTable);
    let result = monarch('/users/mark');
    expect.ok(double07.calledWith(context));
    expect.equal(result, usersHandler(context));
    expect.end();
});

test('monarch should support multiple routes', expect=>{
    const routingTable = { '/users': ()=> 'handled first', '/users/:name': ({params})=> `handled ${params.name}`};
    const monarch = routes(routingTable);
    let result = monarch('/users/mark');
    expect.equal(result, 'handled mark');
    expect.end();
});
