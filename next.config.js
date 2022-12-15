/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // remotePatterns: [
    //   {
    //     'protocol': 'https:',
    //     hostname: 'matrix.matrix.notes.site',
    //     port: '',
    //     // pathname: '/_matrix/media/r0/download/matrix.notes.site/**'
    //   }
    // ]
    domains: ['matrix.matrix.notes.site']
  }
}

module.exports = nextConfig
