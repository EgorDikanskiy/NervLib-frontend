declare module 'react-rating-stars-component' {
  import { Component } from 'react';

  interface ReactStarsProps {
    count?: number;
    value?: number;
    char?: string;
    activeColor?: string;
    size?: number;
    edit?: boolean;
    isHalf?: boolean;
    emptyIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    filledIcon?: React.ReactNode;
    a11y?: boolean;
    onChange?: (newRating: number) => void;
  }

  class ReactStars extends Component<ReactStarsProps> {}

  export default ReactStars;
}
