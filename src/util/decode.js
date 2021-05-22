/* eslint-disable no-unused-vars */
const decode = {
  0x00: " ",
  0xa1: "0",
  0xa2: "1",
  0xa3: "2",
  0xa4: "3",
  0xa5: "4",
  0xa6: "5",
  0xa7: "6",
  0xa8: "7",
  0xa9: "8",
  0xaa: "9",
  0xab: "!",
  0xac: "?",
  0xad: ".",
  0xae: "-",
  0xb0: "...",
  0xb1: "“",
  0xb2: "”",
  0xb3: "‘",
  0xb4: "’",
  0xb5: "♂",
  0xb6: "♀",
  0xb8: ",",
  0xba: "/",
  0xbb: "A",
  0xbc: "B",
  0xbd: "C",
  0xbe: "D",
  0xbf: "E",
  0xc0: "F",
  0xc1: "G",
  0xc2: "H",
  0xc3: "I",
  0xc4: "J",
  0xc5: "K",
  0xc6: "L",
  0xc7: "M",
  0xc8: "N",
  0xc9: "O",
  0xca: "P",
  0xcb: "Q",
  0xcc: "R",
  0xcd: "S",
  0xce: "T",
  0xcf: "U",
  0xd0: "V",
  0xd1: "W",
  0xd2: "X",
  0xd3: "Y",
  0xd4: "Z",
  0xd5: "a",
  0xd6: "b",
  0xd7: "c",
  0xd8: "d",
  0xd9: "e",
  0xda: "f",
  0xdb: "g",
  0xdc: "h",
  0xdd: "i",
  0xde: "j",
  0xdf: "k",
  0xe0: "l",
  0xe1: "m",
  0xe2: "n",
  0xe3: "o",
  0xe4: "p",
  0xe5: "q",
  0xe6: "r",
  0xe7: "s",
  0xe8: "t",
  0xe9: "u",
  0xea: "v",
  0xeb: "w",
  0xec: "x",
  0xed: "y",
  0xee: "z",
  0xff: "",
};

export default {
  readString: function(data, address) {
    let decoded = "";
    for (let i = 0; i < 7; i++) {
      console.log(address + i);
      console.log(data[address + i]);
      decoded += decode[data[address + i]];
    }
    console.log(decoded);
  },
  findSave: function(data) {
    for (let i = 0; i < data.byteLength; i++) {
      if (
        data[i] === 0xbb &&
        data[i + 1] === 0xcc &&
        data[i + 2] === 0xc3 &&
        data[i + 3] === 0xff &&
        data[i + 4] === 0xff &&
        data[i + 5] === 0xff &&
        data[i + 6] === 0xff &&
        data[i + 7] === 0xff
      )
        console.log(i);
    }
  },
};
