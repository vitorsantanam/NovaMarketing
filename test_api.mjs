
async function test() {
  const r = await fetch('http://localhost:1337/api/case-studies?populate=*&publicationState=preview');
  const j = await r.json();
  console.log(JSON.stringify(j, null, 2));
}
test();
