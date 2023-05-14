---
title: '프로젝트 소개'
date: '2023-05-14'
categories: ['blog', 'intro']
summary: '학습 진도 설정 및 확인, 기술 스택 메모등을 위한 블로그를 생성하는 프로젝트이다.'
thumbnail: '../assets/icon.png'
menu: 'blog'
path: '/yeti_blog/intro'
---
# [Blog](https://github.com/yeti-s/blog)
blog to keep a record of goals, progress, and to preserve legacy while working on multiple projects.

 
* **dynamic pages:** create pages automatically from contents written by markdown.
* **customizable:** Virtual dom element should be editable cause of plan to add features such as point cloud viewer with three.js. So use template little.

# Installation
Environment to run this project.
* node v18

# Getting Started
1. clone source code & install dependency
    ```
    git clone https://github.com/yeti-s/blog
    cd blog
    npm install
    ```
2. start development
   ```
   npm start
   ```
3. deploy on local
    ```
    npm run build
    npm run serve
    ```
4. deploy on gh-page
   ```
   npm run deploy
   ```