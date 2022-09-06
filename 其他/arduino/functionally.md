# arduino functionally

### 睡眠

```
delay(int millisecond)
```

### 设置引脚电平
value取值范围: [0,1,LOW,HIGH]
```
digitalWrite(int pinNum, int value);
```

### 设置模拟信号

- 带`-`的数字引脚可填int类型的模拟信号值
```
analogWrite(int pinNum, int value);
```

### 读取模拟信号

- 带`A`开头的数字引脚可接受模拟信号
- 返回一个0到1023的值
- 可搭配`map(analogValue, 0, 1023, 0, 100);`将[0-1023]范围内的值，等比映射为[0-100]范围内的值

```
analogRead(int sensorNum);
```