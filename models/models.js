import { DataTypes } from "sequelize";
import db from "../db.js";

const User = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    activationLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: ["user"],
    },
}, { timestamps: false });

const UserInfo = db.define("user_info", {
    name: {
        type: DataTypes.STRING,
    },
    surname: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    registrated: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ip: {
        type: DataTypes.STRING,
    },
}, { timestamps: false });

const Token = db.define("refresh_token", {
    token: {
        type: DataTypes.STRING(450),
        allowNull: false,
    },
}, { timestamps: false });

const Basket = db.define("basket", {}, { timestamps: false });

const BasketItem = db.define("basket_item", {
    count: {
        type: DataTypes.INTEGER,
    },
}, { timestamps: false });

const Favorites = db.define("favorites", {}, { timestamps: false });

const FavoritesItem = db.define("favorites_item", {}, { timestamps: false });

const Product = db.define("product", {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    sex: {
        type: DataTypes.STRING,
        defaultValue: "unisex",
    },
}, { timestamps: false });

const ProductInfo = db.define("product_info", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    released: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    onSale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    sizes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    variants: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
}, { timestamps: false });

const Rating = db.define("rating", {
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    review: {
        type: DataTypes.STRING(200),
    },
}, { timestamps: false });

const Type = db.define("type", {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
}, { timestamps: false });

const Brand = db.define("brand", {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
}, { timestamps: false });

const TypeBrand = db.define("type_brand", {}, { timestamps: false })

const Order = db.define("order", {
    date: { type: DataTypes.DATE },
    paid: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: false });

User.hasOne(Token);
Token.belongsTo(User);

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasOne(Favorites);
Favorites.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

Favorites.hasMany(FavoritesItem);
FavoritesItem.belongsTo(Favorites);

Product.hasOne(ProductInfo);
ProductInfo.belongsTo(Product);

Product.hasOne(BasketItem);
BasketItem.belongsTo(Product);

Product.hasOne(FavoritesItem);
FavoritesItem.belongsTo(Product);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export default {
    User,
    UserInfo,
    Token,
    Product,
    ProductInfo,
    Basket,
    BasketItem,
    Favorites,
    FavoritesItem,
    Type,
    Brand,
    Rating,
    Order,
}