import React from 'react';
import parsePPM from '../lib/ppm-decode';
import { useSelector, useDispatch } from 'react-redux';
import { change_image } from '../redux/ducks';

const ReadFile = () => {
  const dispatch = useDispatch();
  const imageState = useSelector(state => state.image);

  const showFile = async e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async e => {
      // console.log(ppmDecode(text))
      // console.log(text);
      // const text = (reader.result);
      let ppmImage = parsePPM(e.target.result);

      imageState.width = ppmImage.width;
      imageState.height = ppmImage.height;
      imageState.imageSrc = ppmImage.data;
      // console.log(imageState.imageSrc);
      Promise
        .all([
          // Cut out two sprites from the sprite sheet
          createImageBitmap(imageState.imageSrc),
        ])
        .then(function(sprites) {
          // Draw each sprite onto the canvas
          // console.log(sprites);
          imageState.imageSrc = sprites[0];
          dispatch(change_image(imageState));
        });
      // ctx.putImageData(ppmImage.data, 0, 0);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={e => showFile(e)} />
    </div>
  );
};

export default ReadFile;
