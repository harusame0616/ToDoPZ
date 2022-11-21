const Components = require('unplugin-vue-components/vite');
const AutoImport = require('unplugin-auto-import/vite');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: (config) => {
    config.plugins = [
      ...config.plugins,
      AutoImport({
        include: [/\.vue$/, /\.vue\?vue/, /\.[tj]sx?$/],
        imports: ['vue'],
        dts: true,
        dirs: ['./components/**'],
      }),
      Components({
        dts: true,
        dirs: ['./components/**'],
      }),
    ];
    return config;
  },
};
