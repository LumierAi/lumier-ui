import {
  defineNuxtModule,
  installModule,
  createResolver, addImportsDir
} from 'nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'design',
    configKey: 'design',
  },
  async setup(moduleOptions, nuxt) {
    const { resolve, } = createResolver(import.meta.url);
    console.info('design module setup');
    nuxt.options.css.push(resolve('./fonts/font-face.css'));
    nuxt.options.css.push(resolve('./typography/index.css'));

    // Install tailwindcss
    await installModule('@nuxtjs/tailwindcss', {
      configPath: 'tailwind.config',
    });

  },
});
