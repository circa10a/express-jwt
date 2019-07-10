# Express-JWT

An example API for creating/verifying json web tokens.

> Yes, the private key is in the repo. Not secure. I know.

## Usage

### Install Dependencies

```
npm install
```

### Start

```
npm start
```

### Docker

```shell
docker run -d --name express-jwt -p 8000:8000 circa10a/express-jwt
```

### Kubernetes

```
kubectl apply -f https://raw.githubusercontent.com/circa10a/express-jwt/master/k8s-deployment.yaml
```

Then navigate to http://localhost:8000/ to see the swagger api docs.

## Configuration

### Port

Default listens on port `8000`, but can be changed by specifying a `PORT` environment variable.

### Basic auth users

To obtain your JWT, you must authenticate against `/login` with Basic Auth.

There are 2 hardcoded sample users in `config/config.js` that can be used. You can also easily append to the object for more fake users.

**Users**

| user | password | base64 |
|---|---|---|
| admin | admin | YWRtaW46YWRtaW4= |
| guest | password | Z3Vlc3Q6cGFzc3dvcmQ= |

### JWT Expiration

In `config/config.js` the default expiration time of a JWT is `1h`

## Obtain token

```shell
curl -H "Authorization: Basic YWRtaW46YWRtaW4=" http://localhost:8000/login
```

## Auth with token

You can use the token previously acquired via curl or here's a token with no expiration you can test with:

```shell
curl -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1NjIzNDc0MzR9.g0-jxWgWVc98C6EzEWYoWxyIXVY3xmzgIZfD32PBZfrwrVrTiAqP69IrJ3DKBseeVgf2dwOm4ennwpakHXv-xxfZyMoM8-nfwJardv0Pr4bToBhGwxJhe-g1Hy7ygID5XpqQok9zY_R-0vZn-o-opi9VZYvTft9ZBAPEdj9oPZrRk_LfrrMQjO-oK9BiNQTjZm0rzFsqetk8FmqKwtb-TDPmmkgS0remsbsJzyvAi2x6r7fosljM2t0vjxdGzumbU4pxuSsQUjoRDzPG0VAH2rKNHECFqmCWJ8myIBOobYYAt7TIW0TzzJkyXb9amfDjy1IBlZyvwEznTUT_XBh6hQ" http://localhost:8000/protected
```