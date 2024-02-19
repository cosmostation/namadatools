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

export function formatDecimal(number: number, x: number, y: number): string {
  const result = number / 10 ** x;
  const formattedResult = parseFloat(result.toFixed(y)).toLocaleString();
  return formattedResult;
}
