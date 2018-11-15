let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClientSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, min: 1 },
        age: { type: Number, required: true, min: 1 },
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);

ClientSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('client', ClientSchema);