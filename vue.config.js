// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   // transpileDependencies: true,
//   configureWebpack:{
//     resolve:{
//       alias:{
//         'assets':'@/assets',
//         'components':"@/components",
//         'views':'@/views',
//         'network':'@/network',
//         'common':'@/common'
//       }
//     }
//   }
// })


module.exports = {
  configureWebpack:{
        resolve:{
            alias:{
              'assets':'@/assets',
              'components':"@/components",
              'views':'@/views',
              'network':'@/network',
              'common':'@/common',
              'network':'@/network'
            }
        }
      }
}