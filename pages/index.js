// كود الجلب داخل getStaticProps أو getServerSideProps
const perfumes = await client.fetch(`*[_type == "perfume"]{
  _id,
  name,
  price,
  description,
  "imageUrl": image.asset->url
}`)