import { Sage } from "./sage";

const api = new Sage({
  url: "http://wandergraph.dorkodu.com/api",
  headers: {
    'Authorization': 'Bearer <token>'
  },
  websocket: {
    endpoint: 'wss://wandergraph.dorkodu.com/websikişsokuş',
    onConnectionSuccess: () => console.log('Connected'),
    onConnectionError: () => console.log('Connection Error'),
  }
});

const currentUser = api.query({
  type: "User"
});

const currentUser = api.query({
  hash: "d9b687af2e555d05fb30f8ef7298a79a",
  arguments: {
    "user.id": 5,
    "auth.token": "aeff40b4fab2decbd34e0f177c1892b1",
    "filter.order.reverse": true
  }
});

const unfollowUser = api.act("unfollow", {
  "user.id": 5
})





/**
 * THEFT:
 * https://github.com/hasura/graphqurl
 * 
 */

// sunucuda sorguladığın ağaç bunun içinde işte
type Query = {
  me: User
  users: [User!]!
  user(id: ID, uid: String): User
  anotherUser(id: ID): User
  againAUser: User
}

type Mutation = {
  createUser(name: String!, email: String!, password: String!): User
  updateUser(id: ID, email: String, password: String): User
  deleteUser(id: ID): User
}

type User = {
  id: ID!
  name: String!
  email: String!
  createdAt: String!
  updatedAt: String!
};

// bizde şöyle (SERVER GİBİ DÜŞÜN)
const UserType = Sage.EntityType({
  name: "User",
  attributes: {
    "name": $name
  },
  acts: {
    "follow": $follow
  },
  links: {

  }
});

const $name = Sage.Attribute({
  name: "name",
  description: 'Name of a User. Must be a string. Required.',
  resolve: function (referenceValue, info: ContextInfo) {
    let id = referenceValue['user.id'];
    let user = DataSource.getUserById(id);
    return user.email;
  }
});

const $follow = Sage.Act({
  name: "follow",
  description: "Follow a User given their id.",
  do: function(ref, query) {
    UserService.startFollowing(ref.currentUserID, ref.targetID);
  }
})
