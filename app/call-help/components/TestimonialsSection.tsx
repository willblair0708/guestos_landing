import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

const testimonials = [
  {
    content: "The AI hotline was a lifeline during evacuation. It gave me real-time updates about safe routes and shelter locations when I needed them most.",
    author: "Sarah M.",
    role: "Palisades Resident",
  },
  {
    content: "I was amazed by how quickly I could connect with resources. No waiting on hold, just immediate assistance when every minute counted.",
    author: "David K.",
    role: "Community Volunteer",
  },
  {
    content: "Being able to call at 3 AM and get accurate information about the fire's movement helped us make critical decisions about when to evacuate.",
    author: "Maria R.",
    role: "Local Business Owner",
  },
  {
    content: "The service connected me with nearby shelters that could accommodate both my family and our pets. It was exactly what we needed in that moment.",
    author: "James L.",
    role: "Evacuee",
  },
  {
    content: "As a volunteer coordinator, having a reliable source of information to direct people to has been invaluable. It's made our response more efficient.",
    author: "Lisa T.",
    role: "Relief Coordinator",
  },
  {
    content: "The fact that it's available 24/7 and always up-to-date gives me peace of mind. It's like having an emergency response team in your pocket.",
    author: "Michael P.",
    role: "Community Member",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold-light bg-accent-gold-light/10 px-4 py-2"
          >
            <span className="text-primary-gold">Community Stories</span>
          </motion.div>
          <h2 className="mt-8 text-4xl font-light tracking-tight text-white sm:text-5xl">
            Real People, Real Impact
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-400">
            Hear from community members who have used our AI-powered hotlines during critical moments.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-accent-gold-light/20 bg-neutral-900/50 p-8 backdrop-blur-sm"
            >
              <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-accent-gold-light/5 blur-2xl" />
              
              <div className="relative">
                <svg
                  className="h-8 w-8 text-primary-gold"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="mt-4 text-lg leading-relaxed text-neutral-300">
                  {testimonial.content}
                </p>
              </div>
              <div className="relative mt-8 border-t border-accent-gold-light/10 pt-8">
                <div className="font-medium text-white">{testimonial.author}</div>
                <div className="mt-1 text-sm text-primary-gold">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 