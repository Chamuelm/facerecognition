import React from 'react';

const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3'>
                {'Enter a url of image and we will detect faces in it. Give it a try.'}
            </p>
            <div>
                <input className='f4 pa2 w-70 center' type='tex' />
                <button className='w-30 grow f4 link ph3 mt2 pv2 dib bg-light-grey' style={{color: '#0B3954'}}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;