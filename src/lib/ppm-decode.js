const parsePPM = data => {
  const NUM_CHANNELS = 3;
  const NUM_HEADERS = 12;
  const DEFAULT_ALPHA = 255;

  data = new Uint8Array(data);
  console.log('parse data');

  const headers = [];
  let headerSize = 0;

  let buf = '';
  let ch;
  for (let i = 0; headers.length < NUM_HEADERS; i++, headerSize++) {
    // console.log(i);
    ch = String.fromCharCode(data[i]);
    if (/\s/.test(ch)) {
      // if (" " == ch) {
      headers.push(buf);
      buf = '';
    } else {
      buf += ch;
    }
  }

  const width = parseInt(headers[9]);
  const height = parseInt(headers[10]);

  // if (!(maxval >= 0 && maxval <= 255))
  const raster = data.slice(headerSize);

  // canvas requires alpha channel
  const lenWithAlpha = raster.length / NUM_CHANNELS + raster.length;
  const bytes = new Uint8ClampedArray(lenWithAlpha);

  let index = 0;
  for (let i = 0; i < lenWithAlpha; i++) {
    if (i % 4 === NUM_CHANNELS) bytes[i] = DEFAULT_ALPHA;
    else bytes[i] = raster[index++];
  }

  const myImageData = new ImageData(bytes, width, height);
  // console.log(width);

  return {
    row: parseInt(headers[2]),
    col: parseInt(headers[3]),
    maxSelection: parseInt(headers[5]),
    selectCost: parseInt(headers[7]),
    swapCost: parseInt(headers[8]),
    width: width,
    height: height,
    maxPixelValue: parseInt(headers[11]),
    imageSrc: myImageData,
  };
};

// const ppmProcess = (text) => {
//     const data = text.split('\n');
//     // eslint-disable-next-line
//     let width, height;
//     [width, height] = data[1].split(' ');
//     const maxPixelValue = data[2];

//     let begin = text.indexOf('\n');
//     for (let i = 0; i < 2; ++i)
//         begin = text.indexOf('\n', begin + 1);
//     let imageSrc = text.substring(begin + 1);

//     // let splitArray = imageSrc.match(/.{1,2}/g);
//     // let splitArray = imageSrc.split()

//     // let resArray = [];
//     // imageSrc.map((value, index) => {
//     //     if (index <= 10) {
//     //         console.log(value.charCodeAt(0));
//     //     }
//     //     resArray.push(value.charCodeAt(0));
//     // })
//     // return text;
//     return imageSrc;
// }

export default parsePPM;
