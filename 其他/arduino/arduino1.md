# ardunio

## 获取按钮信号

1. 按钮负极连接主板数字口2
2. 按钮负极连接主板电源GND
3. 按钮正极连接主板电源5V

```
int btnOn = 0;
void setup() {
    pinMode(2, INPUT);//将pin2定义为输入
}
void loop() {
    btnOn = digitalRead(2);//读取pin2的信号
}
```

## 与PC串口通信

```
void setup() {
    Serial.begin(9600);//开始与电脑连接串口，传输率为9600
}

void loop() {
    Serial.println(123456);//打印到串口
}
```

## 获取电位器(可变电阻)模拟信号与利用

1. 电位器侦测电位接脚连接主板A0,**只有`A`开头的引脚可以获取模拟输入**
2. 电位器负极连接主板电源GND
3. 电位器正极连接主板电源5V
4. led灯负极连接GND，正极连接主板`-3`引脚，**只有带`-`的引脚可以模拟输出**

```
int sensorValue = 0;//传感器的初始值

void setup() {
    Serial.begin(9600);
}

voil loop() {
    sensorValue = analogRead(A0);//获取模拟信号的值，值范围在[0-1023]
    sensorMapValue = map(sensorValue, 0, 1023, 0, 255);//将[0-1023]的值，等比映射为[0-255]
    Serial.println(sensorMapValue);//将信号值打印到串口
    analogWrite(3, sensorMapValue);//将模拟信号输出到-3引脚，让led灯显示不同亮度
}
```
