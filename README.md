 # 数字流域  hushuipaas 平台调用演示(bds-jsmod-demo)程序


本`bds-jsmod-demo`程序演示了 `数字流域模块`调用接口和 `geojson`地图的调用接口

getPresetResultInfoList

github 地址
     https://github.com/yulongsun/bds-jsmod-demo.git 

本`bds-jsmod-demo`程序是hushuipaas 调用平台上consul服务注册和服务发现 javascript 模块调用示例程序，node 采用12 以上版本.

本 demo 演示3个不同的模块的注册和反注册


## consul服务中心

服务中心:  www.hhunj.com
服务界面: http://www.hhunj.com:8500/ui/dc1/services

## consul本机节点


下载并运行 consul ，然后运行并连接到数据中心，例如

```
consul agent -data-dir=e:/ysun_bin/consul/tmp/consul -node=n4 -config-dir e:/ysun_bin/consul/etc/consul.d -advertise=10.0.0.135 -bind=0.0.0.0 -client=0.0.0.0  -join 10.0.0.100
```
用户应用根据本机情况改变相关值。



## vscode下的使用

运行是通过本本机所建的的consul节点上进行

### 运行注册模块 app1

```
    npm run app1 
```
缺省端口：  6787

### 运行注册模块 app2
```
    npm run app2
```
缺省端口：  6788

### 运行注册模块 app3
```
    npm run app3
```
缺省端口：  6789

### 反注册所有模块
```
    npm run dereg
```


### 将apis 信息写入到数据中心

```
gulp setapis
```

###  从数据中心获取 apis 信息
```
gulp getapis
```