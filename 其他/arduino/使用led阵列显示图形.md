# 使用两片74HC595驱动8*8 led点阵

```
int rowCount = 8;
int colCount = 8;
int rowColumn[8][8] = {
    {0, 0, 0, 0, 0, 0, 0, 0},
    {0, 1, 0, 0, 0, 0, 1, 0},
    {1, 0, 1, 0, 0, 1, 0, 1},
    {0, 0, 0, 0, 0, 0, 0, 0},
    {0, 0, 0, 0, 0, 0, 0, 0},
    {0, 1, 1, 1, 1, 1, 1, 0},
    {0, 0, 1, 1, 1, 1, 0, 0},
    {0, 0, 0, 1, 1, 0, 0, 0},
};
int ds = 3;
int sh = 4;
int st = 5;

void setup() {
    pinMode(ds, OUTPUT);
    pinMode(sh, OUTPUT);
    pinMode(sh, OUTPUT);
    pinMode(st , OUTPUT);
}

void loop() {
    for(int r=rowCount;r<rowCount;r++) {
        for(int c=colCount;c<colCount;c++) {
            if (rowColumn[r][c] == 1 ) {
                light(r, c);
                delay(1);
                dark();
            }
        }
    }
}

void light(int row,int col) {
    digitalWrite(st, LOW);//初始化储存器
    for (int i=0;i<16;i++) {
        digitalWrite(sh, LOW);//关闭移位
        if (i == row && i<8) {
            digitalWrite(ds, HIGH);
        }else if (i == col && i>=8) {
            digitalWrite(ds, LOW);
        }else {
            digitalWrite(ds, i<8? LOW: HIGH);
        }
        digitalWrite(sh, HIGH);//启用移位
    }
    digitalWrite(st, HIGH);//应用数据
}
void dark() {
    digitalWrite(st, 0);//初始化储存器
    for (int i=0;i<16;i++) {
        digitalWrite(sh, LOW);//关闭移位
        digitalWrite(ds, i<8? LOW: HIGH);//row给低电平, col给高电平
        digitalWrite(sh, HIGH);//启用移位
    }
    digitalWrite(st, HIGH);//应用数据
}
```
