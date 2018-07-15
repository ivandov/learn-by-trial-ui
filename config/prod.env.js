module.exports = {
  NODE_ENV: '"production"',
  API_URL: JSON.stringify(process.env.API_URL)
  // module: {
  //   rules: [
  //     // ... other rules omitted

  //     // this will apply to both plain `.scss` files
  //     // AND `<style lang="scss">` blocks in `.vue` files
  //     {
  //       test: /\.scss$/,
  //       use: [
  //         'vue-style-loader',
  //         'css-loader',
  //         {
  //           loader: 'sass-loader',
  //           options: {
  //             // you can also read from a file, e.g. `variables.scss`
  //             data: `$color: red;`
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
}
