// Loading the fs module
const fs = require('fs');

// Getting All existing users
const readDB = (path) => {
    return new Promise((resolve, reject) => {
        return fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
    
};

// Writing the DB
const writeDB = (path, data) => {
    return new Promise((resolve,reject) => {
        return fs.writeFile(path, data, (err,data) => {
            if (err) {
                reject(err)
            } else {
                resolve("File Written Successfully")
            }
        });
    });

};

// Sending all users as a response 
const allUsers = async (req, res, next) => {
    try {
        const data = await readDB("./Model/database.json");

        res.status(200).json({
          message: "User gotten successfully",
          data: JSON.parse(data),
        });
    } catch (error) {
        next(error);
    }
    
};

const createUser =  async function (req,res, next) {
    const {name, gender} = req.body;

    try {
        const data = await readDB("./Model/database.json");

        let realData = JSON.parse(data);
        
        const realDataLength = realData.length

        const keyId = realData.map((element) => element["id"]);

        const anyUser = {
          id: Math.max(...keyId) + 1,
        };

        const firstUser = {
          id: 1,
        };

        const newUser = {
          id: null,
          name: name,
          gender: gender,
        };

        if (keyId.length === 0) {
            newUser.id = firstUser.id;
        } else {
            newUser.id = anyUser.id;
        }
        
            realData.push(newUser);


            realData = JSON.stringify(realData, null, 2);

            await writeDB("./Model/database.json", realData);
            

            if (realDataLength === 0) {
              res.status(201).json({
                message: "First New User created successfully",
                data: newUser,
              });
            } else {
              res.status(201).json({
                message: "User created successfully",
                data: newUser,
              });
            };
        
} catch (error) {
        next(error);
    }

};

const oneUser = async (req,res,next) => {
    const id = req.params.id;

    try {
        const data = await readDB("./Model/database.json");

        const realData = JSON.parse(data);

        const user = realData.find((element) => element.id === +id);

        if (user === undefined) {
          res.status(404).json({
            message: "User doesn't exist",
          });
        } else {
          res.status(200).json({
            message: "User gotten successfully",
            data: user,
          });
        }
    } catch (error) {
        next(error);
    }
}


const updateUser = async (req,res,next) => {

    const id = req.params.id;
    const {name, gender} = req.body;

    try {
        const data = await readDB("./Model/database.json");

        const realData = JSON.parse(data);
        
        const user = realData.find((element) => element.id === +id );

        if (user == undefined) {
            return res.status(404).json({
                message: `ID:${id} doesn't exist`
            })
        }

        user.name = name;
        user.gender = gender;

        await writeDB('./Model/database.json', JSON.stringify(realData, null, 2));

        res.status(200).json({
            message: `User with ID:${id} has been updated successfully`,
            data: user
        })

        
    } catch (error) {
        next(error);
    }
}


const patchUser = async function (req,res,next) {
    const id = req.params.id;

    const {name, gender} = req.body;

    try {
        const data = await readDB("./Model/database.json");
        const realData = JSON.parse(data);

        const user = realData.find((element) => element["id"] === +id);

        const keys = Object.keys(req.body).length;
        
        if (keys === 0) {
           return res.status(400).json({
                message: "At least one field must have a value."
            })
        }

        if (user == undefined) {
            return res.status(404).json({
                message: `User with ID: ${id} doesn't exist`
            })
        }

        user.name = name || user.name;
        user.gender = gender || user.gender;

        await writeDB(
          "./Model/database.json",
          JSON.stringify(realData, null, 2)
        );

        res.status(200).json({
          message: `User with ID: ${id} patched successfully`,
          data: user,
        });
    } catch (error) {
        next(error);
    }


}


async function deleteUser(req,res,next) {
    const id = req.params.id;

    try {
        const data = await readDB("./Model/database.json");
        const realData = JSON.parse(data);

        const user = realData.findIndex((element) => element["id"] === parseInt(id));

        if (user == -1) {
            return res.status(404).json({
                message: `User with ID: ${id} doesn't exist`
            });
        };

        realData.splice(user, 1);

        await writeDB("./Model/database.json", JSON.stringify(realData, null, 2));

        res.status(200).json({
          message: `User with ID: ${id} deleted successfully`,
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {allUsers, createUser, oneUser, updateUser, patchUser, deleteUser}

