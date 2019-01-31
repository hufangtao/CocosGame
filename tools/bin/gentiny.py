#!/usr/bin/python

# This script is used to generate "tiny pngs".
# 
# 
'''
Param0: name of script
Param1: SRC files
Param2: DST files
Param3: SIZE of limit files
Param4: COMPRESS flag
param5: PATTERN 
'''

# import tinify
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
pKeyIndex = 1

def doProcessFile(srcDir, srcFile, dstDir, dstFile):
	if FLAG=="COMPRESS":
		print pCount, srcFile, getsize(srcFile), "=>"
		os.system("./bin/pngquant/pngquant --force --ordered --speed=1 --quality=50-90 --ext=.png " + srcFile)

		print "=>", dstFile, getsize(dstFile)
	elif FLAG=="COPY":
		print pCount, srcFile, getsize(srcFile), "=>"
		
		if not os.path.exists(dstDir):
			os.makedirs(dstDir)
		
		open(dstFile, "wb").write(open(srcFile, "rb").read())
		
		print "=>", dstFile, getsize(dstFile)
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
				
				# if pIndex >= SIZE_PER_KEY:
				# 	pIndex = 0
				# 	pKeyIndex += 1

				# 	if pKeyIndex >= len(API_KEYS):
				# 		print ''
				# 		print "API_KEYS exhausted, ", pCount, "PROCESSED"
				# 		print ''
				# 		sys.exit()
			# else:
				# print pCount, srcFile, getsize(srcFile), "=>", dstFile, "[IGNORE]"
			
		for i in range(0, len(dirs)):
			tryProcessFiles(dirs[i])

tryProcessFiles(SRC)
print ''

# 3. result stat
print "[3] RESULT STAT"
print "TOATAL [" + str(pCount) + "] PROCESSED SUCCFULLY"
print ''

sys.exit()

