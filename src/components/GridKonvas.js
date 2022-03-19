import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Stage, Group, Layer, Rect, Image } from 'react-konva';
// import Tile, { propTypes as TilePropTypes } from './Tile';

const GridKonvas = () => {
  const imageState = useSelector(state => state.image.image);

  useEffect(() => {
    console.log(imageState);
  });

  return (
    <Stage width={800} height={800}>
      <Layer>
        <Group
          x={0}
          y={0}
          width={imageState.width}
          height={imageState.height}
          draggable={false}
        >
          <Rect
            x={20}
            y={50}
            width={imageState.width / imageState.col}
            height={imageState.height / imageState.row}
            fill="red"
            shadowBlur={10}
            draggable={true}
          />
          <Rect
            x={0}
            y={0}
            width={imageState.width}
            height={imageState.height}
            // fillPatternImage={this.state.fillPatternImage}
            fillPatternRepeat={'repeat'}
          />
          <Image
            x={0}
            y={0}
            width={imageState.width}
            height={imageState.imgH}
            globalCompositeOperation={'multiply'}
            image={imageState.imageSrc}
          />
          <Image
            x={0}
            y={0}
            width={imageState.width}
            height={imageState.height}
            globalCompositeOperation={'destination-in'}
            image={imageState.imageSrc}
          />
        </Group>
      </Layer>
    </Stage>
  );
};

export default styled(GridKonvas)`
`;
