import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const mediaItems = [
  {
    title: 'French Fire victim works to create technology to help others who lose home',
    type: 'CBS News',
    date: 'July 10, 2024',
    source: '',
    thumbnail: '/partners/cbs.jpg',
    url: 'https://www.cbsnews.com/sacramento/news/french-fire-victim-works-to-create-technology-to-help-others-who-lose-home/',
  },
  {
    title: 'California fire victim launches app to help others with insurance claims',
    type: 'CBS News',
    date: 'January 7, 2025',
    source: '',
    thumbnail: '/partners/cbs-2.jpeg',
    url: 'https://www.cbsnews.com/sacramento/news/california-fire-victim-launches-app-help-with-insurance-claims/',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const socialIcons = {
  twitter: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  linkedin: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
};

export default function MediaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleShare = (platform: string, url: string) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  return (
    <section ref={sectionRef} className="relative py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
            >
              <span className="text-primary-gold">Latest Updates</span>
            </motion.div>
            <h2 className="mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-3xl font-light text-transparent sm:text-4xl">
              In the Media
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
            {/* Animated Background Gradients */}
            <motion.div
              className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-accent-gold-light/5 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative space-y-6">
              {mediaItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-accent-gold-light/50"
                  >
                    {/* Hover Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-gold-light/0 via-accent-gold-light/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      animate={{
                        x: ['0%', '100%'],
                        opacity: [0, 0.1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    
                    <div className="relative flex gap-6">
                      {/* Thumbnail */}
                      <div className="relative hidden h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-800 sm:block">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-grow flex-col">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center rounded-full border border-accent-gold-light/20 bg-accent-gold-light/5 px-2.5 py-0.5 text-sm text-primary-gold">
                              {item.type}
                            </span>
                            <span className="text-sm text-neutral-500">{item.source}</span>
                          </div>
                          <span className="text-sm text-neutral-500">{item.date}</span>
                        </div>
                        <h3 className="text-lg font-light text-white group-hover:text-primary-gold">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
