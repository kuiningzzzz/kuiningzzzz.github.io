---
layout: default
title: RESTfulAPI与flask框架
---

## HTTP请求方式

| 方法     | 作用   | 示例                               |
| ------ | ---- | -------------------------------- |
| GET    | 获取数据 | GET /api/v1/weather?city=Beijing |
| POST   | 新增数据 | POST /api/v1/users               |
| PUT    | 更新数据 | PUT /api/v1/users/1              |
| DELETE | 删除数据 | DELETE /api/v1/users/1           |

## request调用API

示例：

```python
import request
#服务地址
host = "httpxxxx"
#接口地址
uri = "/xxxx/xxxx"
#APIkey
ak = "key"
#参数
params = {
	"ak":ak
	#更多参数
}
response = requests.get(url = host + uri, params = params)
if(response)
	print(response.json)

```

APIkey的保存：新建一个.env文件，写入`API_KEY=xxxx`，并gitignore掉这一文件

在项目文件写入：
```python
import os
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv("API_KEY")
```

## Flask框架

轻量级封装API的工具

示例：
```python
from flask import Flask, request, jsonify
app = Flask(__name__)

#API函数制作与封装
@app.route("/hello", method=["GET"])
def hello():
	return jsonify({"msg": "Hello"})
	
@app.route
def add():
	data = request.json
	return jsonify({"result": data["a"]+data["b"]})
	
if __name__ == "__main__"
	app.run(debug=true)
```

## 命令行调用API

`curl -X POST http://127.0.0.1:5000/add -H "Content-Type: application/json" -d '{"a": 3, "b": 5}’`

-X：调用方式
地址：调用本地运行的服务器一般在localhost即127.0.0.1处
-H：传入设置，比如数据格式为json
-d：传入参数