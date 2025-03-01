const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      'localhost',
      '134.209.152.216',
      'respire2api.demowebsite.world',
      'frbook-api-master-1.onrender.com' // Added new hostname
    ],
  },
};

module.exports = nextConfig;
