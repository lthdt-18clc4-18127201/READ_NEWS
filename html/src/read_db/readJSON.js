const fs = require("fs")
const Users = require("../models/users")
///read file

// ///save files 
// const dataSave = JSON.stringify({dick:"ass"})  /// JSON sang OBJECT thì sài JSON.parse còn muốn lưu từ objetc về JSON thì phải JSON.stringify
// fs.writeFileSync("../database/data1.json",dataSave)
// console.log(data) 

 const readData = function(path){
        const data1 = fs.readFileSync(path);
        // parse JSON string to JSON object
        const databases = JSON.parse(data1);
     return databases
}
function searchPostbyID(id, arr) {
    const post = arr.find(function (element) {
        return element.id == id; /// nếu có bằng thì cái thằng  post = object, nếu ko có ai thì nó l2a null
    });
    return post;
} // cái này m gọi o dau ?
const searcAccount = async(user,pass) =>{
    // const post = arr.find(function (element) {
    //     return element.user ==user && element.pass ==pass; /// nếu có bằng thì cái thằng  post = object, nếu ko có ai thì nó l2a null
    // });
    // return post;
    const users = await Users.findOne({email:user, password: pass})
    return users
}
 module.exports = {
    readData,
    searchPostbyID,
    searcAccount
 }
