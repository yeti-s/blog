---
title: 'CLPE 프로젝트 소개'
categories: ['CLPE', 'intro']
summary: 'LIDAR의 측위 오차 보정을 위한 프로그램 개발 프로젝트'
thumbnail: '../assets/icon.png'
---

## CLPE
CLPE(correcting lidar poisition error)로 LIDAR의 Localization시 GNSS의 측위 오차로 발생하는 동일한 구간을 촬영한 서로 다른 데이터를 보정하는 프로젝트이다.

## 학습 데이터 구축

사진1(도로 표시가 있는 작은 point cloud 데이터) -> 사진2(도로 표시의 boundary 내에만 존재하는 point cloud 데이터와 boundary 데이터)

### 필요한 것
* manipulating point cloud data program (c++)
* visualizing point cloud data program (js)

### 필요한 기술 스택
* libary to manipulate point cloud data (c++)
* electron <-> file system access (js)
* call c lib from js (js)

### 개발 순서
1. find lidar open dataset.
2. 