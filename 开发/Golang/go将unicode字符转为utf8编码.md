# go将unicode字符转为utf8编码

 如`\UA23C350B`

```go
func Escape2Utf8(data []byte) []byte {
	re := regexp.MustCompile(`(\\U[0-9a-fA-F]{8})+`)
	for _, match := range re.FindAll(data, -1) {
		str, _ := strconv.Unquote(`"` + string(match) + `"`)
		data = bytes.ReplaceAll(data, match, []byte(str))
	}
	return data
}
```