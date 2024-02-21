sleep 30

sudo systemctl status mysqld

sudo systemctl start mysqld

mysql -u root

ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';

CREATE DATABASE test;

exit