#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

cd ../..

cd tmp

sudo dnf install -y unzip

sudo unzip webapp.zip

echo "APP_PORT=3000" > .env
echo "DB_PORT=3306" >> .env
echo "DB_HOST=localhost" >> .env
echo "DB_USER=root" >> .env
echo "DB_PASS=root" >> .env
echo "MYSQL_DB=test" >> .env

sudo npm install





