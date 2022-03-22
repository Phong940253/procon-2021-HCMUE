import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Group, Layer, Rect, Line } from 'react-konva';
import { change_data_image } from '../redux/ducks';
// import Tile, { propTypes as TilePropTypes } from './Tile';
const STROKE_VALUE = 2;

const GridKonvas = () => {
  const imageState = useSelector(state => state.image.image);
  const dataImage = useSelector(state => state.dataImage.dataImage);
  const dispatch = useDispatch();
  const [gridX, setGridX] = React.useState(0);
  const [gridY, setGridY] = React.useState(0);

  const initDataImage = (row, col, gridX, gridY) => {
    const data = [];
    console.log(row, col, gridX, gridY);
    for (let i = 0; i < row * col; i++) {
      // console.log(i, imageState.col, i % imageState.col, parseInt(i / imageState.row));
      data.push({
        id: String(i),
        isDragging: false,
        rotation: 0,
        x: STROKE_VALUE / 2 + gridX * (parseInt(i) % col),
        y: STROKE_VALUE / 2 + gridY * parseInt(parseInt(i) / col),
        offsetX: gridX * (parseInt(i) % col),
        offsetY: gridY * parseInt(parseInt(i) / col),
        posX: i % col,
        posY: parseInt(i / col),
      });
    }
    return data;
  };

  useEffect(
    () => {
      console.log(dataImage);
    },
    [dataImage],
  );

  useEffect(
    () => {
      // set gridWidth
      let gridTX, gridTY;
      if (imageState.col !== 0) {
        gridTX = imageState.width / imageState.col;
        setGridX(gridTX);
      }

      // grid Height
      if (imageState.row !== 0) {
        gridTY = imageState.height / imageState.row;
        setGridY(gridTY);
      }

      const data = initDataImage(
        imageState.row,
        imageState.col,
        gridTX,
        gridTY,
      );
      dispatch(change_data_image(data));
      // console.log(data);
    },
    [imageState],
  );

  const handleDragStart = e => {
    e.target.moveToTop();
    const id = e.target.id();
    dataImage[parseInt(id)].isDragging = true;
    dispatch(change_data_image(dataImage));
    // console.log(dataImage);
  };

  const handleDradEnd = e => {
    // console.log(e.target.attrs.posX + Math.round(e.target.x() / gridX), e.target.attrs.posY + Math.round(e.target.y() / gridY));
    e.target.to({
      x: Math.round(e.target.x() / gridX) * gridX,
      y: Math.round(e.target.y() / gridY) * gridY,
    });
    const data = dataImage.map(
      item => item.id === e.target.id()
        ? {
            ...item,
            isDragging: false,
            posX: Math.round(e.target.x() / gridX),
            posY: Math.round(e.target.y() / gridY),
          }
        : item,
    );
    // console.log(Math.round(e.target.x() / gridX), Math.round(e.target.y() / gridY));
    dispatch(change_data_image(data));
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
    dispatch(change_data_image(data));
  };

  return (
    <Stage width={1200} height={1200}>
      <Layer
        x={50}
        y={50}
        width={imageState.width}
        height={imageState.height}
        draggable={false}
      >
        <Line
          strokeWidth={2}
          stroke={'red'}
          points={[0, 0, 0, imageState.width + 2]}
        />
        <Line
          strokeWidth={2}
          stroke={'red'}
          points={[0, 0, imageState.height + 2, 0]}
        />
        <Line
          strokeWidth={2}
          stroke={'red'}
          points={[
            0,
            imageState.width + 2,
            imageState.height + 2,
            imageState.width + 2,
          ]}
        />
        <Line
          strokeWidth={2}
          stroke={'red'}
          points={[
            imageState.height + 2,
            0,
            imageState.height + 2,
            imageState.width + 2,
          ]}
        />
        <Group
          x={0}
          y={0}
          width={imageState.width}
          height={imageState.height}
          offset={{ x: (-gridX) / 2, y: (-gridY) / 2 }}
        >
          {dataImage.map((v, i) => {
            return (
              <Rect
                key={v.id}
                id={v.id}
                x={v.x}
                y={v.y}
                width={gridX}
                height={gridY}
                shadowBlur={v.isDragging ? 10 : 0}
                stroke="black"
                strokeWidth={STROKE_VALUE}
                rotation={v.rotation}
                fillPatternImage={imageState.imageSrc}
                fillPatternOffset={{ x: v.offsetX, y: v.offsetY }}
                offset={{ x: gridX / 2, y: gridY / 2 }}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDradEnd}
                onContextMenu={handleContextMenu}
                posX={v.posX}
                posY={v.posY}
                // globalCompositeOperation={'copy'}
              />
            );
          })}
        </Group>
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
      </Layer>
    </Stage>
  );
};

export default styled(GridKonvas)`
`;
