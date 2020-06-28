const User = require('../users/User');
const { validationResult } = require('express-validator')
const Tripp = require('./Tripp')

module.exports = {
    get: {
        sharedTripps(req, res, next) {

            Tripp.find({}).lean().then((tripps) => {
                res.render('tripps/shared-tripps.hbs', {
                    isLoggedIn: req.user !== undefined,
                    userEmail: req.user ? req.user.email : "",
                    tripps
                })
            })


        },

        offerTripp(req, res, next) {
            res.render('tripps/offer-tripp.hbs', {
                isLoggedIn: req.user !== undefined,
                userEmail: req.user ? req.user.email : ""
            })
        },

        detailstripp(req, res, next) {
            const { id } = req.params;
            Tripp.findById({ _id: id }).populate().lean().then((tripp) => {
                const currentUser = req.user;
                avaliableSeats = (tripp.seats) - (tripp.buddies.length);
                res.render('tripps/details-tripp.hbs', {
                    isLoggedIn: req.user !== undefined,
                    userEmail: req.user ? req.user.email : "",
                    tripp,
                    isTheDriver: JSON.stringify(tripp.driver) === JSON.stringify(currentUser._id),
                    alradyJoined: JSON.stringify(tripp.buddies).includes(currentUser),
                    isAvaliableSaets: avaliableSeats > 0,
                    avaliableSeats
                })
            })

        },

        closedTripp(req,res,next){
            const {id} = req.params;
            Tripp.deleteOne({_id:id}).then((deleteTripp)=>{
                res.redirect('/tripp/shared-tripps')
            })
        }
    },

    post: {
        offerTripp(req, res, next) {
            const { directions, dateTime, carImage, seats, description } = req.body;
            const directionArr = directions.split('-');
            if (directionArr.length !== 2) {
                //Throw error
            }
            const startPoint = directionArr[0].trim();
            const endPoint = directionArr[1].trim();

            const dateTimeArr = dateTime.split('-');
            if (dateTimeArr.length !== 2) {
                //Throw error
            }
            const date = dateTimeArr[0].trim();
            const time = dateTimeArr[1].trim();

            const { _id } = req.user;

            Tripp.create({ startPoint, endPoint, date, time, seats, carImage, description, driver: _id }).then((createdTripp) => {
                res.redirect('/tripp/shared-tripps');
            })



        }
    }
}