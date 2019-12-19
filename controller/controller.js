var express = require('express');
var router = express.Router();
var path = require('path');

var request = require('request');
var cheerio = require('cheerio');


var Comment = require('../models/Comment.js')
var FindIt = require('../models/Article.js')

router.get('/',function(req, res){
    res.redirect('/articles')
})

router.get('/scrape',(req, res)=>
    request('http://www.dudeiwantthat.com', function(err, response,html){

        var $ = cheerio.load(html);

        var titlesArray = [];

        $('h2').each(function(i, element){
            var result = {};

            result.title = $(this)
                .children('a')
                .attr('title');

            result.link = $(this)
                .children('a')
                .attr('href');

                if(result.title !== '' && result.link !== ''){

                    if (titlesArray.indexOf(result.title)== -1){
                        titlesArray.push(result.title);

                        FindIt.count({title: result.title}, function(err, test){
                            if(test==0){
                                var entry = new FindIt(result);

                                entry.save(function(err, doc){
                                    if(err){
                                        console.log(err)
                                    }else{
                                        console.log(doc)
                                    }
                                })


                            }
                        })

                    }else{ console.log('Item already exists.')}

                }else{
                    console.log('Not saved to DB, missing data');
                }
        })
        res.redirect('/')

}))

router.get('/articles', function(req, res){
    FindIt.find().sort({_id: -1}).exec(function(err,doc){
        if(err){
            console.log(err);
        }else{
            var artcl ={article: doc};
            res.render('index', artcl);
        }
    })
})
router.get('/articles-json', function(req, res){
    FindIt.find({},function(err,doc){
        if (err){
            console.log(err)
        }else{
            res.json
        }
    })
})

module.exports= router;