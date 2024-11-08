export default function VideoPlayer() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className='absolute inset-0 h-full w-full object-cover'
    >
      <source src='/assets/main/platform.mp4' type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
