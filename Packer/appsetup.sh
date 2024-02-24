cd /tmp

# Install unzip
sudo yum install -y unzip

# Unzip webapp.zip to /tmp
sudo unzip -o webapp.zip -d /tmp

# Install curl (if not already installed)
sudo yum install -y curl
curl –sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs


# Create .env file
echo "APP_PORT=3000" > .env
echo "DB_PORT=3306" >> .env
echo "DB_HOST=localhost" >> .env
echo "DB_USER=root" >> .env
echo "DB_PASS=root" >> .env
echo "MYSQL_DB=test" >> .env

# Display current directory after unzip
echo "Current directory after unzip: $(pwd)"

# List files in current directory after unzip
echo "Files in current directory after unzip:"
ls -l

echo "Current directory after trying to reach webapp: $(pwd)"
ls
unzip webapp.zip -d /tmp


cd /tmp
sudo npm install

# Check Node.js version
node --version
