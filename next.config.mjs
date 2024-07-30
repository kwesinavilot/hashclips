/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.hashnode.com', 'localhost', '127.0.0.1', 'hashclips.vercel.app', 'cdn.hashnode.com'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'hashclips.vercel.app',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.hashnode.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
