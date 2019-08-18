import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes, width, height }) => {

    const calcFaceLocation = (box) => {
        const face = box.region_info.bounding_box;
        return {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - (face.right_col * width),
          bottomRow: height - (face.bottom_row * height)
        }
      }

    let boxesDivsArray = [];
    if (boxes) {
        boxes.forEach(box => {
            const boxLocation = calcFaceLocation(box);
            boxesDivsArray.push(
                <div key={boxLocation.topRow} className='bounding-box' style={{top: boxLocation.topRow, right: boxLocation.rightCol, bottom: boxLocation.bottomRow, left: boxLocation.leftCol}}></div>
            );
        });
    }
    
    return (
        <div className='center ma w-70'>
            <div className='imageContainer'>
                <img id='inputImage' alt='' src={imageUrl} style={{maxWidth: '100%'}} />
                <div className='bounding-box-container' style={{width: width, height: height}}>
                    {boxesDivsArray}
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;