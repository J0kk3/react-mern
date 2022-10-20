//hooks
import { useParams } from "react-router-dom";
//components
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
//styles
import "./PlaceForm.css";

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
            title: 'Empire State Building',
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

const UpdatePlace = () =>
{
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find( p => p.id === placeId );

    if ( !identifiedPlace )
    {
        return (
            <div className="center">
                <h2>Could not find a place!</h2>
            </div>
        );
    };

    return (
        <form className="place-form">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={ [ VALIDATOR_REQUIRE() ] }
                errorText="Please enter a valid title."
                onInput={ () => { } }
                value={ identifiedPlace.title }
                valid={ true }
            />
            <Input
                id="description"
                element="textarea"
                type="Description"
                label="Title"
                validators={ [ VALIDATOR_MINLENGTH( 5 ) ] }
                errorText="Please enter a valid description (min. 5 characters)."
                onInput={ () => { } }
                value={ identifiedPlace.title }
                valid={ true }
            />
            <Button type="submit" disabled={ true }>Update Place</Button>
        </form>
    );
};

export default UpdatePlace;