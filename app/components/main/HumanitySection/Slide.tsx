import Image from 'next/image';
import { memo } from 'react';
import { useId } from 'react';

import { useComputed, useSignals } from '@preact/signals-react/runtime';
import { motion, type MotionValue } from 'framer-motion';

interface SlideProps {
  progressX?: MotionValue<number>;
  index?: number;
  isFallback: boolean;
  slideIndex: any; // Adjust the type as needed
  slides: any[]; // Adjust the type as needed
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const imageVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0 },
};

const textVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0 },
};

const boxVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0 },
};

const Slide = memo(
  ({ progressX, index, isFallback, slideIndex, slides }: SlideProps) => {
    useSignals();

    const id = useId();
    const slide = useComputed(() => slides[index ?? slideIndex.value]);

    return (
      <section id={id}>
        <motion.div
          className='relative flex min-h-[calc(100vh-60px)] w-full flex-col bg-gradient-to-b from-primary-gold to-neutral-900 px-5 lg:grid lg:grid-cols-2 lg:py-10'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            variants={textVariants}
            className='flex flex-col justify-center p-5 lg:p-10'
          >
            <motion.div
              className='mb-4 text-[14px] uppercase tracking-wide text-neutral-50'
              key={`${slideIndex.value}:tagline`}
              variants={textVariants}
            >
              {slide.value.label}
            </motion.div>
            <motion.h3
              className='font-serif text-3xl leading-tight tracking-tight text-neutral-50 lg:text-5xl'
              key={`${slideIndex.value}:description`}
              variants={textVariants}
            >
              {slide.value.tagline}
            </motion.h3>
          </motion.div>
          <motion.div
            variants={imageVariants}
            className='flex items-center justify-center p-5 lg:p-10'
          >
            <motion.div
              className='m-auto h-fit w-fit rounded-lg shadow-lg'
              key={`${slideIndex.value}:image`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* <Image
                src={slide.value.image}
                alt='Woman Aaru'
                width={500}
                height={500}
                className='h-96 lg:h-full'
              /> */}
            </motion.div>
          </motion.div>
          <motion.div
            variants={boxVariants}
            className='flex flex-col items-start justify-end p-5 lg:p-10'
          >
            <motion.p
              className='text-sm tracking-tight text-neutral-50'
              key={`${slideIndex.value}:tagp`}
              variants={boxVariants}
            >
              0{(index ?? slideIndex.value) + 1}
            </motion.p>
            <motion.p
              className='mt-2 text-sm tracking-tight text-neutral-50'
              key={`${slideIndex.value}:desc`}
              variants={boxVariants}
            >
              {slide.value.description}
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

Slide.displayName = 'Slide';

export default Slide;
