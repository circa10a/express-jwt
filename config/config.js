module.exports = {
  basicAuthConfig: {
    challenge: true,
    users: {
      admin: 'admin',
      guest: 'password',
    },
    unauthorizedResponse: { error: 'Unauthorized' },
  },
  jwtConfig: {
    expiresIn: '1h',
    algorithm: 'RS256',
  },
  swaggerConfig: {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'Express-JWT',
        version: '1.0.0',
      },
      basePath: '/',
      components: {
        securitySchemes: {
          basicAuth: {
            type: 'http',
            scheme: 'basic',
          },
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['./routes/routes.js'],
  },
};
