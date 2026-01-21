const query = `*[_type == "product" && subCategory == "unisex"]{
  _id,
  name,
  price,
  image
}`;