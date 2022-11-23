//hooks
import { useState, useRef, useEffect } from "react";
//components-
import Button from "./Button";
//styles
import "./ImageUpload.css";

const ImageUpload = props =>
{
    const [ file, setFile ] = useState();
    const [ previewUrl, setPreviewUrl ] = useState();
    const [ isValid, setIsValid ] = useState( false );

    const filePickerRef = useRef();

    const pickImageHandler = () =>
    {
        filePickerRef.current.click();
    };

    useEffect( () =>
    {
        if ( !file )
        {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () =>
        {
            setPreviewUrl( fileReader.result );
        };
        fileReader.readAsDataURL( file );
    }, [ file ] );

    const pickedHandler = e =>
    {
        let pickedFile;
        let fileIsValid = isValid;
        if ( e.target.files && e.target.files.length === 1 )
        {
            pickedFile = e.target.files[ 0 ];
            setFile( pickedFile );
            setIsValid( true );
            fileIsValid = true;
            return;
        }
        else
        {
            setIsValid( false );
            fileIsValid = false;
        }
        props.onInput( props.id, pickedFile, fileIsValid );
    };

    return (
        <div className="form-control">
            <input id={ props.id } style={ { display: "none" } } type="file" accept=".jpg, .jpeg, .png" onChange={ pickedHandler } />
            <div className={ `image-upload ${ props.center && "center" }` }>
                <div className="image-upload__preview">
                    { previewUrl && <img src={ previewUrl } alt="Preview" /> }
                    { !previewUrl && <p>Please pick an image.</p> }
                </div>
                <Button type="button" onClick={ pickImageHandler }>PICK IMAGE</Button>
            </div>
        </div>
    );
};

export default ImageUpload;