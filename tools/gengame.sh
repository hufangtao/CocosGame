# !/bin/bash

# 1. compare to encrypt src
filepath=$(cd "$(dirname "$0")"; pwd)
cd $filepath

GAMEID=10001

VER=$1
PUBLISH=$2
UPLOAD=$3
COMPILE=$4
DST=$GAMEID/$VER

if [ ! -n "$VER" -o ! -n "$PUBLISH" -o ! -n "$UPLOAD" -o ! -n "$COMPILE" ]; then
echo "example: gengame.sh {Ver} {PublishDir} {NeedUpload} {NeedCompile}"
exit 0
fi

#for build
COCOS_CREATOR=/Applications/Develop/CocosCreator1.9.1.app/Contents/MacOS/CocosCreator
JSTOOL=/Applications/Develop/CocosCreator1.9.1.app/Contents/Resources/cocos2d-x/tools/cocos2d-console/plugins/plugin_jscompile/bin/jsbcc

PROGRAM_PATH=~/Workspace/DYGameH
BACKUP_SRC_PATH=$PROGRAM_PATH/build/jsb-default/backup-src/
mkdir -pv $BACKUP_SRC_PATH
src_proj_file=$PROGRAM_PATH/build/jsb-default/src/project.dev.js
bak_proj_file=$PROGRAM_PATH/build/jsb-default/backup-src/project.map.js
proj_file=$PROGRAM_PATH/build/jsb-default/src/project.jsc


echo "0. Compiling ..."
# $COCOS_CREATOR --path $PROGRAM_PATH --build "platform=android;debug=true"
# cp $src_proj_file $bak_proj_file
$COCOS_CREATOR --path $PROGRAM_PATH --build "platform=android;debug=false"
# $JSTOOL $bak_proj_file $proj_file
git checkout ../build/jsb-default/main.js

echo "0.1 Tining the PNGs..."
# ./bin/gentiny.py ../build/jsb-default/res/ ../build/jsb-default/res/ 150000 COMPRESS ".png"

#for res
echo "1. Copying package files ..."
echo $PUBLISH
echo $DST

rm -rf $PUBLISH/$DST/
mkdir -pv $PUBLISH/$DST/

cp -R ../build/jsb-default/res $PUBLISH/$DST/
cp -R ../build/jsb-default/src $PUBLISH/$DST/

#for manifest
echo "2. Generating Manifests ..."
node ./bin/version_generator.js -v $VER -u http://xxxy.dayukeji.com/hotfix/$DST/  -s ../build/jsb-default/ -d $PUBLISH/$DST/

#update project.manifest
echo "3. Update project.manifest ..."
cp $PUBLISH/$DST/project.manifest ../assets
cp $PUBLISH/$DST/project.manifest ../build/jsb-default/res/raw-assets/

echo "4. Generating bundle ..."
rm -rf $PUBLISH/$DST/
mkdir -pv $PUBLISH/$DST/
cp -R ../build/jsb-default/res $PUBLISH/$DST/
cp -R ../build/jsb-default/src $PUBLISH/$DST/
node ./bin/version_generator.js -v $VER -u http://xxxy.dayukeji.com/hotfix/$DST/  -s ../build/jsb-default/ -d $PUBLISH/$DST/

cp $bak_proj_file $PUBLISH/$DST/project.map.js

echo "5. Making zip file..."
cd ./$GAMEID
zip -qr $VER.zip ./$VER/*

if [ "$UPLOAD" == "true" -o "$UPLOAD" == "TRUE" -o "$UPLOAD" == "yes" -o "$UPLOAD" == "YES" ]; then
echo "6. Uploading ..."
../genpub.sh $VER
fi

if [ "$COMPILE" == "true" -o "$COMPILE" == "TRUE" -o "$COMPILE" == "yes" -o "$COMPILE" == "YES" ]; then
echo "7. Compiling to platform"
$COCOS_CREATOR --path $PROGRAM_PATH --compile "platform=android;debug=false"
fi

echo "Finished!"


