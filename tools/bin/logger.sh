#!/usr/bin/expect
#
spawn ssh Sam@192.168.0.130
expect "*id_rsa*"
send "lixingtao\r"
# 期待匹配到 'user_name@ip_string's password:' 
expect "*assword*"
# 向命令行输入密码并回车
send "dygame\r"
expect "*:"
send "cd ~/Desktop/OneKey/ \r"
expect "*:"
send "ls -al \r"
interact