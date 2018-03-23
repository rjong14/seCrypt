const newMessage = (name, password, message, Message, crypto, cb) => {
    console.log('new')
    var m = new Message
    m.name = name
    m.message = crypto.encode(message, password)
    m.save(function (err) {
        if (err) {
            cb(err)
            return;
        }
        cb('new message created')
    })
}
const saveMessage = (name, password, message, Message, crypto, cb) => {
    console.log('save')
    if (crypto.passcheck(Message.message, password)) {
        Message.name = name
        Message.message = crypto.encode(message, password)
        Message.save(function (err) {
            if (err) {
                cb(err)
                return;
            }

            cb('message overwritten')
        })
    } else {
        cb('wrong password, message not overwritten')
    }
}
const decodeMessage = (name, password, Message, crypto, cb) => {
    console.log('decode')
    cb(crypto.decode(Message.message, password))
}

module.exports = function (frontRouter, pl, crypto, Message) {
    frontRouter.route('/').get(function (req, res, next) {

        res.render('index', {
            title: 'Encrypt-R-us'
        });

    })
    frontRouter.route('/encode/').post(function (req, res, next) {
        if (req.body.name) {
            Message.findOne({
                name: req.body.name
            }, function (err, mess) {
                //pl.err(err)
                //pl.log(mess.name)
                !mess ?
                    req.body.password ?
                    req.body.message ? newMessage(req.body.name, req.body.password, req.body.message, Message, crypto, d => {
                        res.json({
                            message: d
                        })
                    }) :
                    res.json({
                        message: 'no message found, enter a message to create one!'
                    }) :
                    res.json({
                        message: 'please enter password'
                    }) :
                    req.body.password ?
                    req.body.message ? saveMessage(req.body.name, req.body.password, req.body.message, mess, crypto, d => {
                        res.json({
                            message: d
                        })
                    }) :
                    res.json({
                        message: 'press decode to recieve message'
                    }) :
                    res.json({
                        message: 'please enter password'
                    })


            });
        } else {

            pl.ob(req.body)
            req.body.password ? req.body.message ? res.json({
                message: crypto.encode(req.body.message, req.body.password)
            }) : res.json({
                message: 'has no message'
            }) : res.json({
                message: 'has no password'
            })
        }

    })
    frontRouter.route('/decode/').post(function (req, res, next) {
        if (req.body.name) {

            Message.findOne({
                name: req.body.name
            }, function (err, mess) {
                //pl.err(err)
                //pl.log(mess.name)
                mess ?
                    req.body.password ?
                    decodeMessage(req.body.name, req.body.password, mess, crypto, d => {
                        res.json({
                            message: d
                        })
                    }) :
                    res.json({
                        message: 'please enter password'
                    })  :
                    res.json('no message found')


            });

        } else {
            req.body.password ? req.body.message ? res.json({
                message: crypto.decode(req.body.message, req.body.password)
            }) : res.json({
                message: 'has no message'
            }) : res.json({
                message: 'has no password'
            })
        }

    })

    return frontRouter
}
