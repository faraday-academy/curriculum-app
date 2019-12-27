const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/curriculumapp', {useNewUrlParser: true})

const Cat = mongoose.model('Cat', { name: String })

const kitty = new Cat({ name: 'Zildjian' })
kitty.save().then(() => console.log('meow'))
