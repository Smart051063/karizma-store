const query = `*[_type == "product" && subCategory == "gulf"]{
  _id,
  name,
  price,
  image
}`;