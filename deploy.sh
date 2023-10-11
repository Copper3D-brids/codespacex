#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

rm -rf dist/

# 生成静态文件
pnpm run docs:build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git config --global user.email "gaolinkun123@gmail.com"
git config --global user.name "LinkunGao"
git branch

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/LinkunGao/codespacex_blog.git master:gh-pages

cd -
