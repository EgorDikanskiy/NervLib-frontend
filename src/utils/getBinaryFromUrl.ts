export async function getBinaryFromUrl(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Ошибка загрузки изображения');
  }
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}
