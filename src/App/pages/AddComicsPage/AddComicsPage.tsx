import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackButton from 'components/ui/BackButton';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import style from './AddComicsPage.module.scss';

// import { createComic } from '../store/comicsSlice';

interface ComicFormData {
  title: string;
  description: string;
  age_rating: string;
  poster_url: string;
  chapter_count: number;
  slug: string;
}

const AddComicsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ComicFormData>({
    title: '',
    description: '',
    age_rating: '0+',
    poster_url: '',
    chapter_count: 0,
    slug: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ageRatings = ['0+', '6+', '12+', '16+', '18+'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // await dispatch(createComic(formData)).unwrap();
      // Reset form or redirect
      setFormData({
        title: '',
        description: '',
        age_rating: '0+',
        poster_url: '',
        chapter_count: 0,
        slug: '',
      });
    } catch (error) {
      console.error('Failed to create comic:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.poster_url.trim()) newErrors.poster_url = 'Poster is required';
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'chapter_count' ? Number(value) : value,
    }));

    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  return (
    <section>
      <div className={style.menu}>
        <BackButton className={style.menu__back} onClick={() => navigate(routerUrls.profile.mask)} />
        <div className={style.menu__header}>
          <h2>Добавить комикс</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={style.comic_form}>
        <div className={style.comic_form__group}>
          <label>Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Age Rating*</label>
          <select name="age_rating" value={formData.age_rating} onChange={handleInputChange}>
            {ageRatings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Poster URL*</label>
          <input
            type="text"
            name="poster_url"
            value={formData.poster_url}
            onChange={handleInputChange}
            className={errors.poster_url ? 'error' : ''}
          />
          {errors.poster_url && <span className="error-message">{errors.poster_url}</span>}
        </div>

        <div className="form-group">
          <label>Chapter Count</label>
          <input
            type="number"
            name="chapter_count"
            value={formData.chapter_count}
            onChange={handleInputChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            readOnly // Можно сделать редактируемым при необходимости
          />
        </div>

        <button type="submit" className="submit-button">
          Create Comic
        </button>
      </form>
    </section>
  );
};

export default AddComicsPage;
