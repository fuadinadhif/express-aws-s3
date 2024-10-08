# Deployment

## AWS EC2

1. Launch instance - Amazon Linux
2. Key Pair - `.pem`
3. Allow:
   1. SSH
   2. HTTPS
   3. HTTP
4. Open Instance menu and connect through SSH
5. Go run these commands in the terminal:

```bash
node -v
npm -v

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

nvm install --lts

sudo yum update -y
sudo yum install git -y

git -v

git clone "repository url"

npm i
npm start
```

2. Search for your Public IPv4 DNS
3. Configure the security group (firewall)
4. Configure `pm2` package

```bash
npm  install pm2 -g

pm2 start "file path"
pm2 status
pm2 monit
```

5. Make some changes in the repository
6. Push the change
7. Pull the change
8. Rerun build command
9. Restart pm2 `pm2 restart all | pm2 restart index`

## AWS RDS

1. Create database
2. Options:
   1. Creation method - Standard create
   2. Engine options - MySQL
   3. Templates - Free tier
   4. Settings:
      1. DB instance identifier: express-aws-s3
      2. Master username: admin
      3. Master password: mysqlpass
   5. Connectivity:
      1. Connect to an EC2 compute resource
      2. Create new VPC security group
3. Create database
4. Adjust the local `.env` file
5. Make `.env` file on the VPC

```bash

```
