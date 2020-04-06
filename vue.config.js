const tsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  runtimeCompiler: true,
  assetsDir: 'public',
  publicPath: isProd ? './' : '/',
  // webpack的相关配置
  configureWebpack: {
    entry: './src/renderer/main.ts',
    module: {
      rules: [ {
        test: /\.(html)(\?.*)?$/,
        use: 'vue-html-loader'
      }
      ]
    },
    // 性能警告修改
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  // webpack-chain 设置
  chainWebpack: (config) => {
    config.resolve.alias.delete('@')
    config.resolve
      .plugin('tsconfig-paths')
      .use(tsconfigPathsWebpackPlugin)
  },
  // 打包输出路径
  // outputDir: 'dist/web',
  // 第三方插件配置
  pluginOptions: {
    // vue-cli-plugin-electron-builder配置
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: 'com.example.app',
        // 项目名，也是生成的安装文件名，即aDemo.exe
        productName: 'aDemo',
        // 版权信息
        copyright: 'Copyright © 2019',
        // 目录配置
        directories: {
          output: './dist'
        },
        // WindowsConfiguration
        win: {
          // 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
          icon: 'icons.iconset/icon.ico',
          // 
          target: [
            {
              // 打包成一个独立的 exe 安装程序
              target: 'zip',
              // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
              arch: [
                'x64',
                // 'ia32'
              ]
            }
          ]
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        linux: {
          icon: 'icons.iconset/icon_256x256.png'
        },
        mac: {
          icon: 'icons.iconset/icon.icns'
        },
        files: [ '**/*' ],
        asar: true,
        nsis: {
          // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          oneClick: false,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: true,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          allowToChangeInstallationDirectory: true,
          // 安装图标
          installerIcon: 'icons.iconset/icon.ico',
          // 卸载图标
          uninstallerIcon: 'icons.iconset/icon.ico',
          // 安装时头部图标
          installerHeaderIcon: 'icons.iconset/icon.ico',
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true
        }
      },
      chainWebpackMainProcess: config => {
        config.resolve.alias.delete('@')
        config.resolve
          .plugin('tsconfig-paths')
          .use(tsconfigPathsWebpackPlugin)
        config.plugin('define').tap(args => {
          args[ 0 ][ 'IS_ELECTRON' ] = true
          return args
        })
      },
      chainWebpackRendererProcess: config => {
        config.plugin('define').tap(args => {
          args[ 0 ][ 'IS_ELECTRON' ] = true
          return args
        })
      },
      outputDir: 'dist/electron',
      mainProcessFile: 'src/main/main.ts',
      mainProcessWatch: [ 'src/main' ],
      // mainProcessArgs: []
    },
  },
}