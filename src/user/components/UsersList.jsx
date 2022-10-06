//components
import UserItem from "./UserItem";
//styles
import "./UserList.css";

const UsersList = props =>
{
    if ( props.items.length === 0 )
    {
        return (
            <div className="center">
                <h2>No users found.</h2>
            </div>
        );
    };

    return (
        <ul>
            { props.items.ma( user => (
                <UserItem
                    key={ user.id }
                    id={ user.id }
                    image={ user.image }
                    name={ user.name }
                    placeCount={ user.places }
                />
            ) ) }
        </ul>
    );
};

export default UsersList;