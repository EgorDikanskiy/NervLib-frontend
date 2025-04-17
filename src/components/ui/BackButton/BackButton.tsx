import classNames from 'classnames';
import React from 'react';
import style from './BackButton.module.scss';
interface BackButtonProps {
  className?: string;
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ className, onClick }) => {
  return (
    <div className={classNames(className, style.back_button)} onClick={onClick}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.79977 4.99998L1.44627 5.35348L1.09277 4.99998L1.44627 4.64648L1.79977 4.99998ZM10.2998 8.99998C10.2998 9.13259 10.2471 9.25977 10.1533 9.35354C10.0596 9.44731 9.93238 9.49998 9.79977 9.49998C9.66716 9.49998 9.53999 9.44731 9.44622 9.35354C9.35245 9.25977 9.29977 9.13259 9.29977 8.99998H10.2998ZM3.94627 7.85348L1.44627 5.35348L2.15327 4.64648L4.65327 7.14648L3.94627 7.85348ZM1.44627 4.64648L3.94627 2.14648L4.65327 2.85348L2.15327 5.35348L1.44627 4.64648ZM1.79977 4.49998H6.79977V5.49998H1.79977V4.49998ZM10.2998 7.99998V8.99998H9.29977V7.99998H10.2998ZM6.79977 4.49998C7.72803 4.49998 8.61827 4.86873 9.27465 5.52511C9.93102 6.18149 10.2998 7.07173 10.2998 7.99998H9.29977C9.29977 7.33694 9.03638 6.70106 8.56754 6.23222C8.0987 5.76338 7.46281 5.49998 6.79977 5.49998V4.49998Z"
          fill="#303030"
        />
      </svg>
      <span>Назад</span>
    </div>
  );
};

export default BackButton;
