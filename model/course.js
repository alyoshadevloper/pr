const {v4 : uuidv4} = require('uuid')
const fs = require('fs')
const moment = require('moment')
const path = require('path')
class Course {
    constructor(title , price , comment , category , img , top){
        this.title = title,
        this.price = price,
        this.comment = comment,
        this.category = category,
        this.img = img,
        this.top = top,
        this.id = uuidv4(),
        this.date = moment().locale('uz').format("MMM Do YY")
    }

    helper() {
        return {
            title :   this.title.toLowerCase() ,
            price :   this.price,
            comment :   this.comment,
            category :   this.category,
            img :   this.img,
            top :   this.top,
            id :   this.id,
            date :   this.date
        } 
    }

    static async update(course){
        const courses = await Course.getAll()
        const idx = courses.findIndex(c => c.id ===  course.id)
        const res = courses[idx] = course
        res.date = moment().locale('uz').format("MMM Do YY")
        return new Promise((resolve , reject) => {
            fs.writeFile(
                path.join(__dirname , ".."  ,'data' , 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                }
            )
        })
    }

    async save(){
            const courses = await Course.getAll()
            // console.log(courses);
            courses.push(this.helper())
            // console.log(courses);
            return new Promise((resolve , reject) => {
                fs.writeFile(
                    path.join(__dirname , ".."  ,'data' , 'courses.json'),
                    JSON.stringify(courses),
                    (err) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve()
                        }
                    }
                )
            })
    }

    static async getAll() {
        return new Promise((resolve , reject) => {
            fs.readFile(
                path.join(__dirname , ".." , 'data' , 'courses.json'), 
                'utf-8',
                (err , content) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getById(id){
        const courses = await Course.getAll()
        // console.log(id);
        // console.log(courses);
        return  courses.find(c => c.id === id )
    }

    static async sortByTitle(title) {
        const courses = await Course.getAll()
        // console.log(title);
        // console.log(courses);
        let arr = []
        courses.forEach(element => {
            if(element.title.toLowerCase() == title.toLowerCase()){
                arr.push(element)
            }
        });
        console.log(arr);
        return arr
    }

    static async sortByTop() {
        const courses = await Course.getAll()
        let arr = []
        courses.forEach(element => {
            if(element.top == "true"){
                arr.push(element)
            }   
        });
        console.log(arr);
        return arr
    }

    static async delete(id) {
        const courses = await Course.getAll()
        const idx = courses.findIndex(c => c.id === id)
        // const data = {courses}    
        // console.log(data);
        courses.splice(idx , 1)
        return new Promise((resolve , reject) => {
            fs.writeFile(
                path.join(__dirname , ".."  ,'data' , 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                }
            )
        })
       
    }
}

module.exports = Course