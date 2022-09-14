export const actions = {
  apiRelativeUrls: {
    getUser: '/users/{0}',
    deleteUser: '/users/{0}',
    getAllUsers: '/users',
    postUser: '/users',
    patchUser: '/users',
  },
};

export const schoolingLevelTranslations: Map<Number, String> = new Map([
  [0, 'Infantil'],
  [1, 'Fundamental'],
  [2, 'Médio'],
  [3, 'Superior'],
]);
