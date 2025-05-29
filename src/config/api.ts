type Environment = 'development' | 'production';

interface ApiConfig {
  baseURL: string;
}

interface ApiConfigs {
  development: ApiConfig;
  production: ApiConfig;
}

export const API_CONFIG: ApiConfigs = {
  development: {
    baseURL: 'https://backend-dev.nervlib.ru/api',
  },
  production: {
    baseURL: 'https://backend-dev.nervlib.ru/api',
  },
};

export const getApiConfig = (): ApiConfig => {
  const env = (process.env.NODE_ENV || 'development') as Environment;
  return API_CONFIG[env];
};
