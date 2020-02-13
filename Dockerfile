FROM testcafe/testcafe

USER root

WORKDIR /app/test


COPY . /app/test

ENV HTTP_PROXY 'http://192.168.204.70:8080'
ENV HTTPS_PROXY 'http://192.168.204.70:8080'

RUN npm install


ENTRYPOINT [ "npm", "test" ]