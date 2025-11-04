const testUser = {
  id: 1,
  name: "John Doe",
  email: "john@doe.com",
};

const normalUser = {
  id: 2,
  name: "Alice Doe",
  email: "alice@doe.com",
};

type User = typeof testUser;

export const user: User | undefined = normalUser;
