import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Load allowed hosts from an environment variable, defaulting to an empty array if not set
  const allowedHosts = process.env.ALLOWED_HOSTS?.split(',') || [];

  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      allowedHosts, // Use the dynamically loaded allowed hosts
    },
  });
};