module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define("item", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        goalId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    });
    Items.associate = function (models) {
        Items.belongsTo(models.Goals, {
            foreignKey: "goalId",
            onDelete: "CASCADE",
        });
    };
    return Items;
};