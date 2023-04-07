const User = require('../models/User');
const admin = require('firebase-admin');


// HTTP Sign up Get
exports.auth_signup_get = async (req, res) => {
    res.render('auth/signup');
}

// HTTP Sign up Post
exports.auth_signup_post = async (req, res) => {
    const idToken = req.body.idToken;
    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            const firebaseID = decodedToken.uid;
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                type: 'customer',
                firebaseID: firebaseID,
                avatarUrl: req.body.avatarURL
            });
            user.save().then(() => {
                createSessionCookie(res, req);
            }).catch(err => {
                console.log('Error: ', err);
                res.status(401).json({"message": `Error creating user => ${firebaseID}`})
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

// HTTP Sign in Get
exports.auth_signin_get = async (req, res) => {
    res.render('auth/signin');
}

// HTTP Sign in Post
exports.auth_signin_post = async (req, res) => {
    const idToken = req.body.idToken;
    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            // const firebaseID = decodedToken.uid;
            createSessionCookie(res, req);
        })
        .catch((error) => {
            console.log('Error: ', error);
            res.status(401).json({"message": `Error signing in user`})
        });
}

async function createSessionCookie(res, req) {
    const idToken = req.body.idToken;
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    await
        admin
            .auth()
            .createSessionCookie(idToken, { expiresIn })
            .then(sessionCookie => {
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie('session', sessionCookie, options);
                res.status(200).json({"message": `User logged in successfully.`})
            })
            .catch(error => {
                console.log(error);
                res.json({ success: false });
            });
}

// HTTP Sign out Get
exports.auth_signout_get = (req, res) => {
    res.clearCookie('session');
    res.status(200).json({"message": `User signed out.`})
}

// HTTP Password Reset Get
exports.auth_forgot_password_get = async (req, res) => {
    res.render('auth/forgot_password');
}