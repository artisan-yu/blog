# php序列化与反序列化

php内置`serialize()`比`json_encode()`性能高，当需要对大数组等复杂数据进行序列化存储或传输时，可使用`serialize()`优化性能

## 序列化


```php
<?php
class human {
    public $name,$sex,$age;
    public function human($n,$s,$a){
        $this->name=$n;
        $this->sex=$s;
        $this->age=$a;
    }
}
$boJi = new human("波吉","男","5岁");
echo serialize($boJi);
```
[在线运行](https://www.dooccn.com/php7.4/#id/0394854bc744f5ce91253f57ed776a59)

输出

```
O:5:"human":2:{s:4:"name";s:6:"波吉";s:3:"sex";s:3:"男";}
```

`O`代表类 : `5`是类名长度: `"human"`是类名 : `2`是子元素数量 : `{xxxxxx}`是子元素集合


**子元素集中**

`{s:4:"name";s:6:"波吉";s:3:"sex";s:3:"男";}`

`s指字符串类型` : `4是变量名长度` ; `s指字符串类型` : `6是变量值长度` : `波吉是变量值` ;

`s指字符串类型` : `3是变量名长度` ; `s指字符串类型` : `3是变量值长度` : `男是变量值` ;

由此可见 **子元素数量必须为2的倍数，确保键值对应**，排列顺序为：变量名;变量值;变量名;变量值;变量名;变量值;......


### 其他数据类型代号

|代号|类型|
|---|---|
| a| array|
| b| boolean|
| d| double|
| i| integer|
| o| common object|
| r| reference|
| s| string|
| C| custom object|
| O| class|
| N| null|
| R| pointer reference|
| U| unicode string|

### 变量不同作用域序列化后的差异

```php
<?php
class human {
    public $name;
    protected $sex;
    private $age;
    public function human($n,$s,$a){
        $this->name=$n;
        $this->sex=$s;
        $this->age=$a;
    }
}
$boJi = new human("波吉","男","5岁");
echo serialize($boJi);
```
[在线运行](https://www.dooccn.com/php7.4/#id/2021cec512d154b3fd8210eb264988ac)

输出

```html
O:5:"human":3:{s:4:"name";s:6:"波吉";s:6:"\00*\00sex";s:3:"男";s:10:"\00human\00age";s:4:"5岁";}
```

- public公共类型的变量名无额外标记
- protected保护类型的变量名格式：`\00*\00变量名`，长度+3
- private私有类型的变量名格式：`\00类名\00变量名`，长度+2


## 反序列化

使用反序列化`unserialize()`函数，可将字符串内容重新转换成类的实例

```php
<?php
class human {
    public $name,$sex,$age;
    public function p() {
        return"名称：$this->name\n性别：$this->sex\n年龄：$this->age";
    }
}
$boJi = unserialize('O:5:"human":3:{s:4:"name";s:6:"波吉";s:3:"sex";s:3:"男";s:3:"age";s:4:"5岁";}');
echo $boJi->p();
```
[在线运行](https://www.dooccn.com/php7.4/#id/a56f345e20323daacbe6f5e1ae3415fc)

输出

```
名称：波吉
性别：男
年龄：5岁
```
