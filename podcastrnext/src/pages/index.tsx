
export default function Home() {
  return (
    <div>
    index
    </div>
  );
}


//SSG
export async function getStaticProps(){
  const response = await fetch ('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60*60*8, //Isso aqui serve para definir que a página será atualizada de 8 em 8 horas.
  }
}