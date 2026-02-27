#!/bin/bash
# One-time setup for local MySQL (Homebrew). No Docker required.
#
# 1. Install and start MySQL:
#    brew install mysql && brew services start mysql
#
# 2. Create database and user (root may have no password on fresh install):
#    mysql -u root -e "CREATE DATABASE IF NOT EXISTS railway; CREATE USER IF NOT EXISTS 'app'@'localhost' IDENTIFIED BY 'localdev'; GRANT ALL ON railway.* TO 'app'@'localhost'; FLUSH PRIVILEGES;"
#
# 3. Run this script to create tables:
#    chmod +x scripts/setup-local-mysql.sh && ./scripts/setup-local-mysql.sh
#
# 4. In .env set: USE_LOCAL_DB=1
# 5. Start app: node app.js

mysql -u app -plocaldev railway -e "
CREATE TABLE IF NOT EXISTS schools (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, board VARCHAR(255), address TEXT, est_in INT, created_at DATETIME(6), updated_at DATETIME(6));
CREATE TABLE IF NOT EXISTS teachers (id INT AUTO_INCREMENT PRIMARY KEY, school_id INT, name VARCHAR(255), subject VARCHAR(255), created_at DATETIME(6), updated_at DATETIME(6));
CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT PRIMARY KEY, school_id INT, name VARCHAR(255) NOT NULL, classes VARCHAR(255), roll_number VARCHAR(255), dob DATE, created_at DATETIME(6), updated_at DATETIME(6));
CREATE TABLE IF NOT EXISTS student_teacher (student_id INT NOT NULL, teacher_id INT NOT NULL, PRIMARY KEY (student_id, teacher_id));
"
echo "Local MySQL schema ready. In .env set USE_LOCAL_DB=1 and LOCAL_DATABASE_URL=mysql://app:localdev@127.0.0.1:3306/railway"