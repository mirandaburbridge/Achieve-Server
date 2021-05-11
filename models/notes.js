module.exports = (sequelize, DataTypes) => {
    const Notes = sequelize.define("note", {
        description: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER
        }
    })

    return Notes;
};