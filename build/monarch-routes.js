'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramdaFantasy = require('ramda-fantasy');

var _urlMatch = require('./lib/url-match');

var _urlMatch2 = _interopRequireDefault(_urlMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// notNil:: Any -> Boolean
var notNil = function notNil(x) {
  return !(0, _ramda.isNil)(x);
};
// executeHandler:: (Object) -> Object -> Any
var executeHandler = (0, _ramda.curry)(function (handler, ctx) {
  return handler(ctx);
});
// routeState:: Object -> String -> String -> Any
var routeState = (0, _ramda.curry)(function (routingTable, url, route) {
  return _ramdaFantasy.Maybe.maybe(null, executeHandler(routingTable[route]), (0, _urlMatch2.default)(route, url));
});
// routerBuilder:: Object -> (String -> Any)
exports.default = (0, _ramda.curry)(function (routingTable, url) {
  return (0, _ramda.compose)(_ramda.head, (0, _ramda.filter)(notNil), (0, _ramda.map)(routeState(routingTable, url)), _ramda.keys)(routingTable);
});
