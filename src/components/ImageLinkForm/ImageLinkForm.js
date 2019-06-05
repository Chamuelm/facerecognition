import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className='w-70 center'>
            <p className='f3'>
                {'Enter a url of image and we will detect faces in it. Give it a try.'}
            </p>
            <div className='pattern pa3 shadow-4'>
                <input className='f4 pa2 w-80 center' type='tex' onChange={onInputChange} />
                <button className='grow f4 link ph3 ml1 pv2 dib bg-light-grey' style={{color: '#0B3954'}} onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;