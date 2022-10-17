//components
import UsersList from "../components/UsersList";

const Users = () =>
{
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image: "https://images.unsplash.com/photo-1660892851600-cb3ae1fc9068?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80",
      places: 3
    }
  ];

  return <UsersList items={ USERS } />;
};

export default Users;