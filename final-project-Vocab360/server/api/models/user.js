import Mongoose from "mongoose";
// schema for user model. name, username, password, email are required
// id is a virtual field which uses _id field.
const UserSchema = new Mongoose.Schema({
    "name":{
        type:String,
        required: "name is a required field"
    },
    "userName":{
        type:String,
        required: "userName is a required field",
        unique: true
    },
    "password":{
        type:String,
        required: "password is a required field"
        
    },
    "email":{
        type:String,
        required: "email is a required field",
        unique: true
    },
    "phone":{
        type:String,
        default: ""
    },
    "mastered":{
        type:[String],
        default: []
    },
    "learning":{
        type:[String],
        default:[]
    },
    "favourite":{
        type:[String],
        default:[]
    },
    "expectedscore":{
        type: Number,
        
    },
    "picname":{
        type: String,
        default: 'default.jpeg'
        
    },
    "role":{
        type: String,
        default: 'user'
    }
},{
    versionKey:false
})

UserSchema.virtual('id',()=>this._id.toHexString()); //virtual field not stored in the database
UserSchema.set('toJSON',{virtuals:true});
const User = Mongoose.model('User', UserSchema);

export default User;