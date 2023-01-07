# golang几种获取文件路径方式

## 获取当前可执行文件路径

```go
exe,err := os.Executable()
//展开符号连接(如果存在的话)，得到真实路径
dir,err := filepath.EvalSymlinks(exe)
```

## 获取启动命令路径
```go
wd, err := os.Getwd()
//展开符号连接(如果存在的话)，得到真实路径
dir,err := filepath.EvalSymlinks(wd)
```

## 相对路径转绝对路径
```go
import (
    "path/filepath"
    "os"
)
func GetFileAbsolutePath(file string) (string, error) {
	if filepath.IsAbs(file) {
        //可执行文件路径
		exe, err := os.Executable()
		if err != nil {
			return "", err
		}
        exe,err = filepath.EvalSymlinks(exe)
		if err != nil {
			return "", err
		}
		newFile := filepath.Join(filepath.Dir(exe), file)
		if FileExist(newFile) {
			return newFile, nil
		}

        //启动路径
		exe, err = os.Getwd()
        if err != nil {
			return "", err
		}
        exe,err = filepath.EvalSymlinks(exe)
		if err != nil {
			return "", err
		}
		newFile = filepath.Join(exe, file)
		if FileExist(newFile) {
			return newFile, nil
		}
	} else if FileExist(file) {
        file,err = filepath.EvalSymlinks(file)
		if err != nil {
			return "", err
		}
		return file, nil
	}
	return file, nil
}
func FileExist(filename string) bool {
	_, err := os.Stat(filename)
	return err == nil
}
```