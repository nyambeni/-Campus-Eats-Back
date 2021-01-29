const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const encrypted = require('bcrypt-nodejs');
const cypto = require('crypto');

const UserSchema = new Schema({
    name: {type: String, required: true,lowercase: true},
    email: {type: String, unique: true, required: true, lowercase: true},
    phone: {type: Number, required: true},
    password: {type:String},
    picture: {type:String},
    isOwner: {type: Boolean, default: false},
    address: {
        address1: String,
        address2: String,
        city: String,
        province: String,
        country: String,
        postalCode: String
    },
    dateCreated: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')) 
    return next();

    encrypted.hash(user.password, null, null, function(err, hash) {
        if(err)
        return next(err);

        user.password = hash;
        next()
    });
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.gravatar = function(size) {
    if(!this.size)
    return size = 200;

    if(!this.email) {
        return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
    }
    else {
        var md5 = crypto.createHash('md5').update(this.email).digest('hex');
        return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro';
    }
}

module.exports = mongoose.model('User', UserSchema)