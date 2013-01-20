#/bin/sh

/usr/bin/sudo -S /opt/local/bin/redis-server /opt/local/etc/redis.conf | echo &
/usr/bin/sudo -S /opt/local/lib/mysql55/bin/mysqld_safe
