import Image from 'next/image';
import { memo } from 'react';
import { useId } from 'react';

import { useComputed, useSignals } from '@preact/signals-react/runtime';
import { motion, type MotionValue } from 'framer-motion';

import { Scrollbar } from './Scrollbar';

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
          className='relative flex min-h-[calc(100vh-60px)] w-full flex-col bg-[#EBFA13] via-[#e8f52a] to-[#EBFA13] px-5 lg:grid lg:grid-cols-[60fr_50fr_minmax(min-content,_208px)] lg:py-5'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            variants={imageVariants}
            className={`relative flex h-fit w-full items-center justify-center border-black py-12 lg:h-full lg:border-b lg:p-8 ${
              isFallback && index !== 0 ? 'border-r lg:border-r-0' : ''
            }`}
          >
            <motion.div
              className='m-auto h-fit w-fit p-2'
              key={`${slideIndex.value}:image`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={slide.value.image}
                alt='Woman Aaru'
                width={500}
                height={500}
                className='h-96 lg:h-full'
              />
            </motion.div>
            {progressX ? (
              <Scrollbar
                range={[0.0, 0.21]}
                value={progressX}
                axis={{ primary: 'left', secondary: 'bottom' }}
              />
            ) : null}
          </motion.div>
          <motion.div
            variants={textVariants}
            className='relative border border-b-0 border-r-0 border-black lg:border-r'
          >
            {progressX ? (
              <>
                <Scrollbar
                  range={[0.21, 0.35]}
                  value={progressX}
                  axis={{ primary: 'bottom', secondary: 'left' }}
                />
                <Scrollbar
                  range={[0.35, 0.6]}
                  value={progressX}
                  axis={{ primary: 'left', secondary: 'top' }}
                />
                <Scrollbar
                  range={[0.6, 0.8]}
                  value={progressX}
                  axis={{ primary: 'top', secondary: 'right' }}
                />
              </>
            ) : null}
            <div className='mb-[230px] h-full w-full p-5 pb-0 lg:mb-0'>
              <motion.div
                className='mb-10 text-[13px] uppercase tracking-wide text-black'
                key={`${slideIndex.value}:tagline`}
                variants={textVariants}
              >
                {slide.value.label}
              </motion.div>
              <motion.h3
                className='font-serif text-4xl leading-[1.2] tracking-tighter text-black lg:text-[40px]'
                key={`${slideIndex.value}:description`}
                variants={textVariants}
              >
                {slide.value.tagline}
              </motion.h3>
            </div>
          </motion.div>
          <motion.div
            variants={boxVariants}
            className={`relative flex h-full w-full flex-col border-b border-l border-black lg:border-l-0 ${
              isFallback && index === slides.length - 1 ? 'mb-6' : ''
            }`}
          >
            <div className='flex h-full w-full pb-5 pl-5'>
              <div className='z-20 mt-auto flex max-w-[208px] flex-col space-y-[50px] bg-white p-4 pb-8'>
                <motion.p
                  className='border-t border-black py-[10px] text-sm tracking-tight text-black'
                  key={`${slideIndex.value}:tagp`}
                  variants={boxVariants}
                >
                  0{(index ?? slideIndex.value) + 1}
                </motion.p>
                <motion.p
                  className='border-t border-black py-[10px] text-sm tracking-tight text-black'
                  key={`${slideIndex.value}:desc`}
                  variants={boxVariants}
                >
                  {slide.value.description}
                </motion.p>
              </div>
            </div>
            {progressX ? (
              <Scrollbar
                range={[0.8, 1]}
                value={progressX}
                axis={{ primary: 'left', secondary: 'bottom' }}
              />
            ) : null}
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

Slide.displayName = 'Slide';

export default Slide;
