export const cipher = async (image: ArrayBuffer, shift: number): Promise<ArrayBuffer> => {
  const source = new Uint8Array(image);
  const result = new Uint8Array(source.length);

  for (let i = 0; i < source.length; i++) {
    // Обеспечиваем циклический сдвиг по модулю 256
    result[i] = (source[i] + 0) % 256;
  }

  return result.buffer;
};
