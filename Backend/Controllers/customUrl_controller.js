const mongoose = require("mongoose");
const UrlSchema = require("../models/customUrl.model");
const activityController = require("./activity_controller");

exports.createUrl = async (req, res,next) => {

     try {
        const {actualUrl} = req.body;
        const url = await UrlSchema.findOne({actualUrl});
        if(url){
            return res.status(400).json({
                message: "Url already exists",
                url: url
            });
        }
        const newUrl = new UrlSchema(req.body);
        await newUrl.save();

        await activityController.createActivity(
            {
              userId: req.userIdForActivity,
              description: "Added Url : " + newUrl.customUrl,
            },
            next
          );

        return res.status(200).json({
            message: "Url created successfully",
            url: newUrl
        });
     } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 400;
            }
            next(error);
            
        }

}


exports.getUrls = async (req, res, next) => {
    try {
      let urls = await UrlSchema.find()
  
      return res.status(200).json({
        message: "Urls Fetched Successfully",
        urls
      });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
      }
      next(error);
    }
  };

  exports.redirect = async (req, res, next) => {
    try {
      let url = await UrlSchema.findOne({ customUrl: req.path.slice(9) });
      url = url?.actualUrl || "https://ktj.in";
      return res.redirect(url);
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
      }
      next(error);
    }
  };



  exports.deleteUrl = async (req, res, next) => {
    let urlId = req.body._id;
    // console.log(req.body);
    try {
      let url = await UrlSchema.findById(urlId);
      if (!url) {
     
        let error = new Error("url does not exit ");
        error.statusCode = 404;
        throw error;
      }
   
      await url.delete();
      await activityController.createActivity(
        {
          userId: req.userIdForActivity,
          description: "Deleted url " + url.customUrl,
        },
        next
      );
      return res.status(200).json({ message: "url deleted Successfully" });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
      }
      next(error);
    }
  };


    exports.editUrl = async (req, res, next) => {
        let urlId = req.body._id;
        try {
            let url = await UrlSchema.findById(urlId);
            if (!url) {
                let error = new Error("url does not exit ");
                error.statusCode = 404;
                throw error;
            }
            url.customUrl = req.body.customUrl;
            url.actualUrl = req.body.actualUrl;
          
            await url.save();
            await activityController.createActivity(
                {
                  userId: req.userIdForActivity,
                  description: "Edited url " + url.customUrl,
                },
                next
              );
            return res.status(200).json({ message: "url edited Successfully" });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 400;
            }
            next(error);
        }
    }
  

