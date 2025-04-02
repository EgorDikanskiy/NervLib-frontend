import React from 'react';

const images = [
  {
    id: 1,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 2,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 3,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 4,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 5,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 6,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 7,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 8,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 9,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
  {
    id: 10,
    chapter_id: 1,
    url: 'https://imgur.com/dGLDuEK.png',
  },
];

const ViewComicsPage = () => {
  return (
    <div>
      {images.map((image: { id: number; chapter_id: number; url: string }) => (
        <div key={image.id}>
          <img src={image.url} alt="фото" />
        </div>
      ))}
    </div>
  );
};

export default ViewComicsPage;
