#/bin/sh

/usr/bin/sudo /opt/local/lib/mysql55/bin/mysqld_safe | echo &
/usr/bin/sudo /opt/local/bin/redis-server /opt/local/etc/redis.conf &