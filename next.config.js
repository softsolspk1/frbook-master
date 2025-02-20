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
    domains: ['localhost','134.209.152.216','respire2api.demowebsite.world'],
  },
};

module.exports = nextConfig;
