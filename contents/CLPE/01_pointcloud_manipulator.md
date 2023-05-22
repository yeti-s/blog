---
title: 'Pointcloud Manipulator'
categories: ['clpe', 'pointcloud_manipulator']
summary: 'Point cloud 데어터를 조정할 수 있는 C 프로그램'
thumbnail: '../assets/icon.png'
---
Pointcloud 데이터를 사용자의 요청대로 조작할 수 있는 lib 형태의 프로그램을 제작한다.

## 배경 지식
### Potree
> point cloud octree로 point cloud 데이터를 octree의 형태로 쪼개어 render 하는 형식.
![octree](./assets/01_octree.png "출처 - https://developer.apple.com/documentation/gameplaykit/gkoctree")

## 학습 데이터 구축

사진1(도로 표시가 있는 작은 point cloud 데이터) -> 사진2(도로 표시의 boundary 내에만 존재하는 point cloud 데이터와 boundary 데이터)


## 필요한 기술 스택
* libary to manipulate point cloud data (c++)
* electron <-> file system access (js)
* call c lib from js (js)



# 개발 순서

## 1. find lidar open dataset.

* [KITTI](https://www.cvlibs.net/datasets/kitti/eval_object.php?obj_benchmark=3d)
> 
> 용량이 29GB나 되니 여유 있을때 다운로드 받자.
> 
> 도로를 대상으로 촬영한 데이터가 아닌 것 같다.
> 
> ![KITTI_potree](./assets/01_KITTI_potree.PNG)
>
> 사실 애는 이거 말고도 데이터가 많은 것 같은데 나중에 살펴보자.

* [Toronto_3D](https://github.com/WeikaiTan/Toronto-3D)

> Intensity value가 없어서 부적합
> 
![toronto_3d_potree_viewer](./assets/01_toronto_3d_potree_viewer.PNG)
![toronto_3d_laslib](./assets/01_toronto_3d_no_intensity.PNG)

* [Paris-Lille-3D](https://npm3d.fr/paris-lille-3d)

## 2. Electron & React 

> 로컬 환경에서 어플리케이션으로 구동 가능하도록 Electron에 react를 올려 사용할 것이다. 또 three.js 나 potree-core 등 point cloud loading에 필요한 패키지도 함께 설정하자.

> C++ 개발과 동시에 진행하기 떄문에 wsl 환경에서 진행 할 것인데, GUI 문제가 있으므로 X-server등을 잘 활용해서 환경을 만들어 두자!. 나는 VcXsrv 사용했다.
![electron on VcXsrv](./assets/01_electron_on_vcxsrv.PNG "electron on VcXsrv")



>기본 index 페이지에서 부터 point cloud 화면을 띄울 수 있도록 3D canvas로 만들자. point cloud 데이터를 file system에서 가져오기 위해서는 electron 과 renderer의 ipc(inter-process communication)가 필요하다.
```javascript
// renderer.jsx
import {ipcRenderer} = window.require('electron');
```

>window.require is not a function 오류가 발생한다면 아래와 같이 main.js에 추가해주자.
```javascript
function createWindow() {
    ...
    webPreferences: {
        ...
        // TypeError: window.require is not a function 일때 추가
        contextIsolation: false
    }
};
```

>potree-core의 loadPointCloud 함수 내부 여러 데이터를 load하기 위한 함수로 fetch를 사용한다. 

```javascript
// https://github.com/tentone/potree-core/blob/master/source/loading2/OctreeLoader.ts#L284
let response = await fetch(hierarchyPath, {
    headers: {
        'content-type': 'multipart/byteranges',
        'Range': `bytes=${first}-${last}`
    }
});
```

>하지만 electron의 renderer는 직접접으로 file system에 접근할 수 없기 때문에 이를 ipcRenderer, ipcMain으로 대체해야 한다. potree-core 내부 소스 코드를 수정해야하니 npm 으로 모듈을 설치하지 말고 git으로 코드를 가져오자. ipc로 fetch와 xphRequest를 대체하였으나, 모듈에서 구현된 소스코드가 적어 시간이 많이 소요될 것으로 예상, PotreeDesktop의 구조처럼 사용하기로 결정했다. 레포지토리 다시 파자,, file system에 접근하기 위해 window.fetch를 IPC.Renderer 함수로 덮어씌워버리는 무식한 방법을 사용해서 테스트를 해보았다.
```javascript
const fetchFile = (path, headers) => {
    return new Promise((resovle, reject)=> {
        ipcRenderer.invoke('fetch-file', path, headers).then((res) => {
            resovle(new Response(res))
        })
    })
}
window.fetch = fetchFile;
```

>![slow_loading](./assets/01_slowly_loading_potree.gif "slow_loading")
너무 느리다. ipc 통신이 http통신보다 더 느린가보다. 일단 바쁘니 나중에 비교하자. expressjs로 file을 serve하는 간단한 기능을 가진 서버를 구축해서 electron을 제거하고 다시 시작해보자. 창 여러개 띄우고 실행할 수 있으니 이게 더 좋은 방법일수도 있겠다. 개발 환경에서도 로딩이 느린 문제가 있었는데 빌드 하고 배포한 환경에서 시작을 해보니 잘 작동한다.

>해당 프로그램의 목적은 아래와 같다.
>* ### (x, y, z) 범위 내부의 pointcloud 데이터만 가시화하기 
>학습 모델의 train 데이터의 범위를 줄이고, local 단위 학습을 먼저 진행하기 위해서 pointcloud 데이터를 원하는 범위만큼 잘라내는 기술이 필요하다. 해당 요청을 위해 지정한 범위 내부의 pointcloud만 보이는 기술을 구현해야 한다. PotreeDesktop 에서 이미 아래 사진과 같은 Clipping Volume 이라고 지원하고 있다. 이를 조금 가공하여 써먹기 쉽도록 구현해보자. volume은 4x4 행렬의 형태로 [Transform matrix](https://en.wikipedia.org/wiki/Transformation_matrix) 형태라고 한다. 행렬을 통해 shader에서 연산을 통해 내부에 있는지 없는지 계산하는 것 같다.
![clipping_inside](./assets/01_clipping_exam.PNG "clipping_inside")

>* ### intensity 한계점 이상의 pointcloud 데이터만 가시화하기
>학습 모델의 target을 획득하기 위해 intensity의 threshold가 필요하다. threshold 이상의 intensity를 가진 pointcloud 데이터를 가시화할 수 있는 기능을 구현하여 학습의 target이 될 intensity의 threshold 값과, 해당하는 pointcloud의 범위를 찾아낼 수 있다. 위 volume을 통한 clipping 코드에서 intensity attribute에 대하여 추가해주자. viewer, octree, material 등에 intensity filter 값을 추가하고 shader에 아래 내용을 추가하자.
```C
#if defined(clip_intensity_enabled)
{ // intensity filter
    float threshold = uFilterIntensity;
    
    if (intensity < threshold) {
        gl_Position = vec4(100.0, 100.0, 100.0, 0.0);
        return;
    }
}
#endif
```
>그리고 potree renderer에 해당 shader가 사용될 수 있도록 코드를 추가해주면 완성이다. 이 부분은 shader와 여러 소스 코드들을 직접 수정해야할 필요가 있으므로 [potree](https://github.com/potree/potree)에서 소스를 받아와서 수정하고 빌드한 후 react에 붙이는 방식으로 사용하자
>![clipping_intensity](./assets/01_clipping_intensity.PNG "clioping_intensity")
>volume과 intensity를 모두 적용하면 아래와 같이 된다.
>![cliiping](./assets/01_clipping_volume_intensity.PNG "clipping")

>앞서 말했듯, volume에 의한 clipping은 min max x,y,z 값이 아닌 volume의 poisition, width, height, depth와 4x4 회전 행렬 M으로 계산된다. c library에서 역시 연산에 쓰도록 하기 위해 해당 값들을 export하는 기능을 구현하자. 
>![is_point_inner_box](./assets/01_cal_is_point_inner_box.jpg "is_point_inner_box")
>추가로 intensity도 함께 .json 형식으로 export 하여 필요한 학습의 label을 생성할 수 있도록 하자. 그런데 구현된 코드 상에서 volume은 width, height, depth는 모두 1로 고정되어 있고 회전 행렬 M에 크기 변환까지 들어있는 듯 하다. 쩝; 뭐 역행렬 취해서 계산하는건 상관 없으려나 한번 테스트 해봐야겠다.

```
  volume.matrix                
[R11    R12    R13    0]       
[R21    R32    R33    0]       
[R31    R32    R33    0]        
[pos.x  pox.y  pox.z  1]        
```
> volume은 width, height, depth가 각 1인 정육면체고 행렬의 R 요소들에는 width, height, depth를 나타내는 scale 값이 곱해져있다. 또 기존 회전 행렬과는 다르게 R41, R42, R43은 0이 아닌 volume의 poisition을 나타낸다. 어차피 point (x,y,z,1) vector와 연산하므로 position 값은 volume과의 offset을 계산하는 기능을 한다.따라서 4x4 Matrix만 export 하여도 충분히 계산 가능한 범위를 얻을 수 있다.

## 3. c++ dependency 설정
* libpdal-dev -> 다양한 3d 포맷(ply, las 등등)을 서로 변환 가능하도록 한다.
* liblas -> .las 포맷을 다루기 용이하다. 
* opencv -> 행렬 계산식에 사용한다.

## 4. Clib 
> front에서 potree 데이터를 시각적으로 보면서 생성한 clip의 matrix와 intensity threshold를 생성하였다면, las 파일의 연산을 거쳐 clipping에 해당한 범위의 pointcloud 데이터만 가지는 .las와 threshold 이상의 intensity를 가진 점들의 minmax x, y, z를 구하는 

velodyne lidar로 촬영된 binary 데이터는 float 형태의 x, y, z, intensity 값의 나열로 저장되는 것 같다. raw data를 .las로 변환 시 binary 데이터를 순서대로 16bytes씩 읽어 각각 x, y, z, intensity로 point를 생성해 저장하면 .las로 만들 수 있다. 그런데 liblas는 double 형태로 point의 좌표를 저장한다. 그리고 사실 기준 좌표를 잡고 offset과 scale 값으로 데이터를 저장한다. 이 때문에 potree 변환시나 여러 상황에서 약간의 오차가 발생하는 것 같다. 안그래도 localization시에도 측위 오차가 발생하는데 이런 오차도 발생하니 역시 보정하는 과정이 필수가 아닌가 생각이 든다.

>일단은 intensity의 minmax x,y,z로 하지만 minmax 자체로는 정확한 값을 얻을 수 없다. 아래 그림을 보면 도로의 진행 방향과 x축 y축의 방향이 달라 붉게 표시된 범위에 불필요한 점들이 포함된다. 이 역시 Matrix4의 형태로 얻어낼 수 있다면 x, y축에 대한 회전이 가능하므로 더 정확한 범위의 데이터를 생산해낼 수 있을 것이라고 본다. 하지만 일단 나중에 하자!
![limits_of_min-max](./assets/01_limits_of_minmax.PNG "limits of min-max")

>생각해보니 굳이 위 minmax x, y, z를 label로 생산할 필요 없이, 변환한 값의 mixmax 좌표를 가진 점이 변환 전 box의 양 끝 두 점이라고 볼 수 있다. z값은 사실상 회전에 영향을 받지 않으므로 기존 좌표의 최대 최소로 구하면 될 것 같다.
![label_bbox](./assets/01_get_label_bounding_box.jpg "label bbox")

>프로그램의 목적에 어울리게 하나의 .las 파일에서 여러 구간의 label을 얻을 수 있도록 설계해야 한다. 여러 boxes가 존재할 경우 threading을 통해 병렬처리 하는 것도 생각 해보자. 입력은 아래와 같이 만들었다.

```json
//input.json
{
    "lasPath": "/mnt/c/.../aaa.las"
    "boxes":[
        {
            "matrix":[1.0, 2.0, .... 16.0],  // 16 doubles
            "intensity": 1 // integer
        },
        {

        }
    ]
}

//output.json
{
    "lasPath": "/mnt/c/.../aaa.las"
    "boxes":[
        {
            "matrix":[1.0, 2.0, .... 16.0],  // 16 doubles
            "intensity": 1, // integer
            "min": [0.1, 0.3, 1.0], // 3 doubles
            "max": [13.5, 10.3, 9.3], // 3 dobules
            "num_points": 10052, // integer
            "num_label_points": 1310 // integer
        },
        {

        }
    ]
}
```

> 현재는 아래와 같이 하나의 point를 읽을 때 마다 모든 box들에 대해 하나씩 point 값을 처리하고 있지만 해당 부분의 threading 추가와 하나의 point가 아닌 여러 point들을 읽고 한꺼번에 처리하는 vectorizing을 하면 더욱 성능이 향상될 것 같다.
```C++
while(reader.ReadNextPoint()) {
    if ((i+1) % 100000 == 0) 
        cout << "(" << i+1 << "/" << numPoints << ") processing." << endl;

    auto point = reader.GetPoint();
    for (auto it = this->boxes.begin(); it != this->boxes.end(); it++) {
        it->addPoint(point);
    }
    i++;
}
```

> thread pool과 batch 사용하는 형태로 추가헀다. thread 10으로 설정하고 테스트 해 보았는데 확실하게 작업 성능이 향상되었다. 개꿀