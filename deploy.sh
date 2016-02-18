#!/bin/bash
# by haishanh
# from https://github.com/hexojs/hexo-deployer-git/blob/master/lib/deployer.js

REPO=git@github.com:haishanh/notedown.git
BRANCH=gh-pages
DEPLOY_DIR=.deploy_git
PUBLIC_DIR=output
GIT=git

setup()
{
  dir=$DEPLOY_DIR
  mkdir $dir
  pre_dir=$(pwd)
  cd $dir

  touch dummy_file
  $GIT init
  $GIT add -A
  $GIT commit -m "First commit"

  cd $pre_dir
}

push()
{
  dir=$DEPLOY_DIR
  mkdir $dir
  pre_dir=$(pwd)
  cd $dir

  time=$(date "+%y/%m/%d %T")
  $GIT add -A
  $GIT commit -m "site update ${time}"
  $GIT push -u $REPO HEAD:$BRANCH --force

  cd $pre_dir
}

#    - MAIN -

# setup the repo if it does not exist
[ ! -d $DEPLOY_DIR ] && setup
# clean it up
rm -rf $DEPLOY_DIR/*
# copy files
cp -r $PUBLIC_DIR/* $DEPLOY_DIR
# push to remote
push
