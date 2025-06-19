export const cipher = async (image: ArrayBuffer, shift: number): Promise<ArrayBuffer> => {
  const source = new Uint8Array(image);
  const result = new Uint8Array(source.length);

  for (let i = 0; i < source.length; i++) {
    result[i] = (source[i] - shift) % 256;
  }

  return result.buffer;
};
