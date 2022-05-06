import Resource from '../Resource'
const method = Resource.method
export default class Assets extends Resource {}

Resource.addBasicMethods(Assets, {
  path: '/assets',
  includeBasic: ['list', 'read', 'create', 'update', 'remove']
})
Assets.prototype.getAMFClassification = method({
  path: '/amfclassification',
  method: 'GET',
})
Assets.prototype.getCategories = method({
  path: '/fundcategories',
  method: 'GET',
})
Assets.prototype.getCurrencies = method({
  path: '/currencies',
  method: 'GET',
})
Assets.prototype.getFundtypes = method({
  path: '/fundtypes',
  method: 'GET',
})
Assets.prototype.getInvestementtypes = method({
  path: '/investementtypes',
  method: 'GET',
})
Assets.prototype.getManagementmethodes = method({
  path: '/managementmethodes',
  method: 'GET',
})
Assets.prototype.getLabels = method({
  path: '/label',
  method: 'GET',
})
Assets.prototype.getFunds = method({
  path: '/funds',
  method: 'GET',
})
