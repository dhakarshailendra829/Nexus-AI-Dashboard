# AWS EC2 Static Website Hosting with IAM Access Control

## 🚀 Deployed Project Link
http://3.15.172.41/

---

## 📌 Project Description
This project demonstrates hosting a static website (HTML, CSS, JS) on AWS EC2 using Apache server with IAM access control for different users.

---

## ☁️ AWS Services Used
- Amazon EC2
- IAM (Identity and Access Management)
- Elastic IP
- Apache Web Server (httpd)

---

## 🌐 Deployment Steps
1. Launch EC2 instance (Amazon Linux)
2. Install Apache server
3. Clone GitHub repository
4. Copy files to `/var/www/html`
5. Configure Security Group (HTTP port 80 open)
6. Attach Elastic IP
7. Access website via public IP

---

## 👤 IAM Users Setup

### User 1 (No Permissions)
- Cannot access EC2 dashboard
- Access denied screenshot captured

### User 2 (EC2 Access)
- Has `AmazonEC2FullAccess`
- Can view and manage EC2 instances

---

## 📸 Screenshots

### 1. EC2 Instance (AWS Console)
(Add screenshot showing instance running with your name visible)

### 2. Website Running
(Add screenshot of http://3.15.172.41/ working)

### 3. IAM User 1 Login
(Add access denied screenshot)

### 4. IAM User 2 Login
(Add EC2 dashboard visible screenshot)

---

## ⚠️ Challenges Faced
- Security group port 80 issue
- Apache server configuration
- IAM policy setup confusion

---

## 🛠️ Solution
- Opened HTTP port in security group
- Restarted Apache using `systemctl restart httpd`
- Assigned correct IAM policies

---

## 📌 Final Note
Elastic IP is used for stable public access of deployed website.
