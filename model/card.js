const path = require('path')
const fs = require('fs')

class Card {

    static async add(course, ips) {
        // console.log(ips);
        // console.log(course);
        const card = await Card.fetch()
        // console.log(card);
        const idx = card.courses.findIndex(c => c.id === course.id)
        const candidate = card.courses[idx]
        course.ip = ips
        if (candidate) {
            /// kurs korzinadan bolsa miqdorini bittaga kopaytirish
            candidate.count++
            card.courses[idx] = candidate
        } else {
            /// kurs korzinadan olmasa korzinaga qoshish miqdori birga teng boladi
            course.count = 1
            card.courses.push(course)
        }
        card.price += +course.price

        //// malumotlarni card.jsonga yozish
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "..", "data", "card.json"), JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    /// remove card in shopping bag

    static async remove(id) {
        const card = await Card.fetch()
        const idx = card.courses.findIndex(c => c.id === id) /// bitta mahsulotimiz
        const course = card.courses[idx] // bitta mahsulot {}
        if (course.count === 1) {
            card.courses = card.courses.filter(c => c.id !== id)
        } else {
            card.courses[idx].count--

        }
        card.price -= +course.price
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "..", "data", "card.json"), JSON.stringify(card), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })

    }

    /// count system
    static async counts() {
        const card = await Card.fetch()
        let num = 0
        card.courses.forEach(element => {
            num += element.count
            return num
        });
        return num
    }

    static async fetch(ips) {

        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, "..", 'data', 'card.json'), 'utf-8', async (err, data) => {
 
                if (err) {
                    reject(err)
                } else {
                                
                    // const datsa = await JSON.parse(data)
                    // let arr = []
                    // console.log( datsa.courses.filter(c =>  c.ip === ips) , 2121);
                    // resolve(datsa)

                    const datsa = await JSON.parse(data)
                    let arr = []
                    datsa.courses.forEach(async (element) => {
                        if (element.ip === ips) {
                            return await arr.push(element)
                        }
                    });
                    console.log(arr);
                    datsa.courses = await arr
                    console.log( datsa.courses);
                    resolve(datsa)

                    // // console.log(datsa);


                }
            })
        })
    }



}


module.exports = Card