import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  poweredByHeader: false,
  // Local network preview on the owner's development machine.
  allowedDevOrigins: ['192.168.31.64'],
};

export default config;
