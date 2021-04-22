import { GetStaticProps } from 'next';
import { api } from '../services/api';


type Episode = {
  id: string,
  title: string,
  members: string,
  published_at: string
}
type HomeProps = {
  episodes: Episode[], // Dizer que tenho um array de episodes
}


export default function Home(props: HomeProps) {
  return (
    <div>
    index
    </div>
  );
}


//SSG
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get ('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'

    }


  });
  

  return {
    props: {
      episodes: data,
    },
    revalidate: 60*60*8, //Isso aqui serve para definir que a página será atualizada de 8 em 8 horas.
  }
}