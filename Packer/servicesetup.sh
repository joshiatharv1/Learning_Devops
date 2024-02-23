cd /tmp

sleep 30

cat <<EOF > myservice.service
[Unit]
Description=app.js

After=network.target

[Service]
Type=simple
User=csye6225
EnvironmentFile=/tmp/.env
ExecStart=/usr/bin/node /tmp/app.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

sudo mv myservice.service /etc/systemd/system/

sleep 10

sudo systemctl enable mysqld
sudo systemctl start mysqld

cd /etc/systemd/system/
sudo systemctl daemon reload

sudo systemctl enable myservice
sudo systemctl start myservice

sudo systemctl restart mysqld
sudo systemctl stop myservice
sudo systemctl start myservice