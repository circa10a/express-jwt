const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const basicAuth = require('express-basic-auth');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const invalidTokenHandler = require('../middleware/invalidTokenHandler');
const { privateKey, publicKey } = require('../lib/keys');
const { jwtConfig, basicAuthConfig, swaggerConfig } = require('../config/config');

const swaggerSpec = swaggerJSDoc(swaggerConfig);

const router = express.Router();

// Ensure user gets to api docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.get('/', (req, res) => {
  res.redirect('/api-docs');
});

/**
   * @swagger
   * /login:
   *   get:
   *     summary: Login to the application via basic auth(use admin:admin)
   *     tags: [Login (Get JWT)]
   *     security:
   *       - basicAuth: []
   *     responses:
   *       '200':
   *         description: returns json with user and token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   type: string
   *                   description: user authenticated with
   *                 token:
   *                   type: string
   *                   description: JWT
   *       '401':
   *          description: returns error in json
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: authentication status
   */
router.get('/login', basicAuth(basicAuthConfig), (req, res) => {
  const { user } = req.auth;
  const token = jwt.sign({ user, data: 'some example data' }, privateKey, jwtConfig); // config => expire time, algorithm
  res.json({ user, token });
});

/**
   * @swagger
   * /protected:
   *   get:
   *     summary: Authenticate with the application using JWT (bearer auth)
   *     tags: [Protected route (Use JWT)]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       '200':
   *         description: returns authentication status
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: authorization status
   *                 jwtData:
   *                   type: object
   *                   description: jwt data
   *                   properties:
   *                     user:
   *                       type: string
   *                       description: username
   *                     data:
   *                       type: string
   *                       description: example data sent back from server
   *                     iat:
   *                       type: integer
   *                       description: issued at timestamp
   *                     exp:
   *                       type: integer
   *                       desscription: expires at timestamp
   *       '401':
   *         description: returns authentication status
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: authorization/token validity status
   */
router.get('/protected', expressJwt({ secret: publicKey }), invalidTokenHandler, (req, res) => {
  if (req.user) {
    res.status(200).json({ status: 'Authorized', jwtData: req.user });
  }
});

module.exports = router;
