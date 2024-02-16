export const ellipsisAddress = (hexAddress: any) => {
  try {
    return hexAddress
      ? `${hexAddress.substring(0, 7)}...${hexAddress.substring(
          hexAddress.length - 7
        )}`
      : null;
  } catch (e) {
    return hexAddress;
  }
};

export const hexToBytes = (hex: string) => {
  let bytes = [];
  for (let c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
};

export const bytesToHex = (bytes: number[]) => {
  let hex = [];
  for (let i = 0; i < bytes.length; i++) {
    let current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
    hex.push((current >>> 4).toString(16));
    hex.push((current & 0xf).toString(16));
  }
  return hex.join("");
};
