FROM testcafe/testcafe

USER root 

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

RUN npm install


CMD ["chromium:headless", "Tests"]




