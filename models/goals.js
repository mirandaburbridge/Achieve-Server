module.exports = (sequelize, DataTypes) => {
    const Goals = sequelize.define("goal", {
        dueDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Goals.associate = function (models) {
        Goals.belongsTo(models.User, {
            foreignKey: "owner",
            onDelete: "CASCADE",
        });
        Goals.hasMany(models.Items, {
            foreignKey: "goalId",
            as: "items",
        });
    };
    return Goals;
};