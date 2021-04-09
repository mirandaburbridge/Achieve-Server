module.exports = (sequelize, DataTypes) => {
    const Goals = sequelize.define("goal", {
        dueDate: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
    });
    return Goals;
};