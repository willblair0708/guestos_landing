import React from 'react';

interface LinkedInProps {
  className?: string;
  width?: number;
  height?: number;
}

const LinkedIn: React.FC<LinkedInProps> = ({
  className = '',
  width = 17,
  height = 17,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_443_6761)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M5.72358 14.0156V6.79073H3.30692V14.0156H5.72358ZM4.51524 5.80429C5.35798 5.80429 5.88251 5.2495 5.88251 4.55617C5.8668 3.84724 5.35798 3.30784 4.53123 3.30784C3.70456 3.30784 3.16406 3.84724 3.16406 4.55617C3.16406 5.2495 3.68848 5.80429 4.49949 5.80429H4.51524Z'
          fill='#03E87A'
          fillOpacity='0.909804'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7.0625 14.0156H9.47913V9.98094C9.47913 9.76501 9.49484 9.54929 9.55865 9.39493C9.73335 8.9635 10.131 8.51667 10.7986 8.51667C11.6731 8.51667 12.0229 9.17922 12.0229 10.1505V14.0156H14.4393V9.87297C14.4393 7.65381 13.2471 6.62119 11.6571 6.62119C10.3534 6.62119 9.78105 7.34531 9.46306 7.83853H9.4792V6.79073H7.06257C7.09428 7.46867 7.0625 14.0156 7.0625 14.0156Z'
          fill='#03E87A'
          fillOpacity='0.909804'
        />
      </g>
      <defs>
        <clipPath id='clip0_443_6761'>
          <rect
            width='16'
            height='16'
            fill='white'
            transform='translate(0.875 0.621094)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LinkedIn;
