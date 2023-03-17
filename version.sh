#!/bin/bash

FILENAME='./package.json'
packageVersion=''

# 1. 读取package.json的version：
while read line;
do
  if [[ "$line" =~ ^\"version\": ]]; then
    packageVersionStr=${line##'"version": '}
    packageVersion=${packageVersionStr//[\"|,]/}
    break;
  fi
done < ${FILENAME}

# 2. 生成版本文件：
if [ "${packageVersion}" != "" ]; then
  cd ./dist*;
  rm -rf *.version.txt;
  touch ${packageVersion}.version.txt;
else
  echo '版本信息获取失败，无法生成版本文件！'
fi

