# golang 翻译

## 百度api

```go
package baidu

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"
)

var AppId = ""
var Password = ""
var TranslationUrl = "https://fanyi-api.baidu.com/api/trans/vip/translate"

// Translate query-查询字符串; from-原语言; to-目标语言
func Translate(query string, from string, to string) (string, error) {
	if query = strings.TrimSpace(query); len(query) < 1 {
		return "", fmt.Errorf("调用错误 输入值为空")
	}
	params := map[string]string{}
	params["q"] = query
	params["from"] = from
	params["to"] = to
	params["appid"] = AppId
	params["salt"] = strconv.Itoa(time.Now().Second())
	params["sign"] = getMd5(AppId + query + params["salt"] + Password)
	body, err := httpPost(TranslationUrl, params, nil)
	if err != nil {
		return "", err
	}
	var apiResp struct {
		ErrorCode   string `json:"error_code"`
		ErrorMsg    string `json:"error_msg"`
		From        string `json:"from"`
		To          string `json:"to"`
		TransResult []struct {
			Src string `json:"src"`
			Dst string `json:"dst"`
		} `json:"trans_result"`
	}
	err = json.Unmarshal(body, &apiResp)
	if err != nil {
		return "", err
	}
	if apiResp.ErrorCode != "" {
		return "", fmt.Errorf("api错误 %s", body)
	}
	result := ""
	for i, item := range apiResp.TransResult {
		if i == 0 {
			result += item.Dst
			continue
		}
		result += "\n" + item.Dst
	}
	// 参考官网对不同类型账号的请求频率限制
	time.Sleep(time.Millisecond * 199)
	return result, err
}

// 获取md5值
func getMd5(content string) string {
	m := md5.New()
	m.Write([]byte(content))
	return hex.EncodeToString(m.Sum(nil))
}

// En2Zh 英文->中文
func En2Zh(query string) (string, error) {
	return Translate(query, "en", "zh")
}

func httpPost(_url string, _params map[string]string, _headers map[string]string) ([]byte, error) {
	values := url.Values{}
	for k, v := range _params {
		values.Set(k, v)
	}
	resp, err := http.PostForm(_url, values)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	return body, nil
}
```

## 有道api

```go
package youdao

import (
	"cveTool/common/errors"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)

// 翻译类型，具体参考官方文档
var (
	EN2ZH_CN = "EN2ZH_CN"
)

// TranslateEn2Zh 英文->中文
func TranslateEn2Zh(query string) (string, error) {
	return Translate(query, EN2ZH_CN)
}
func Translate(_query string, _type string) (string, error) {
	if _query = strings.TrimSpace(_query); len(_query) < 1 {
		return "", fmt.Errorf("调用错误 输入值为空")
	}
	resp, err := httpGet("https://fanyi.youdao.com/translate", map[string]string{
		"doctype": "json",
		"type":    _type,
		"i":       _query,
	})
	if err != nil {
		return "", err
	}
	var data struct {
		Type            string `json:"type"`
		ErrorCode       int    `json:"errorCode"`
		ElapsedTime     int    `json:"elapsedTime"`
		TranslateResult [][]struct {
			Src string `json:"src"`
			Tgt string `json:"tgt"`
		} `json:"translateResult"`
	}
	err = json.Unmarshal(resp, &data)
	if err != nil {
		return "", err
	}
	results := data.TranslateResult[0]
	result := ""
	for _, item := range results {
		result += "\n" + item.Tgt
	}
	result = strings.TrimSpace(result)
	if len(results) < 1 {
		return "", errors.TRANSLATE_FAILED
	}
	return result, nil
}

func httpGet(_url string, _params map[string]string) (res []byte, err error) {
	p := url.Values{}
	for k, v := range _params {
		p.Set(k, v)
	}
	resp, err := http.Get(_url + "?&" + p.Encode())
	if err != nil {
		return
	}
	defer resp.Body.Close()
	return io.ReadAll(resp.Body)
}
```