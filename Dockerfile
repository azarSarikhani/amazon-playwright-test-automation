FROM mcr.microsoft.com/playwright:v1.50.1

USER root

WORKDIR /app

COPY . .

RUN npm install

RUN npx playwright install --with-deps

EXPOSE 9323

CMD ["sh", "-c", "npx playwright test --reporter=html && npx playwright show-report && tail -f /dev/null"]

