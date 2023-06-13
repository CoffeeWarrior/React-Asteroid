//updates keymap in state, will set values to true or false on keydown and keyup
const adjustKeyMap = (event, keyMapInput) => {
  if (event.type === "keydown") {
    const keyMap = { ...keyMapInput };
    switch (event.keyCode) {
      case 87:
      case 38:
        keyMap.w = true;
        break;
      case 83:
      case 40:
        keyMap.s = true;
        break;

      case 65:
      case 37:
        keyMap.a = true;
        break;

      case 68:
      case 39:
        keyMap.d = true;
        break;
      default:
        break;
    }
    return keyMap;
  } else if (event.type === "keyup") {
    const keyMap = { ...keyMapInput };
    switch (event.keyCode) {
      case 87:
      case 38:
        keyMap.w = false;
        break;

      case 83:
      case 40:
        keyMap.s = false;
        break;

      case 65:
      case 37:
        keyMap.a = false;
        break;

      case 68:
      case 39:
        keyMap.d = false;
        break;
      default:
    }

    return keyMap;
  }
};
export default adjustKeyMap;
