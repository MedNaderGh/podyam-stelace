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
var method = Resource.method;

var Users = /*#__PURE__*/function (_Resource) {
  _inherits(Users, _Resource);

  var _super = _createSuper(Users);

  function Users() {
    _classCallCheck(this, Users);

    return _super.apply(this, arguments);
  }

  return _createClass(Users);
}(Resource);

export { Users as default };
Resource.addBasicMethods(Users, {
  path: '/users',
  includeBasic: ['list', 'read', 'create', 'update', 'remove']
});
Users.prototype.checkAvailability = method({
  path: '/users/check-availability',
  method: 'GET'
}); // DEPRECATED: in favor of more explicit name

Users.prototype.updateOrganization = method({
  path: '/users/:id/organizations/:organizationId',
  method: 'PUT',
  urlParams: ['id', 'organizationId']
}); // DEPRECATED:END

Users.prototype.joinOrganizationOrUpdateRights = method({
  path: '/users/:id/organizations/:organizationId',
  method: 'PUT',
  urlParams: ['id', 'organizationId']
});
Users.prototype.removeFromOrganization = method({
  path: '/users/:id/organizations/:organizationId',
  method: 'DELETE',
  urlParams: ['id', 'organizationId']
});
Users.prototype.createCompany = method({
  path: '/users/companycreate',
  method: 'POST'
});
Users.prototype.companyVerifiction = method({
  path: '/users/companyverifiction',
  method: 'POST'
});
Users.prototype.uploadImage = method({
  path: '/users/uploadimage',
  method: 'POST'
});
Users.prototype.fetchUserFile = method({
  path: '/users/fetchuserfile',
  method: 'POST'
});
Users.prototype.fetchUserCompany = method({
  path: '/users/fetchusercompany',
  method: 'POST'
});
Users.prototype.verifyPassword = method({
  path: '/users/verifypassword',
  method: 'POST'
});
Users.prototype.updateUser = method({
  path: '/users/updateuser',
  method: 'POST'
});
Users.prototype.getUserDocs = method({
  path: '/users/getUserDocs/:id',
  method: 'GET',
  urlParams: ['id']
});
Users.prototype.deleteUserDocs = method({
  path: '/users/deleteUserDocs/:id',
  method: 'DELETE',
  urlParams: ['id']
});
Users.prototype.getWorkflowStep = method({
  path: '/users/cpmvwf/:id',
  method: 'GET',
  urlParams: ['id']
});
Users.prototype.addWorkflowStep = method({
  path: '/users/step/:id',
  method: 'GET',
  urlParams: ['id']
});
Users.prototype.getToVerifyDocs = method({
  path: '/users/vdocs/:id',
  method: 'GET',
  urlParams: ['id']
});
Users.prototype.validateDocs = method({
  path: '/users/vdocs/:id',
  method: 'GET',
  urlParams: ['id']
});