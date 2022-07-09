const homedir = require('os').homedir();  // 获取home目录
const home = process.env.HOME || homedir;
const p = require('path')  // nodejs提供的获取路径的方法
const fs = require('fs');
const dbPath = p.join(home, '.todo')  // 找到home目录里的todo文件

const db = {
    // 读取已有的任务
    read(path = dbPath) {
        return new Promise((resolve, reject) => {   // 异步操作
            fs.readFile(path, {flag: 'a+'}, (error, data) => {  // 看参考链接1
                if (error) return reject(error)
                let list
                try { list = JSON.parse(data.toString())} 
                catch (error2) { list = [] }
                resolve(list)
            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(path, string+'\n', (error) => {
                if (error) return reject(error)
                resolve()
            })
        })
    }
}
    
    

module.exports = db;

// console.log(list)
// const task = {
//     title: title,
//     done: false
// }
// list.push(task)
// const string = JSON.stringify(list)
// fs.writeFile(dbPath, string+'\n', (error3) => {
//     if (error3) {console.log(error3)}
// })
