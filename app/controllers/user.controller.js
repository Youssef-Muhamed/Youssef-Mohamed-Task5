const db = require('../../models/dbConn');
const {
    ObjectId
} = require('mongodb');
const showAll = (req, res) => {

    db.myConnection((err, conn) => {
        conn.collection("user").find()
            .toArray((e, users) => {
                if (e) res.send(e)
                res.render("showAll", {
                    pageTitle: "All Users",
                    users,
                    isEmpty: users.length == 0 ? true : false
                })
            })
    })
    //  const usersa = db.selectAll("user") 
    //    res.render("showAll", {
    //         pageTitle:"All Users",
    //         users,
    //         isEmpty: !users ? true : false 
    //     })
    //  console.log(usersa)
}
const show = (req, res) => {
    let userId = req.params.id
    db.myConnection((err, conn) => {
        conn.collection("user").findOne({
            _id: new ObjectId(userId)
        }, (e, result) => {
            res.render("show", {
                pageTitle: "User Data",
                user: result,
                isEmpty: result ? false : true
            })
        })
    })
}
const addUser = (req, res) => {

    res.render("add", {
        pageTitle: "Add New User"
    })
}
const addLogic = (req, res) => {
    db.add('user', req.body)
    res.redirect("/")
}
const editUser = (req, res) => {
    let userId = req.params.id
    db.myConnection((err, conn) => {
        conn.collection("user").findOne({
            _id: new ObjectId(userId)
        }, (e, result) => {
            res.render("edit", {
                pageTitle: "edit user",
                user: result

            })
        })
    })
}
const editUserLogic = (req, res) => {
    let userId = req.params.id
    db.myConnection((err, conn) => {
        conn.collection("user").updateOne({
                _id: new ObjectId(userId)
            }, {
                $set: req.body
            }).then(() => res.redirect("/"))
            .catch(e => res.send(e))
    })
}


const deleteUser = (req, res) => {
    let userId = req.params.id
    db.myConnection((err, conn) => {
        conn.collection("user")
            .deleteOne({
                _id: new ObjectId(userId)
            })
            .then(() => {
                conn.collection("op")
            .deleteMany({
                id:userId
            })
        .then(()=>
                res.redirect("/"))
            })
            .catch(e => res.send(e))
    })
}

const addOp = (req, res) => {

    res.render("addOp", {
        pageTitle: "Add Operation"
    })
}



const addOpLogic = (req, res) => {

    let userId = req.params.id
    const op = req.body.op
    const number = req.body.value
    let message = ""
    let messageSuc = ""
    db.myConnection((err, conn) => {
        conn.collection("user").findOne({
            _id: new ObjectId(userId)
        }, (e, result) => {
            const user = result
            if (op == "withdrow") {

                if (number >= 6000) message += 'You Not withdrow Alot Of 6000 EGP'
                else if (Number(user.rBalance) < number) message += 'Sorry You Not Have Money'
                else {

                    let newBalance = Number(user.rBalance) - Number(number)
                    conn.collection("user").updateOne({
                        _id: new ObjectId(userId)
                    }, {
                        $set: {
                            "rBalance": newBalance
                        }
                    })
                    let data = {
                        id: userId,
                        ...req.body,
                        date: (new Date()).toUTCString()
                    }
                    db.add('op', data)
                    messageSuc += 'operation Success'
                }
            } else if (op == "add") {

                let newBalance = Number(user.rBalance) + Number(number)
                conn.collection("user").updateOne({
                    _id: new ObjectId(userId)
                }, {
                    $set: {
                        "rBalance": newBalance
                    }
                })
                let data = {
                    id: userId,
                    ...req.body,
                    date: (new Date()).toUTCString()
                }
                db.add('op', data)
                messageSuc += 'operation Success'
            }
            res.render("addOp", {
                message,
                messageSuc,
                user,
                isEmpty: user ? false : true
            })
        })
    })

}
const showOp = (req,res)=>{
    let userId = req.params.id
    db.myConnection((err, conn) => {
        conn.collection("op").find()
            .toArray((e, result) => {
                if (e) res.send(e)
                // let reId = result.id
                let ops = result.filter(function(result){return result.id == userId}) 
                res.render("showOp", {
                    pageTitle: "All Ops",
                    ops
                    
                })
            })
    })
}
module.exports = {
    showAll,
    addUser,
    editUser,
    show,
    deleteUser,
    addLogic,
    editUserLogic,
    addOp,
    addOpLogic,
    showOp
}