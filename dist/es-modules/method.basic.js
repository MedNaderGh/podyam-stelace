export default function getBasicMethods(path, stelaceMethod) {
  return {
    list: stelaceMethod({
      path: path,
      method: 'GET',
      isList: true
    }),
    read: stelaceMethod({
      path: "".concat(path, "/:id"),
      method: 'GET',
      urlParams: ['id']
    }),
    create: stelaceMethod({
      path: path,
      method: 'POST'
    }),
    update: stelaceMethod({
      path: "".concat(path, "/:id"),
      method: 'PATCH',
      urlParams: ['id']
    }),
    remove: stelaceMethod({
      path: "".concat(path, "/:id"),
      method: 'DELETE',
      urlParams: ['id']
    })
  };
}