//components
import Input from "../../shared/components/FormElements/Input";
//styles
import "./NewPlace.css";

const NewPlace = () =>
{
  return (
    <form className="place-form">
      <Input element="input" type="text" label="Title" />
    </form> );
};

export default NewPlace;