import { GetStaticProps } from "next";
import { api } from "../services/api";


type Episode = {
  id: string;
  title: string;
  members: string
}
type HomeProps = {
  episodes: Episode[];
}

export default function Home(props: HomeProps) {
  return (
    <div>
    <h1> index</h1>
    <p> {JSON.stringify(props.episodes)}</p>
    </div>
  );
}


//SSG
export const getStaticProps: GetStaticProps = async () => {
  const {data} = await api.get('http://localhost:3333/episodes');

  return {
    props: {
      episodes: data,
    },
    revalidate: 60*60*8, //Isso aqui serve para definir que a página será atualizada de 8 em 8 horas.
  }
}