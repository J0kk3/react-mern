//hooks
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
//components
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
//styles
import "./PlaceForm.css";

const NewPlace = () =>
{
  const auth = useContext( AuthContext );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [ formState, inputHandler ] = useForm( {
    title:
    {
      value: "",
      isValid: false
    },
    description:
    {
      value: "",
      isValid: false
    },
    adress:
    {
      value: "",
      isValid: false
    },
    image:
    {
      value: null,
      isValid: false
    }
  },
    false
  );

  const history = useNavigate();

  const placeSubmitHandler = async event =>
  {
    event.preventDefault();
    try
    {
      const formData = new FormData();
      formData.append( 'title', formState.inputs.title.value );
      formData.append( 'description', formState.inputs.description.value );
      formData.append( 'adress', formState.inputs.adress.value );
      formData.append( 'creator', auth.userId );
      formData.append( 'image', formState.inputs.image.value );
      await sendRequest( "http://localhost:5000/api/places", "POST", formData,
        {
          Authorization: 'Bearer ' + auth.token
        } );
      history.push( "/" );
    }
    catch ( err ) { }
  };

  return (
    <>
      <ErrorModal error={ error } onClear={ clearError } />
      <form className="place-form" onSubmit={ placeSubmitHandler }>
        { isLoading && <LoadingSpinner asOverlay /> }
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={ [ VALIDATOR_REQUIRE() ] }
          errorText="Please enter a valid title"
          onInput={ inputHandler }
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={ [ VALIDATOR_MINLENGTH( 5 ) ] }
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={ inputHandler }
        />
        <Input
          id="adress"
          element="input"
          label="Adress"
          validators={ [ VALIDATOR_REQUIRE() ] }
          errorText="Please enter a valid adress."
          onInput={ inputHandler }
        />
        <ImageUpload id="image" onInput={ inputHandler } errorText="Please provide an image." />
        <Button type="submit" disabled={ !formState.isValid }>ADD PLACE</Button>
      </form>
    </>
  );
};

export default NewPlace;