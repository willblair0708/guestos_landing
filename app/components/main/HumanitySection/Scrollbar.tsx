import { memo } from 'react';

import { motion, MotionValue, useTransform } from 'framer-motion';

type Axis = 'left' | 'right' | 'bottom' | 'top';

export const Scrollbar = memo(
  ({
    range,
    value,
    axis,
  }: {
    range: number[];
    value: MotionValue<number>;
    axis: { primary: Axis; secondary: Axis };
  }) => {
    const segment = useTransform(value, range, ['0%', '100%']);
    const display = useTransform(value, (value) => {
      const [start, end] = range;

      if (value > start && value <= end) {
        return 'initial';
      } else if (start === 0 && value <= 0) {
        return 'initial';
      } else {
        return 'none';
      }
    });

    // TODO: clean this up
    const position =
      axis.secondary === 'top'
        ? '-top-1'
        : axis.secondary === 'bottom'
          ? '-bottom-1'
          : axis.secondary === 'left'
            ? '-left-1'
            : '-right-1';

    const padding =
      axis.primary === 'top'
        ? 'pb-8'
        : axis.primary === 'bottom'
          ? 'pt-8'
          : axis.primary === 'left'
            ? 'pr-8'
            : 'pl-8';

    const dimensions =
      axis.primary === 'left' || axis.primary === 'right'
        ? 'w-8 h-2 bg-primary-gold'
        : 'w-2 h-8 bg-primary-gold';

    return (
      <div className={`absolute h-full w-full ${padding}`}>
        <div className='relative h-full w-full'>
          <motion.div
            className={`absolute ${dimensions} rounded-md ${position}`}
            style={{ [axis.primary]: segment, display }}
          />
        </div>
      </div>
    );
  }
);

Scrollbar.displayName = 'Scrollbar';
