import Mongoose from "mongoose";
// schema for user model. name, username, password, email are required
// id is a virtual field which uses _id field.
const WordSchema = new Mongoose.Schema({
    "title":{
        type:String,
        required: "name is a required field"
    },
    "defenition":{
        type:String,
        required: "userName is a required field",
        unique: true
    },
    "section":{
        type:Number,
        required: "password is a required field"
        
    },
    "difficulty":{
        type:String,
        required: "email is a required field"
    },
    "status":{
        type:String,
        default: "unlearned"
    },
    "favourite":{
        type:Boolean,
        default: false
    },
    },
    {versionKey:false}
)

WordSchema.virtual('id',()=>this._id.toHexString()); //virtual field not stored in the database
WordSchema.set('toJSON',{virtuals:true});
const Word = Mongoose.model('Word', WordSchema);

export default Word;