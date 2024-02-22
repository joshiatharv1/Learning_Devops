sleep 30

sudo dnf -y install mysql-server



sudo systemctl start mysqld



sleep 30
sudo mysql -u root -e "CREATE DATABASE test;"

sudo mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';"

echo "DatabaseScript ran successfully."