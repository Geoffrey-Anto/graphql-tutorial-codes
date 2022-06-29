import { Address, Post, User } from "./../Schema/index";
const resolvers = {
  Query: {
    getUsers: async () => {
      const users = await User.find().populate("posts");
      return users;
    },
  },

  Mutation: {
    addUser: async (
      _: any,
      { input: { name, gender, age, city, state, pincode, image, title } }: any
    ) => {
      const u = new User({
        name: name,
        gender,
        age,
      });
      const a = new Address({
        city,
        state,
        pincode,
      });
      const p = new Post({
        image,
        title,
      });
      u.address = a;
      u.posts?.push(p);
      await u.save();
      await a.save();
      await p.save();
      return u;
    },
    changeUserAddress: async (_: any, { id, city, state, pincode }: any) => {
      const a = new Address({
        city,
        state,
        pincode,
      });
      const u = await User.findById(id);
      if (u !== null) {
        u.address = a;
        await a.save();
        await u.save();
        return true;
      }
      return false;
    },
    addPostToUser: async (_: any, { id, title, image }: any) => {
      const p = new Post({
        title,
        image,
      });
      const u = await User.findById(id);
      if (u !== null && u.posts) {
        u.posts.push(p);
        await p.save();
        u.save();
        return true;
      }
      return false;
    },
  },
};

export default resolvers;
