const fs = require('fs')

const persistence = {
    readDB:  (dataFile) => {
        const userDirectory = path.resolve(__dirname, "..", "data", dataFile);
        return JSON.parse(fs.readFileSync(userDirectory, "utf-8"));
      },
      
    findByIdDB : (dataFile, id) => {
        const userDirectory = path.resolve(__dirname, "..", "data", dataFile);
        const data = JSON.parse(fs.readFileSync(userDirectory, "utf-8"));
        return data.find((ele) => ele.id === Number(id));
      },
    
    writeDB : (dataFile, arr) => {
        const userDirectory = path.resolve(__dirname, "..", "data", dataFile);
        fs.writeFileSync(userDirectory, JSON.stringify(arr));
      },

    updateDB: (datafile, el) => {

        const userDirectory = path.resolve(__dirname, "..", "data", dataFile);
        let data = JSON.parse(userDirectory);

        let newData = data.map(element => {
            let aux;
            if (element.id == el.id) {
               aux = el;
            } else {
               aux = element;
            }
            return aux;})
        
        this.writeDB(datafile,newData);

    },
    
    removeFromDB: (datafile, id) =>{

        let data = this.readDB(datafile);
        let newData = data.filter(el => el.id != id)
        this.writeDB(datafile,newData);
    }

    
}

module.exports = persistence;