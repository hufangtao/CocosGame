#!/usr/bin/expect
set GAMEID 10001

set VER [lindex $argv [expr $argc-1]]

# 设定超时时间为3秒
set timeout 60
# fork一个子进程执行ssh命令

# spawn ssh root@120.132.22.102
spawn scp ./$VER.zip root@120.132.22.102:/data/xxxy_rc/hotfix/$GAMEID/
expect "*id_rsa*"
send "lixingtao\r"
# 期待匹配到 'user_name@ip_string's password:' 
expect "*password*"
# 向命令行输入密码并回车
send "webdywl*()\r"
interact

spawn ssh root@120.132.22.102
expect "*id_rsa*"
send "lixingtao\r"
# 期待匹配到 'user_name@ip_string's password:' 
expect "*password*"
# 向命令行输入密码并回车
send "webdywl*()\r"
expect "*#"
send "cd /data/xxxy_rc/hotfix/$GAMEID/ \r"
send "unzip -q $VER.zip \r"
send "exit \r"
interact


