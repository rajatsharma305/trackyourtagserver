/**
 * Created by bhuvanmalik on 24/11/15.
 */

var express = require('express');

var hroutes= function(Holder) {

    var holderRouter=express.Router();

    holderRouter.route('/holders')
        .get(function (req, res) {
            Holder.find(function (err, holders) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(holders);
                }
            });
        });

    holderRouter.route('/add/:name/:pass/:email/:cno')
        .post(function(req,res){
            var holder= new Holder(
                { "name" : req.params.name,               //ANGULARPUT
                    "pass": req.params.pass,
                    "email": req.params.email,
                    "cno": req.params.cno

                });
            holder.save();
            res.json(holder);
        });

    holderRouter.route('/check/:email/:pass')
        .get(function(req,res){
           Holder.findOne({"pass":req.params.pass,"email":req.params.email},function(err,holder){
              if(err){
                  res.json("invalid");
              }
              else if(holder){
                  res.json("valid");

              }
                  else
                  {

                      res.json("invalid");
                  }

           });
        });


            holderRouter.route('/:email')
    .delete(function(req,res){
        Holder.findOne({ "email" : req.params.email}, function(err,holder){
            if(err)
            {
                res.status(500).send(err);
            }
            else {
                holder.remove(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.status(204).send("removed");
                    }
                });
            }
        });

    });


            return holderRouter;
};


module.exports = hroutes;