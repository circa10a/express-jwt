FROM node:alpine
ENV INSTALL_DIR=/usr/src/app
EXPOSE 8000
RUN mkdir -p $INSTALL_DIR && \
    chown -R node $INSTALL_DIR
USER node
COPY . $INSTALL_DIR
WORKDIR $INSTALL_DIR
RUN npm ci --only=production
CMD [ "npm", "start" ]
