import './button.css'

function Button(props){
    return(
        <div className='button'>
            <button type='submit' >{props.hour}</button>
        </div>

    );
}

export default Button;