/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return[{
            source: '/web',
            destination: '/',
            permanent: true,
        }]
    }
};

export default nextConfig;
