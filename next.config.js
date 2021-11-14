module.exports = {
  swcMinify: true,
  webpack5: true,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config, { isServer }) {
    config.module.rules.push(
      {
        test: /\.(mp4|jpg|png|svg)$/,
        exclude: /\.inline\.svg$/,
        issuer: /\.\w+(?<!(s?c|sa)ss)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: -1,
              fallback: "file-loader",
              publicPath: `/_next/static/chunks/images/`,
              outputPath: `${isServer ? "../" : ""}static/chunks/images/`,
              name: "[name].[hash:20].[ext]",
              esModule: true,
            },
          },
        ],
      },
      {
        test: /\.inline\.svg$/,
        loader: "raw-loader",
      },
    );
    return config;
  },
  images: {
    disableStaticImages: true,
  },
  assetPrefix: "",
}