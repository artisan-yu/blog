# php class中的魔术方法


> 魔术方法必须在类中定义，使用姿势如下
> ```php
> class test {
>     public function __construct(){}
> }
> ```

## 构造函数析构函数

### __construct

该函数为构造函数，类的实例被创建时会自动调用该函数，用于初始化操作，如创建数据库连接

构造函数的定义形式参数，可在创建实例时通过类名直接传入

```php
public function __construct($a,$b,$c) {
    $this->name = $a;
    $this->sex = $b;
    $this->age = $c;
}
```

### __destruct

该函数为析构函数，类的实例被销毁时会自动调用该函数，用于关闭数据库连接等退出操作。

```php
public function __destruct() {
    echo "销毁处理";
}
```

## 属性重载

### __get

当用户获取不存在的变量时自动调用

```php
public function __get($key) {
    echo "$key 不存在\n";
}
```

### __set

当用户对不存在的变量赋值时

```php
public function __set($key,$value) {
    echo "$key=$value\n";
}
```

### __isset

对未定义的变量调用isset()、empty()时会自动调用该函数。

```php
//重载属性，
public function __isset($key) {
    echo "$key 不存在";
    return false;
}
```

### __unset

销毁任意属性会自动调用该函数

```php
//重载属性，
public function __unset($key) {
    echo "删除属性$key";
}
```

## 方法重载

### __call

当用户调用不存在的方法时自动调用

```php
public function __call($name,$argument) {}
```

### __callStatic

当用户调用不存在的静态方法时自动调用

```php
public static function __callStatic($name,$argument) {}
```

## 特殊处理

### __toString

当实例被当成字符串时会自动调用，如 `echo $obj`

```php
public function __toString() {
    return "姓名：$this->name\n性别：$this->sex\n年龄：$this->age\n";
}
```

### __invoke

将实例当作函数调用时,会调用该函数

```php
public function __invoke($xxx) {}
```

### __clone

当对象被克隆时会调用该函数

```php
public function __clone() {}
```


## 序列化相关

### __sleep

序列化前会自动调用此方法，当sleep方法存在时序列化依赖该方法返回值，sleep无法返回父类私有成员变量

```php
public function __sleep() {
    return ["a","b","c"];
}
```

### __wakeup

反序列化完成后会检查是否存在__wakeup方法，当wakeup方法存在时会自动调用

!> 在`PHP5 < 5.6.25`与`PHP7 < 7.0.10` 中，当 *序列化字符串中子元素个数标识`"O:3:类":"元素个数标识":{子元素...}`* 超过 *代码中类所定义的变量数* 时，该函数将会失效。

```php
public function __wakeup() {
    //重新初始化，如数据库重连
    echo "wakeup唤醒";
}
```
