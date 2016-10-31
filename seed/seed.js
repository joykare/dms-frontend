var mongoose = require('mongoose');

module.exports = {
  users:
  [{
    _id: mongoose.Types.ObjectId('57d11f44b0a303c1186279bf'),
    username: 'emabishi',
    name: {
      first: 'elizabeth',
      last: 'mabishi'
    },
    email: 'emabishi@gmail.com',
    password: 'emabishi',
    role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af')
  },
  {
    _id: mongoose.Types.ObjectId('54d11f35b0a303c1112345db'),
    username: 'skieha',
    name: {
      first: 'sylvia',
      last: 'kieha'
    },
    email: 'skieha@gmail.com',
    password: 'skieha',
    role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af')
  },
  {
    _id: mongoose.Types.ObjectId('57d11f35b0a303c7865279bd'),
    username: 'jwarugu',
    name: {
      first: 'joy',
      last: 'warugu'
    },
    email: 'jwarugu@gmail.com',
    password: 'jwarugu',
    role: mongoose.Types.ObjectId('57d11f35b0a303c1186270ad')
  },
  {
    _id: mongoose.Types.ObjectId('57d11f35b0a303c6789079fd'),
    username: 'tbaraza',
    name: {
      first: 'tonida',
      last: '57d11f35b0a303c1186279us'
    },
    email: 'tbaraza@gmail.com',
    password: 'tbaraza',
    role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af')
  }],

  roles:
  [{
    title: 'admin',
    permissions: 'readwrite',
    _id: mongoose.Types.ObjectId('57d11f35b0a303c1186270ad')
  }, {
    title: 'user',
    permissions: 'read',
    _id: mongoose.Types.ObjectId('57d11f35b0a303c1186279af')
  }],

  documents:
  [{
    ownerId: mongoose.Types.ObjectId('57d11f35b0a303c7865279bd'),
    title: 'Hey',
    content: 'Hello World',
    role: mongoose.Types.ObjectId('57d11f35b0a303c1186270ad'),
    createdAt: '2016-09-14',
    accessLevel: 'private'
  }, {
    ownerId: mongoose.Types.ObjectId('57d11f35b0a303c7865279bd'),
    title: 'User',
    content: 'Next document',
    role: mongoose.Types.ObjectId('57d11f35b0a303c1186270ad'),
    createdAt: '2016-09-14'
  }, {
    ownerId: mongoose.Types.ObjectId('57d11f35b0a303c6789079fd'),
    title: 'This',
    content: 'This this this',
    role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af'),
    createdAt: '2016-09-14',
    accessLevel: 'private'
  }, {
    _id: mongoose.Types.ObjectId('57d22f44b0a303c2286279fd'),
    ownerId: mongoose.Types.ObjectId('57d11f44b0a303c1186279bf'),
    title: 'That',
    content: 'That that that',
    role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af'),
    createdAt: '2016-09-15',
    accessLevel: 'private'
  },
  {
    ownerId: mongoose.Types.ObjectId('57d11f35b0a303c7865279bd'),
    title: 'Try',
    content: 'Out of content',
    role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af'),
    createdAt: '2016-09-16'
  }]
};
