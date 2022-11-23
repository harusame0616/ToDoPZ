import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import TsconfigPaths from 'vite-tsconfig-paths';
import { StorybookConfig } from '@storybook/core-common';

type StorybookConfigWithVite = StorybookConfig & {
  viteFinal: any;
};

const config: StorybookConfigWithVite = {
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
      TsconfigPaths(),
    ];
    return config;
  },
};

export default config;
