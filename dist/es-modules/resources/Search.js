import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import _createClass from "@babel/runtime/helpers/createClass";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import Resource from '../Resource';
import { addReadOnlyProperty } from '../utils';
var method = Resource.method;

var Search = /*#__PURE__*/function (_Resource) {
  _inherits(Search, _Resource);

  var _super = _createSuper(Search);

  function Search() {
    _classCallCheck(this, Search);

    return _super.apply(this, arguments);
  }

  return _createClass(Search);
}(Resource);

export { Search as default };
Search.prototype.results = method({
  path: '/search',
  method: 'POST',
  beforeRequest: function beforeRequest(requestParams) {
    if (requestParams.data && requestParams.data.save) {
      requestParams.data.save = false;
    }

    return requestParams;
  },
  transformResponseData: function transformResponseData(res) {
    var lastResponse = res.lastResponse;
    var paginationMeta = {
      nbResults: res.nbResults,
      nbPages: res.nbPages,
      page: res.page,
      nbResultsPerPage: res.nbResultsPerPage,
      exhaustiveNbResults: res.exhaustiveNbResults
    };
    var newResponse = res.results || []; // add empty array for tests

    addReadOnlyProperty(newResponse, 'lastResponse', lastResponse);
    addReadOnlyProperty(newResponse, 'paginationMeta', paginationMeta);
    return newResponse;
  }
});
Search.prototype.list = Search.prototype.results;