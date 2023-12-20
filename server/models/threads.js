module.exports = (sequelize, DataTypes) => {
    //creates table in database called Threads
    const threads = sequelize.define("Threads", {
        //creates title, threadText and username columns in table
        title: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        threadText: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
    })

    return threads
}