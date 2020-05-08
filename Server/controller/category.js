const Category = require('../model/category')

class categoryController{
    static async getAllCat(req,res,next){
        try {
            const allCat= await Category.find()
            res.status(200).json(allCat)
        } catch (error) {
            res.send(error)        }
    }

    static async getOneCat(req,res,next){
        try {
            const catId = req.params.id
            const category = await Category.findById(catId)
            if(category == null){
                res.status(404).json({ "message": "data not found"})
            }
            res.status(200).json(category)
        } catch (error) {
            res.send(error)
        }
    }

    static async postCat(req,res,next){
        try {
            const newCat = new Category ({
                name : req.body.name,
            })
            const category = await Category.create(newCat)
            res.status(200).json(category)
        } catch (error) {
            res.send(error)
        }
    }

    static async putCat(req,res,next){
        try {
            const willUpdate = {
                name: req.body.name
            }
            await Category.findOneAndUpdate({_id: req.params.id},willUpdate,{new:true, runValidators: true},(err,doc)=>{
                if(err){
                    next(err)
                }
                res.status(201).json(doc)
                })
        } catch (error) {
            next(error)
        }
    }


    static async deleteCat(req,res,next) {
        await Item.findOneAndDelete({ _id : req.params.id},(err,doc)=>{
            if(err){
                next(err)
            }
            res.status(201).json(doc)
        })
    }
}

module.exports = categoryController