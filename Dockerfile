FROM mcr.microsoft.com/playwright:v1.50.1

WORKDIR /app

COPY package.json  ./

RUN npm install

RUN npx playwright install --with-deps

COPY . .

CMD ["npx", "playwright", "test"]
