//hooks
import { useParams } from "react-router-dom";
//components
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES =
    [
        {
            id: 'p0',
            title: 'Empire State Building',
            description: 'One of the most famous sky scrapers in the world!',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
            address: '20 W 34th St, New York, NY 10001, United States',
            location: {
                lat: 40.7484405,
                lng: -73.9878584
            },
            creator: 'u0'
        },
        {
            id: 'p1',
            title: 'Emp. State Building',
            description: 'One of the most famous sky scrapers in the world!',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
            address: '20 W 34th St, New York, NY 10001, United States',
            location: {
                lat: 40.7484405,
                lng: -73.9878584
            },
            creator: "u1"
        }
    ];

const UserPlaces = () =>
{
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter( place => place.creator === userId );
    return (
        <PlaceList items={ loadedPlaces } />
    );
};

export default UserPlaces;