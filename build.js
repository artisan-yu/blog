var pathTool = require('path')
var fs = require('fs');
const path = require("path");
const Console = require("console");
var sideBarMd = ""


function mkdir(dirPath) {
    let dir = ''
    if (dirPath.indexOf('/') === 0) {
        dir = '/'
    }
    if (fs.existsSync(dirPath)) {
        return
    }
    const arr = dirPath.split('/');
    for (const dirElement of arr) {
        dir = pathTool.join(dir, dirElement)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
}

function getStruct(_path, _dir = "/") {
    const blacklist = [
        '_sidebar.md',
        'img',
        "CNAME", "node_modules", 'dist'
    ]
    let fsResult = (fs.readdirSync(_path)).filter(item => !((/^\.+.*/).test(item)))
    fsResult = fsResult.filter(item => blacklist.indexOf(item) < 0)
    fsResult.sort((a, b) => {
        return a - b
    })
    let result = {}
    for (const i in fsResult) {
        let item = fsResult[i]
        let title = item.replace(/\.md/gi, '')
        if (fs.lstatSync(_path + "/" + item).isDirectory()) {
            result[title] = (getStruct(_path + "/" + item, item))
        } else if (/.*\.md$/.test(item)) {
            let mdPath = (_path.replace(docsPath, "") + "/" + item)
                .replace(/\s/g, '%20')
                .replace(/\?/g, '%3F')
                .replace(/\)/g, '%29')
                .replace(/#/g, '%23')
            if (mdPath.indexOf('/') == 0) {
                mdPath = mdPath.slice(1)
            }
            result[title] = mdPath
        }
    }
    return result
}

function isAbsolutePath(p) {
    return (/^\/.*/).test(p)
}

function getFullPath(p) {
    return isAbsolutePath(p) ? p : pathTool.join(process.cwd(), p)
}

function readFile(p) {
    return fs.readFileSync(getFullPath(p), 'utf-8')
}

function removeDir(path) {
    let data = fs.readdirSync(path); //data是一个数组，文件夹名和文件名用引号括起来，如["1", "2.txt", "3.html"]

    for (let i = 0; i < data.length; ++i) {
        //用循环判断数组中的元素是文件还是文件夹，是文件就删除，是文件夹就继续查找
        let url = path + "/" + data[i];
        let stat = fs.statSync(url); //用fs.stat获取文件或文件夹的详细信息
        if (stat.isDirectory()) {
            //用isDirectory判断元素是不是文件夹，是的话继续查找
            removeDir(url);
        } else {
            //不是文件夹的话，就是文件，删除文件
            fs.unlinkSync(url);
        }
    }

    // 删除空文件夹
    fs.rmdirSync(path);
}

function getRelativePath(p) {
    let commonPath = pathTool.join(process.cwd(), '/')

    if (p.substr(0, 1) != '/') {
        return p
    }
    if ((/^\./).test(p)) {
        return p
    }
    if (commonPath == pathTool.join(p, '/')) {
        return './'
    }
    if (p.includes(commonPath)) {
        return p.replace(commonPath, './')
    }
    let pArr = (p.split('/')).filter(item => item.length)
    let cArr = (commonPath.split('/')).filter(item => item.length)
    let clen = cArr.length
    let newCommonPath = ''
    let i = 0
    for (i; i < clen; i++) {
        if (pArr[i] != cArr[i]) {
            break
        }
        newCommonPath += '/' + cArr[i]
    }
    return pathTool.join("../".repeat(cArr.slice(i).length), p.replace(pathTool.join(newCommonPath, '/'), ''))
}

function replaceImg(path,article,currPath){
    let r = /\!\[[\.\w\d\s]+\]\((.*\.(jpg|png|gif))\)\s*\n*/gi
    let result;
    let resultSet = []
    while((result =r.exec(article)) != null){
        resultSet.push(result[1])
    }
    for (let i in resultSet){
        let imgPath = resultSet[i]
        let imgFullPath= path+'/'+imgPath
        let imgNewName = imgFullPath.replace(/[\\\/\s-%]/g,'_')
        let imgNewPath = "img/"+imgNewName
        mkdir(outputPath+'/'+currPath+'/img')
        console.log("mkdir"+outputPath+'/'+currPath+'/img')
        fs.copyFileSync(imgFullPath, pathTool.join(outputPath+'/'+currPath, imgNewPath))
        article = article.replace(imgPath,imgNewPath)
    }

    return article
}

function generate(obj, currPath, name, layer) {
    console.log('\n\n', "当前目录:" + currPath, "当前名称:" + name, "当前层级:" + layer)
    for (let key in obj) {
        let sub = obj[key]
        key = key.replace(/[\r\n]+/g, '')
        let empty = " ".repeat((layer - 1) * 2)
        let isSubObject = (typeof sub == 'object')
        let originFilePath = !isSubObject ? decodeURIComponent(getFullPath(pathTool.join(docsPath, sub))) : ''
        //第一层，保持不变
        if (layer === 1) {
            if (isSubObject) {
                sideBarMd += (empty + "* " + key + "\n").toLowerCase()
                mkdir(pathTool.join(outputPath, key))
                generate(sub, key, key, 2)
            } else {
                // sideBarMd += empty+"* [README]("+")\n"
                let originMd = fs.readFileSync(originFilePath, 'utf-8')
                originMd = replaceImg(pathTool.join(sub,'../'),originMd,currPath)
                fs.writeFileSync(pathTool.join(outputPath, key) + '.md', originMd, {encoding: 'utf8'})
            }
        } else if (layer === 2) {
            if (isSubObject) {
                generate(sub, currPath, key, (1 + layer))
            } else {
                let distFilePath = !isSubObject ? decodeURIComponent(getFullPath(pathTool.join(pathTool.join(outputPath, currPath), key + '.md'))) : ''
                sideBarMd += ('  * [' + key + ']' + '(' + sub + ')' + '\n').toLocaleLowerCase()
                let originMd = fs.readFileSync(originFilePath, 'utf-8')
                originMd = replaceImg(pathTool.join(sub,'../'),originMd,currPath)
                let oldMd = ''
                try {
                    oldMd = fs.readFileSync(distFilePath, 'utf-8')
                } catch (e) {
                }
                fs.writeFileSync(distFilePath.toLocaleLowerCase(), originMd + '\n\n' + oldMd + '\n\n', 'utf-8')
            }
        } else if (layer === 3) {
            if (isSubObject) {
                // generate(sub,currPath,key,(1+layer))
            } else {
                let distFilePath = !isSubObject ? decodeURIComponent(getFullPath(pathTool.join(pathTool.join(outputPath, currPath), name + '.md'))) : ''
                let sideBarMdItem = ('* [' + name + ']' + '(' +currPath+'/'+ name) + '.md)' + '\n'.toLocaleLowerCase()
                if (sideBarMd.indexOf(sideBarMdItem) < 0) {
                    sideBarMd += "  " + sideBarMdItem
                }
                let originMd = fs.readFileSync(originFilePath, 'utf-8') + "\n\n"
                originMd = replaceImg(pathTool.join(sub,'../'),originMd,currPath)
                let oldMd = ''
                try {
                    oldMd = fs.readFileSync(distFilePath, 'utf-8')
                } catch (e) {
                }
                fs.writeFileSync(distFilePath.toLocaleLowerCase(), oldMd + originMd, 'utf-8')
            }
        }
    }
}

console.log('-------------------------------')

var selectDocPath = './'
var outputPath = getRelativePath('./dist')
var docsPath = getRelativePath(selectDocPath)
var _struct = getStruct(docsPath)

removeDir(outputPath)
mkdir(outputPath)
fs.copyFileSync(pathTool.join(docsPath, 'index.html'), pathTool.join(outputPath, 'index.html'))
fs.copyFileSync(pathTool.join(docsPath, 'CNAME'), pathTool.join(outputPath, 'CNAME'))
fs.writeFileSync(pathTool.join(outputPath.toLocaleLowerCase(), '.nojekyll'), '')
generate(_struct, '', '', 1)
fs.writeFileSync(pathTool.join(outputPath.toLocaleLowerCase(), '_sidebar.md'), sideBarMd, {encoding: 'utf8'})
