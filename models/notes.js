module.exports = (sequelize, DataTypes) => {
    const Notes = sequelize.define("note", {
        description: {
            type: DataTypes.STRING,
        }
    });
    return Notes;
};