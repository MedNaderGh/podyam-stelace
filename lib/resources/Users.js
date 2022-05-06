import Resource from '../Resource'

const method = Resource.method

export default class Users extends Resource {}

Resource.addBasicMethods(Users, {
  path: '/users',
  includeBasic: ['list', 'read', 'create', 'update', 'remove']
})

Users.prototype.checkAvailability = method({
  path: '/users/check-availability',
  method: 'GET'
})

// DEPRECATED: in favor of more explicit name
Users.prototype.updateOrganization = method({
  path: '/users/:id/organizations/:organizationId',
  method: 'PUT',
  urlParams: ['id', 'organizationId']
})
// DEPRECATED:END

Users.prototype.joinOrganizationOrUpdateRights = method({
  path: '/users/:id/organizations/:organizationId',
  method: 'PUT',
  urlParams: ['id', 'organizationId']
})

Users.prototype.removeFromOrganization = method({
  path: '/users/:id/organizations/:organizationId',
  method: 'DELETE',
  urlParams: ['id', 'organizationId']
})
Users.prototype.createCompany = method({
  path: '/users/companycreate',
  method: 'POST'
})
Users.prototype.companyVerifiction = method({
  path: '/users/companyverifiction',
  method: 'POST'
})
Users.prototype.uploadImage = method({
  path: '/users/uploadimage',
  method: 'POST'
})
Users.prototype.fetchUserFile = method({
  path: '/users/fetchuserfile',
  method: 'POST'
})
Users.prototype.fetchUserCompany = method({
  path: '/users/fetchusercompany',
  method: 'POST'
})
Users.prototype.verifyPassword = method({
  path: '/users/verifypassword',
  method: 'POST'
})
Users.prototype.updateUser = method({
  path: '/users/updateuser',
  method: 'POST'
})
Users.prototype.getUserDocs = method({
  path: '/users/getUserDocs/:id',
  method: 'GET',
  urlParams: ['id']
})
Users.prototype.deleteUserDocs = method({
  path: '/users/deleteUserDocs/:id',
  method: 'DELETE',
  urlParams: ['id']

})
Users.prototype.getWorkflowStep = method({
  path: '/users/cpmvwf/:id',
  method: 'GET',
  urlParams: ['id']

})
Users.prototype.addWorkflowStep = method({
  path: '/users/step/:id',
  method: 'GET',
  urlParams: ['id']

})
Users.prototype.getToVerifyDocs = method({
  path: '/users/vdocs/:id',
  method: 'GET',
  urlParams: ['id']

})
Users.prototype.validateDocs = method({
  path: '/users/vdocs/:id',
  method: 'GET',
  urlParams: ['id']

})