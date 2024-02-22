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

sudo systemctl restart mysqld

sleep 10

sudo systemctl start myservice

echo "Service Script ran successfully."