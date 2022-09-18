    /**
     * @Profile_Model
     * @Schema User, Name, Title, Bio, ProfilePics, Links, Posts, Bookmarks, TimeStamps: true
     * @Relation Many TO Many User & Post
     */

const { Schema, model } = require('mongoose')

// const User = require('./User')
// const Post = require('./Post')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 4
    },
    title: {
        type: String,
        trim: true,
        maxLength: 100,
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 300,
    },
    profilePic: String,
    links: {
        website: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        github: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
}, {timestamps: true})

const Profile = model('Profile', profileSchema)
module.exports = Profile;