const parsePPM = data => {
  let NUM_CHANNELS = 3;
  let NUM_HEADERS = 12;
  let DEFAULT_ALPHA = 255;
  let myImageData;
  let width;
  let height;

  data = new Uint8Array(data);
  console.log('parse data');

  let headers = [];
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

  width = headers[9];
  height = headers[10];

  // if (!(maxval >= 0 && maxval <= 255))
  let raster = data.slice(headerSize);

  //canvas requires alpha channel
  let lenWithAlpha = raster.length / NUM_CHANNELS + raster.length;
  let bytes = new Uint8ClampedArray(lenWithAlpha);

  let index = 0;
  for (let i = 0; i < lenWithAlpha; i++) {
    if (i % 4 === NUM_CHANNELS) bytes[i] = DEFAULT_ALPHA;
    else bytes[i] = raster[index++];
  }

  myImageData = new ImageData(bytes, width, height);
  // console.log(width);

  return {
    row: headers[2],
    col: headers[3],
    maxSelection: headers[5],
    selectCost: headers[7],
    swapCost: headers[8],
    width: width,
    height: height,
    maxPixelValue: headers[11],
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
