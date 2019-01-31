#!/usr/bin/python

# This script is used to generate "tiny pngs".
# 
# 

##############################
# PLEASE CONFIG THE "api keys of tinypng" FIRST
API_KEYS = [
	'nWmsXPMsJhfQ4jYWVfmE1_9x8d5xwovN',	 #lixingtao@doozii.com
	'HAkjwuvlcR_RNUfucfSEf02wKpJrvOJf',  #bankcos@163.com
	'CFbs9RMfOJ1C7pBn1YktlOaZyLyDOTbY',   #coolkyxu1014@vip.qq.com
]
SIZE_PER_KEY = 100
##############################




'''
Param0: name of script
Param1: SRC files
Param2: DST files
Param3: SIZE of limit files
Param4: COMPRESS flag
param5: PATTERN 
'''

import tinify
import sys
import os
import re
from os.path import join, getsize

if len(sys.argv)<6 or sys.argv[1].strip()=='' or sys.argv[2].strip()=='' or sys.argv[3].strip()=='':
	print "ERROR of params! example: python gentiny.py {SRC} {DST} {SIZE} COMPRESS {PATTERN}"
	sys.exit()

print ''

# 1. prepare params
print "[1] PREPAREING PARAMS"
SRC = sys.argv[1]
DST = sys.argv[2]
SIZE = int(sys.argv[3])
FLAG = sys.argv[4]
PATTERN = sys.argv[5]
print ''


# 2. process files 
print "[2] PROCESS FILES"
pCount = 0
pIndex = 0
pKeyIndex = 0

def doProcessFile(srcDir, srcFile, dstDir, dstFile):
	if FLAG=="COMPRESS":
		print pCount, srcFile, getsize(srcFile), "=>"

		if not os.path.exists(dstDir):
			os.makedirs(dstDir)
		
		tinify.key = API_KEYS[pKeyIndex]
		tinify.from_file(srcFile).to_file(dstFile)

		print "=>", dstFile, getsize(dstFile), "[PROCESSED BY]", API_KEYS[pKeyIndex]
	elif FLAG=="COPY":
		print pCount, srcFile, getsize(srcFile), "=>"
		
		if not os.path.exists(dstDir):
			os.makedirs(dstDir)
		
		open(dstFile, "wb").write(open(srcFile, "rb").read())
		
		print "=>", dstFile, getsize(dstFile), "[PROCESSED BY]", API_KEYS[pKeyIndex]
	else:
		print pCount, srcFile, getsize(srcFile), "[WILL BE PROCESSED]"
		# print "=>", dstFile, "[WILL BE PROCESSED]"

def tryProcessFiles(dir): 

	global pIndex 
	global pKeyIndex
	global pCount

	for root, dirs, files in os.walk(dir):
		#print "root: ", root
		#print "dirs:", dirs
		#print "files:", files
		
		for i in range(0, len(files)):
			# 1. process file
			pos = files[i].endswith(PATTERN) 
			# pos = re.match(files[i], PATTERN)
			# print "Find PATTERN in", pos
			if not pos:
				continue

			srcFile = root + "/" + files[i]
			dstDir = root.replace(SRC, DST)
			dstFile = srcFile.replace(SRC, DST)
			
			fileSize = getsize(srcFile)
			if fileSize >= SIZE:
				#DO PROCESS
				doProcessFile(root, srcFile, dstDir, dstFile)

				pCount += 1
				pIndex += 1
				
				if pIndex >= SIZE_PER_KEY:
					pIndex = 0
					pKeyIndex += 1

					if pKeyIndex >= len(API_KEYS):
						print ''
						print "API_KEYS exhausted, ", pCount, "PROCESSED"
						print ''
						sys.exit()
			# else:
				# print pCount, srcFile, getsize(srcFile), "=>", dstFile, "[IGNORE]"
			
		for i in range(0, len(dirs)):
			tryProcessFiles(dirs[i])

# for root, dirs, files in os.walk(SRC):
# 	#size += sum([getsize(join(root, name)) for name in files])
# 	print "root: ", root
# 	print "dirs:", dirs
# 	print "files:", files
# 	sys.exit()

tryProcessFiles(SRC)
print ''

# 3. result stat
print "[3] RESULT STAT"
print "TOATAL [" + str(pCount) + "] PROCESSED SUCCFULLY"
print ''

sys.exit()

for i in range(0, len(sys.argv)):
	print "Param_", i, sys.argv[i]


#API_KEYS[0] = 'nWmsXPMsJhfQ4jYWVfmE1_9x8d5xwovN' #lixingtao@doozii.com
#API_KEYS[1] = 'HAkjwuvlcR_RNUfucfSEf02wKpJrvOJf' #bankcos@163.com

for i in range(0, len(API_KEYS)):
	print i, API_KEYS[i]


#print (API_KEYS[0])
#print (API_KEYS[1])
#tinify.key = 'nWmsXPMsJhfQ4jYWVfmE1_9x8d5xwovN'

#tinify.from_file('unoptimized.png').to_file('optimized.png')
