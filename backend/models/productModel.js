const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName : { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inventoryCount: { type: Number, required: true },
    supplier: {
      name: { type: String, required: true },
      contactEmail: { type: String, required: true },
      contactPhone: { type: String, required: true },
      isVerified: Boolean
    }



  //   title: { type: String, required: true },
  //   author: { type: String, required: true },
  //   isbn: { type: String, required: true },
  //   availability: {
  //     isAvailable: { type: Boolean, required: true },
  //     borrower: { type: String },
  //   },
  // },
  // { timestamps: true }
  }
);

// add virtual field id
ProductSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;