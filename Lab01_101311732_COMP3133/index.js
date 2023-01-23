var fs = require("fs")
var csv = require("csv-parser")
const canada_data = [];
const usa_data = [];

fs.readFileSync("input_countries.csv",'utf8', (err,data) => {
    if(err){
        console.log(err)
        return
}})

if(fs.existsSync('canada.txt')){
    fs.unlinkSync('canada.txt',(err) =>{
        if(err){
            console.log(err)
            return
        }
    })
    console.log("canada.txt file is already exists, deleting...") 
}
else{
    console.log("Creating canada.txt file...")
}

if(fs.existsSync('usa.txt')){
fs.unlinkSync('usa.txt',(err) =>{
    if(err){
        console.log(err)
        return
    }
    
})
console.log('usa.txt file is already exists, deleting...')    
}else{console.log("Creating usa.txt file...")}

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (data) => canada_data.push(data))
    .on('end', () => {
        canada_data.forEach((data)=>{
            if(data.country === "Canada"){
                fs.appendFileSync('canada.txt', JSON.stringify(data) + '\n')
            }
        })
    })

fs.createReadStream('input_countries.csv')
.pipe(csv())
.on('data', (data) => {usa_data.push(data)})
.on('end', () => {
    usa_data.forEach((data)=>{
        if(data.country === "United States"){
            fs.appendFileSync('usa.txt', JSON.stringify(data) +"\n")
        }
    })
})
