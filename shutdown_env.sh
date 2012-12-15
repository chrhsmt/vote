#/bin/sh

/usr/bin/sudo /opt/local/lib/mysql55/bin/mysqladmin shutdown -u root -p
/usr/bin/sudo /opt/local/bin/redis-cli shutdown