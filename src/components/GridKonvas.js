import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Stage, Group, Layer, Rect, Image, Text, Line } from 'react-konva';
// import Tile, { propTypes as TilePropTypes } from './Tile';

const initDataImage = (row, col) => {
  const data = [];
  for (let i = 1; i <= row * col; i++) {
    data.push({ id: i, isDragging: false, rotation: 0 });
  }
  return data;
};
const STROKE_VALUE = 2;

const GridKonvas = () => {
  const imageState = useSelector(state => state.image.image);
  const [dataImage, setDataImage] = React.useState([]);
  const [gridX, setGridX] = React.useState(0);
  const [gridY, setGridY] = React.useState(0);

  useEffect(
    () => {
      // console.log(imageState);

      setDataImage(initDataImage(imageState.row, imageState.col));
      if (imageState.col !== 0) {
        setGridX(imageState.width / imageState.col);
      }

      if (imageState.row !== 0) {
        setGridY(imageState.height / imageState.row);
      }
    },
    [imageState],
  );

  const handleDragStart = e => {
    const id = e.target.id();
    dataImage[id - 1].isDragging = true;
    // const data = dataImage.map(item => (item.id === id ? { ...item, isDragging: true } : item));
    setDataImage(dataImage);
    // console.log(dataImage);
  };

  const handleDradEnd = e => {
    e.target.to({
      x: Math.round(e.target.x() / gridX) * gridX,
      y: Math.round(e.target.y() / gridY) * gridY,
    });
    const data = dataImage.map(item => ({ ...item, isDragging: false }));
    setDataImage(data);
  };

  const handleContextMenu = e => {
    // console.log(e);
    e.evt.preventDefault();
    const id = e.target.id();
    const data = dataImage.map(
      item =>
        item.id === id
          ? { ...item, rotation: (item.rotation + 90) % 360 }
          : item,
    );
    setDataImage(data);
  };

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
          <Line
            strokeWidth={2}
            stroke={'red'}
            points={[0, 0, 0, imageState.width]}
          />
          <Line
            strokeWidth={2}
            stroke={'red'}
            points={[0, 0, imageState.height, 0]}
          />
          <Line
            strokeWidth={2}
            stroke={'red'}
            points={[0, imageState.width, imageState.height, imageState.width]}
          />
          <Line
            strokeWidth={2}
            stroke={'red'}
            points={[imageState.height, 0, imageState.height, imageState.width]}
          />
          {/* <Rect
                    x={50}
                    y={50}
                    width={imageState.width / imageState.col}
                    height={imageState.height / imageState.row}
                    // fill="red"
                    shadowBlur={10}
                    draggable={true}
                    fillPatternImage={imageState.imageSrc}
                    /> */
          }
          {dataImage.map((v, i) => {
            return (
              <Group
                key={v.id}
                id={v.id}
                draggable
                x={0}
                y={0}
                width={gridX}
                height={gridY}
                onDragStart={handleDragStart}
                onDragEnd={handleDradEnd}
                onContextMenu={handleContextMenu}
                offset={{ x: (-gridX) / 2, y: (-gridY) / 2 }}
              >
                <Rect
                  id={v.id}
                  x={STROKE_VALUE / 2}
                  y={STROKE_VALUE / 2}
                  width={gridX}
                  height={gridY}
                  shadowBlur={v.isDragging ? 10 : 0}
                  stroke="black"
                  strokeWidth={STROKE_VALUE}
                  rotation={v.rotation}
                  fillPatternImage={imageState.imageSrc}
                  offset={{ x: gridX / 2, y: gridY / 2 }}
                  //   fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                  //   fillLinearGradientEndPoint={{ x: gridX, y: gridY }}
                  //   fillLinearGradientColorStops={[
                  //     0,
                  //     'rgba(0,0,0,0.7)',
                  //     1,
                  //     'rgba(255,255,255,0.5)'
                  //   ]}
                  // fill="red"
                />
                {/* <Text
                  text={v.id}
                  fontSize={40}
                  fontFamily="Calibri"
                  fill="#000"
                  width={gridX}
                  align="center"
                  offset={{ x: gridX / 2, y: gridY / 2 }}
                  // padding={5}
                /> */
                }
              </Group>
            );
          })}
          {/* <Rect
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
                        height={imageState.height}
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
                    /> */
          }
        </Group>
      </Layer>
    </Stage>
  );
};

export default styled(GridKonvas)`
`;
