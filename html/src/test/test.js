require("../mongoose/connect")
const Post = require("../models/newspaper")
const Users = require("../models/users")

const findAuthor = async(postID) =>{
    const post = await Post.findById(postID)
    await post.populate("author").execPopulate();
    return post.author
}
const cc = async () =>{
    const user = new Users({
        name:"anhtu",
        email:"1234",
        password:"1234",
        role:"manager"
    })
     await user.save()
   // const author = await Author.findById("5fe83d7b7b6c1c1edce5940f")
  // console.log(author)
   // const postAuthor = await findAuthor("5fe83def2fec9a0d70ae37e5")
    //console.log(postAuthor)
    // const post = new Post({
    //     title:"Bê đê",
    //     description:"allo",
    //     content:"Chơi gay",
    //     author: "anhtu"
    // })
    //  await post.save() // mò đi t làm anh văn
    // await Author.findByIdAndUpdate({_id:"5fe83d7b7b6c1c1edce5940f"},{
    //   name:"anhtu123",
    //   email:"hung wibu 123",
    //   password:"1233456"}
      
    // )
  //console.log(await Author.find({name:"anhtu123",password:"1233456"}))  
    

}

cc()