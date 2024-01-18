/** @type {import('next').NextConfig} */
const nextConfig = {
  // //add images loaded by NextJS; currently a premature optimization
  // images:{
  //   loader: 'penn-state-logo',
  //   loaderFile: ''

  // },
  // ...
  webpack: (config, { webpack }) => {
      config.plugins.push(new webpack.IgnorePlugin({
          resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      }))

      return config
  },
}

module.exports = nextConfig