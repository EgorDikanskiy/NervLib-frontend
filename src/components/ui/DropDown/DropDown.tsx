import React from 'react';
import style from './DropDown.module.scss';

interface DropDownProps {
  header: string;
  items: string[];
  selectedItems: string | string[];
  onItemClick: (item: string) => void;
}

const DropDown = ({ header, items, selectedItems, onItemClick }: DropDownProps) => {
  const isSelected = (item: string) => {
    if (Array.isArray(selectedItems)) {
      return selectedItems.includes(item);
    }
    return selectedItems === item;
  };

  const handleClick = (item: string) => {
    onItemClick(isSelected(item) ? '' : item);
  };

  return (
    <div className={style.dropdown}>
      <div className={style.dropdown__header}>
        <div className={style.dropdown__header__icon}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.21353 7.85343C6.11977 7.94716 5.99262 7.99982 5.86003 7.99982C5.72745 7.99982 5.6003 7.94716 5.50653 7.85343L2.67803 5.02493C2.63028 4.9788 2.59219 4.92363 2.56598 4.86263C2.53978 4.80163 2.52599 4.73602 2.52541 4.66963C2.52483 4.60324 2.53748 4.5374 2.56262 4.47595C2.58776 4.4145 2.62489 4.35868 2.67184 4.31173C2.71878 4.26478 2.77461 4.22766 2.83606 4.20252C2.89751 4.17738 2.96335 4.16473 3.02974 4.1653C3.09613 4.16588 3.16173 4.17967 3.22274 4.20588C3.28374 4.23208 3.33891 4.27017 3.38503 4.31793L5.86003 6.79293L8.33504 4.31793C8.42934 4.22685 8.55564 4.17645 8.68674 4.17759C8.81783 4.17873 8.94324 4.23131 9.03594 4.32402C9.12865 4.41672 9.18123 4.54213 9.18237 4.67323C9.18351 4.80433 9.13311 4.93063 9.04204 5.02493L6.21353 7.85343Z"
              fill="#303030"
            />
          </svg>
        </div>
        <div className={style.dropdown__header__text}>{header}</div>
      </div>
      {items.map((item, index) => (
        <div
          className={`${style.dropdown__item} ${isSelected(item) ? style.dropdown__item_active : ''}`}
          key={index}
          onClick={() => handleClick(item)}
        >
          {header === 'Сортировка' && (
            <div
              className={item[item.length - 1] === ' ' ? style.dropdown__item__sort : style.dropdown__item__sort_desc}
            >
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_365_822)">
                  <path
                    d="M2.21973 3.5C2.07806 3.5 1.9594 3.548 1.86373 3.644C1.76806 3.74 1.72006 3.85867 1.71973 4C1.71939 4.14133 1.7674 4.26 1.86373 4.356C1.96006 4.452 2.07873 4.5 2.21973 4.5H4.21973C4.36139 4.5 4.48023 4.452 4.57623 4.356C4.67223 4.26 4.72006 4.14133 4.71973 4C4.71939 3.85867 4.67139 3.73983 4.57573 3.6435C4.48006 3.54717 4.36139 3.49933 4.21973 3.5H2.21973ZM2.21973 6C2.07806 6 1.9594 6.048 1.86373 6.144C1.76806 6.24 1.72006 6.35867 1.71973 6.5C1.71939 6.64133 1.7674 6.76 1.86373 6.856C1.96006 6.952 2.07873 7 2.21973 7H7.21973C7.3614 7 7.48023 6.952 7.57623 6.856C7.67223 6.76 7.72006 6.64133 7.71973 6.5C7.7194 6.35867 7.6714 6.23983 7.57573 6.1435C7.48006 6.04717 7.3614 5.99933 7.21973 6H2.21973ZM2.21973 8.5C2.07806 8.5 1.9594 8.548 1.86373 8.644C1.76806 8.74 1.72006 8.85867 1.71973 9C1.71939 9.14133 1.7674 9.26 1.86373 9.356C1.96006 9.452 2.07873 9.5 2.21973 9.5H10.2197C10.3614 9.5 10.4802 9.452 10.5762 9.356C10.6722 9.26 10.7201 9.14133 10.7197 9C10.7194 8.85867 10.6714 8.73983 10.5757 8.6435C10.4801 8.54717 10.3614 8.49933 10.2197 8.5H2.21973Z"
                    fill="#303030"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_365_822">
                    <rect width="12" height="12" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}

          <div>{item}</div>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
