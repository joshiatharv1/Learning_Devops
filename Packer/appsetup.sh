#!/bin/bash
"sleep 30"
# Update package index
sudo dnf -y update

# Install Node.js and npm
sudo dnf -y install nodejs npm

# Install MySQL
sudo dnf -y install mysql-server

# Start MySQL service
sudo systemctl start mysqld

